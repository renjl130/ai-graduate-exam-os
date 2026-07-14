"""
个性化学习推荐模块 - 基于掌握度和错题的推荐
"""
import sqlite3
import json
from pathlib import Path
from typing import List, Dict, Optional
from datetime import datetime, timedelta

from database import DB_PATH


def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


class StudyRecommender:
    """学习推荐引擎"""

    def __init__(self, user_id: str):
        self.user_id = user_id
        self.db = get_db()

    def get_recommendations(self, limit: int = 10) -> List[Dict]:
        """获取个性化学习推荐"""
        recommendations = []

        # 1. 基于掌握度的推荐（低掌握度优先）
        mastery_recommendations = self._get_mastery_recommendations(limit // 2)
        recommendations.extend(mastery_recommendations)

        # 2. 基于错题的推荐
        wrong_recommendations = self._get_wrong_question_recommendations(limit // 2)
        recommendations.extend(wrong_recommendations)

        # 3. 基于复习到期的推荐
        due_recommendations = self._get_due_recommendations(limit // 4)
        recommendations.extend(due_recommendations)

        # 去重
        seen_ids = set()
        unique_recommendations = []
        for rec in recommendations:
            if rec["id"] not in seen_ids:
                seen_ids.add(rec["id"])
                unique_recommendations.append(rec)

        return unique_recommendations[:limit]

    def _get_mastery_recommendations(self, limit: int) -> List[Dict]:
        """基于掌握度的推荐"""
        rows = self.db.execute("""
            SELECT kp.id, kp.title, kp.content, kp.importance, kp.tags,
                   COALESCE(kr.stability, 0) as stability,
                   COALESCE(kr.review_count, 0) as review_count
            FROM knowledge_points kp
            LEFT JOIN knowledge_reviews kr ON kp.id = kr.knowledge_point_id AND kr.user_id = ?
            WHERE kp.subject_id IN (SELECT id FROM subjects)
            ORDER BY
                CASE WHEN kr.id IS NULL THEN 0 ELSE 1 END,
                COALESCE(kr.stability, 0) ASC,
                kp.importance DESC
            LIMIT ?
        """, (self.user_id, limit)).fetchall()

        recommendations = []
        for row in rows:
            rec = dict(row)
            if rec.get("tags"):
                rec["tags"] = json.loads(rec["tags"])
            else:
                rec["tags"] = []
            rec["reason"] = "掌握度较低，建议复习"
            rec["priority"] = "high" if rec["stability"] < 2 else "medium"
            recommendations.append(rec)

        return recommendations

    def _get_wrong_question_recommendations(self, limit: int) -> List[Dict]:
        """基于错题的推荐"""
        # 获取用户的错题
        wrong_questions = self.db.execute("""
            SELECT content, subject, topic, answer, mastery
            FROM wrong_questions
            WHERE user_id = ?
            ORDER BY mastery ASC, created_at DESC
            LIMIT ?
        """, (self.user_id, limit)).fetchall()

        recommendations = []
        for wq in wrong_questions:
            wq_dict = dict(wq)

            # 根据错题主题查找相关知识点
            topic = wq_dict.get("topic", "")
            subject = wq_dict.get("subject", "")

            if topic:
                # 搜索相关知识点
                related_points = self.db.execute("""
                    SELECT id, title, content, importance, tags
                    FROM knowledge_points
                    WHERE (title LIKE ? OR content LIKE ? OR tags LIKE ?)
                    AND subject_id = ?
                    LIMIT 3
                """, (f"%{topic}%", f"%{topic}%", f"%{topic}%", subject)).fetchall()

                for rp in related_points:
                    rec = dict(rp)
                    if rec.get("tags"):
                        rec["tags"] = json.loads(rec["tags"])
                    else:
                        rec["tags"] = []
                    rec["reason"] = f"错题相关：{wq_dict['content'][:50]}..."
                    rec["priority"] = "high" if wq_dict["mastery"] < 0.3 else "medium"
                    recommendations.append(rec)

        return recommendations

    def _get_due_recommendations(self, limit: int) -> List[Dict]:
        """基于复习到期的推荐"""
        now = datetime.now().isoformat()

        rows = self.db.execute("""
            SELECT kp.id, kp.title, kp.content, kp.importance, kp.tags,
                   kr.due_date, kr.stability
            FROM knowledge_reviews kr
            JOIN knowledge_points kp ON kr.knowledge_point_id = kp.id
            WHERE kr.user_id = ? AND kr.due_date <= ?
            ORDER BY kr.due_date ASC
            LIMIT ?
        """, (self.user_id, now, limit)).fetchall()

        recommendations = []
        for row in rows:
            rec = dict(row)
            if rec.get("tags"):
                rec["tags"] = json.loads(rec["tags"])
            else:
                rec["tags"] = []
            rec["reason"] = "复习到期"
            rec["priority"] = "high"
            recommendations.append(rec)

        return recommendations

    def get_subject_recommendations(self, subject_id: str, limit: int = 5) -> List[Dict]:
        """获取特定学科的推荐"""
        rows = self.db.execute("""
            SELECT kp.id, kp.title, kp.content, kp.importance, kp.tags,
                   COALESCE(kr.stability, 0) as stability,
                   COALESCE(kr.review_count, 0) as review_count
            FROM knowledge_points kp
            LEFT JOIN knowledge_reviews kr ON kp.id = kr.knowledge_point_id AND kr.user_id = ?
            WHERE kp.subject_id = ?
            ORDER BY
                CASE WHEN kr.id IS NULL THEN 0 ELSE 1 END,
                COALESCE(kr.stability, 0) ASC,
                kp.importance DESC
            LIMIT ?
        """, (self.user_id, subject_id, limit)).fetchall()

        recommendations = []
        for row in rows:
            rec = dict(row)
            if rec.get("tags"):
                rec["tags"] = json.loads(rec["tags"])
            else:
                rec["tags"] = []
            rec["reason"] = "掌握度较低"
            rec["priority"] = "high" if rec["stability"] < 2 else "medium"
            recommendations.append(rec)

        return recommendations

    def get_weak_points(self, limit: int = 10) -> List[Dict]:
        """获取薄弱知识点"""
        rows = self.db.execute("""
            SELECT kp.id, kp.title, kp.content, kp.importance, kp.tags,
                   kr.stability, kr.review_count, kr.lapse_count
            FROM knowledge_reviews kr
            JOIN knowledge_points kp ON kr.knowledge_point_id = kp.id
            WHERE kr.user_id = ? AND kr.lapse_count > 0
            ORDER BY kr.lapse_count DESC, kr.stability ASC
            LIMIT ?
        """, (self.user_id, limit)).fetchall()

        weak_points = []
        for row in rows:
            wp = dict(row)
            if wp.get("tags"):
                wp["tags"] = json.loads(wp["tags"])
            else:
                wp["tags"] = []
            weak_points.append(wp)

        return weak_points

    def get_study_plan(self, days: int = 7) -> Dict:
        """生成学习计划"""
        # 获取所有知识点
        all_points = self.db.execute("""
            SELECT kp.id, kp.title, kp.importance, kp.subject_id,
                   COALESCE(kr.stability, 0) as stability,
                   COALESCE(kr.review_count, 0) as review_count
            FROM knowledge_points kp
            LEFT JOIN knowledge_reviews kr ON kp.id = kr.knowledge_point_id AND kr.user_id = ?
            WHERE kp.subject_id IN (SELECT id FROM subjects)
            ORDER BY
                CASE WHEN kr.id IS NULL THEN 0 ELSE 1 END,
                COALESCE(kr.stability, 0) ASC,
                kp.importance DESC
        """, (self.user_id,)).fetchall()

        # 按学科分组
        by_subject = {}
        for point in all_points:
            subject = point["subject_id"]
            if subject not in by_subject:
                by_subject[subject] = []
            by_subject[subject].append(dict(point))

        # 生成每日计划
        plan = []
        points_per_day = len(all_points) // days

        for day in range(days):
            daily_points = []
            for subject, points in by_subject.items():
                # 从每个学科取一些知识点
                subject_points = points[day * points_per_day // 3:(day + 1) * points_per_day // 3]
                daily_points.extend(subject_points)

            plan.append({
                "day": day + 1,
                "date": (datetime.now() + timedelta(days=day)).strftime("%Y-%m-%d"),
                "points": daily_points[:10],  # 每天最多10个
                "estimated_minutes": len(daily_points[:10]) * 15,  # 每个知识点约15分钟
            })

        return {
            "days": days,
            "total_points": len(all_points),
            "plan": plan,
        }

    def close(self):
        """关闭数据库连接"""
        self.db.close()


def get_user_recommendations(user_id: str, limit: int = 10) -> List[Dict]:
    """获取用户推荐"""
    recommender = StudyRecommender(user_id)
    try:
        return recommender.get_recommendations(limit)
    finally:
        recommender.close()


def get_subject_recommendations(user_id: str, subject_id: str, limit: int = 5) -> List[Dict]:
    """获取学科推荐"""
    recommender = StudyRecommender(user_id)
    try:
        return recommender.get_subject_recommendations(subject_id, limit)
    finally:
        recommender.close()


def get_weak_points(user_id: str, limit: int = 10) -> List[Dict]:
    """获取薄弱知识点"""
    recommender = StudyRecommender(user_id)
    try:
        return recommender.get_weak_points(limit)
    finally:
        recommender.close()


def get_study_plan(user_id: str, days: int = 7) -> Dict:
    """获取学习计划"""
    recommender = StudyRecommender(user_id)
    try:
        return recommender.get_study_plan(days)
    finally:
        recommender.close()


if __name__ == "__main__":
    # 测试推荐功能
    import sys

    if len(sys.argv) < 2:
        print("用法: python recommendation.py <用户ID>")
        sys.exit(1)

    user_id = sys.argv[1]

    print("=== 个性化学习推荐 ===")
    recommendations = get_user_recommendations(user_id, limit=5)
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec['title']}")
        print(f"   原因: {rec['reason']}")
        print(f"   优先级: {rec['priority']}")
        print()

    print("=== 薄弱知识点 ===")
    weak_points = get_weak_points(user_id, limit=3)
    for i, wp in enumerate(weak_points, 1):
        print(f"{i}. {wp['title']}")
        print(f"   遗忘次数: {wp['lapse_count']}")
        print(f"   稳定性: {wp['stability']:.2f}")
        print()
