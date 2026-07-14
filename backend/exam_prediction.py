"""
考试预测模块 - 基于学习数据的分数预测
"""
import sqlite3
import json
import math
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime, timedelta

from database import DB_PATH


def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


class ExamPredictor:
    """考试预测引擎"""

    def __init__(self, user_id: str):
        self.user_id = user_id
        self.db = get_db()

    def predict_score(self, subject_id: str = None) -> Dict:
        """预测考试分数"""
        # 获取学习数据
        study_data = self._get_study_data(subject_id)

        # 获取复习数据
        review_data = self._get_review_data(subject_id)

        # 获取错题数据
        wrong_data = self._get_wrong_data(subject_id)

        # 计算预测分数
        prediction = self._calculate_prediction(study_data, review_data, wrong_data)

        return prediction

    def _get_study_data(self, subject_id: str = None) -> Dict:
        """获取学习数据"""
        if subject_id:
            result = self.db.execute("""
                SELECT
                    COUNT(*) as session_count,
                    COALESCE(SUM(duration_seconds), 0) as total_seconds
                FROM study_sessions
                WHERE user_id = ? AND subject = ?
            """, (self.user_id, subject_id)).fetchone()
        else:
            result = self.db.execute("""
                SELECT
                    COUNT(*) as session_count,
                    COALESCE(SUM(duration_seconds), 0) as total_seconds
                FROM study_sessions
                WHERE user_id = ?
            """, (self.user_id,)).fetchone()

        return {
            "session_count": result["session_count"],
            "total_hours": result["total_seconds"] / 3600,
        }

    def _get_review_data(self, subject_id: str = None) -> Dict:
        """获取复习数据"""
        if subject_id:
            result = self.db.execute("""
                SELECT
                    COUNT(*) as review_count,
                    COALESCE(AVG(stability), 0) as avg_stability,
                    COALESCE(SUM(review_count), 0) as total_reviews
                FROM knowledge_reviews kr
                JOIN knowledge_points kp ON kr.knowledge_point_id = kp.id
                WHERE kr.user_id = ? AND kp.subject_id = ?
            """, (self.user_id, subject_id)).fetchone()

            total_points = self.db.execute("""
                SELECT COUNT(*) as count
                FROM knowledge_points
                WHERE subject_id = ?
            """, (subject_id,)).fetchone()["count"]
        else:
            result = self.db.execute("""
                SELECT
                    COUNT(*) as review_count,
                    COALESCE(AVG(stability), 0) as avg_stability,
                    COALESCE(SUM(review_count), 0) as total_reviews
                FROM knowledge_reviews
                WHERE user_id = ?
            """, (self.user_id,)).fetchone()

            total_points = self.db.execute("""
                SELECT COUNT(*) as count
                FROM knowledge_points
            """).fetchone()["count"]

        coverage = result["review_count"] / total_points if total_points > 0 else 0

        return {
            "review_count": result["review_count"],
            "avg_stability": result["avg_stability"],
            "total_reviews": result["total_reviews"],
            "coverage": coverage,
            "total_points": total_points,
        }

    def _get_wrong_data(self, subject_id: str = None) -> Dict:
        """获取错题数据"""
        if subject_id:
            result = self.db.execute("""
                SELECT
                    COUNT(*) as wrong_count,
                    COALESCE(AVG(mastery), 0) as avg_mastery
                FROM wrong_questions
                WHERE user_id = ? AND subject = ?
            """, (self.user_id, subject_id)).fetchone()
        else:
            result = self.db.execute("""
                SELECT
                    COUNT(*) as wrong_count,
                    COALESCE(AVG(mastery), 0) as avg_mastery
                FROM wrong_questions
                WHERE user_id = ?
            """, (self.user_id,)).fetchone()

        return {
            "wrong_count": result["wrong_count"],
            "avg_mastery": result["avg_mastery"],
        }

    def _calculate_prediction(self, study_data: Dict, review_data: Dict, wrong_data: Dict) -> Dict:
        """计算预测分数"""
        # 基础分数（假设满分100）
        base_score = 50

        # 学习时长加成（每小时+0.5分，最多+15分）
        study_bonus = min(15, study_data["total_hours"] * 0.5)

        # 知识点覆盖加成（覆盖率*20分）
        coverage_bonus = review_data["coverage"] * 20

        # 稳定性加成（平均稳定性*10分，最多+10分）
        stability_bonus = min(10, review_data["avg_stability"] * 2)

        # 错题掌握度加成（掌握度*5分，最多+5分）
        mastery_bonus = wrong_data["avg_mastery"] * 5

        # 计算总分
        predicted_score = base_score + study_bonus + coverage_bonus + stability_bonus + mastery_bonus

        # 限制在0-100之间
        predicted_score = max(0, min(100, predicted_score))

        # 计算置信度（基于数据量）
        confidence = self._calculate_confidence(study_data, review_data, wrong_data)

        # 生成分析
        analysis = self._generate_analysis(study_data, review_data, wrong_data, predicted_score)

        return {
            "predicted_score": round(predicted_score, 1),
            "confidence": round(confidence, 2),
            "breakdown": {
                "base_score": base_score,
                "study_bonus": round(study_bonus, 1),
                "coverage_bonus": round(coverage_bonus, 1),
                "stability_bonus": round(stability_bonus, 1),
                "mastery_bonus": round(mastery_bonus, 1),
            },
            "analysis": analysis,
            "data_summary": {
                "study_hours": round(study_data["total_hours"], 1),
                "knowledge_coverage": round(review_data["coverage"] * 100, 1),
                "avg_stability": round(review_data["avg_stability"], 2),
                "wrong_count": wrong_data["wrong_count"],
                "wrong_mastery": round(wrong_data["avg_mastery"] * 100, 1),
            },
        }

    def _calculate_confidence(self, study_data: Dict, review_data: Dict, wrong_data: Dict) -> float:
        """计算置信度"""
        confidence = 0.0

        # 学习时长置信度（最多0.3）
        if study_data["total_hours"] > 0:
            confidence += min(0.3, study_data["total_hours"] / 100)

        # 复习覆盖置信度（最多0.4）
        confidence += review_data["coverage"] * 0.4

        # 错题数据置信度（最多0.3）
        if wrong_data["wrong_count"] > 0:
            confidence += min(0.3, wrong_data["wrong_count"] / 50)

        return confidence

    def _generate_analysis(self, study_data: Dict, review_data: Dict, wrong_data: Dict, predicted_score: float) -> List[str]:
        """生成分析建议"""
        analysis = []

        # 学习时长分析
        if study_data["total_hours"] < 10:
            analysis.append("学习时长不足，建议增加学习时间")
        elif study_data["total_hours"] < 50:
            analysis.append("学习时长一般，建议保持学习节奏")
        else:
            analysis.append("学习时长充足，继续保持")

        # 知识点覆盖分析
        if review_data["coverage"] < 0.3:
            analysis.append("知识点覆盖不足，建议系统复习")
        elif review_data["coverage"] < 0.7:
            analysis.append("知识点覆盖中等，建议查漏补缺")
        else:
            analysis.append("知识点覆盖良好，建议巩固重点")

        # 稳定性分析
        if review_data["avg_stability"] < 2:
            analysis.append("记忆稳定性较低，建议增加复习频率")
        elif review_data["avg_stability"] < 4:
            analysis.append("记忆稳定性中等，建议定期复习")
        else:
            analysis.append("记忆稳定性良好，继续保持")

        # 错题分析
        if wrong_data["wrong_count"] > 10:
            analysis.append("错题较多，建议重点攻克薄弱环节")
        elif wrong_data["wrong_count"] > 0:
            analysis.append("有少量错题，建议针对性复习")
        else:
            analysis.append("暂无错题记录，继续保持")

        # 分数预测分析
        if predicted_score >= 80:
            analysis.append("预测成绩优秀，保持状态")
        elif predicted_score >= 60:
            analysis.append("预测成绩良好，仍有提升空间")
        else:
            analysis.append("预测成绩有待提高，建议加强学习")

        return analysis

    def get_progress_trend(self, days: int = 30) -> List[Dict]:
        """获取学习进度趋势"""
        trend = []

        for i in range(days):
            date = datetime.now() - timedelta(days=days - 1 - i)
            date_str = date.strftime("%Y-%m-%d")

            # 获取当天的学习时长
            study_result = self.db.execute("""
                SELECT COALESCE(SUM(duration_seconds), 0) as total_seconds
                FROM study_sessions
                WHERE user_id = ? AND DATE(start_time) = ?
            """, (self.user_id, date_str)).fetchone()

            # 获取当天的复习数量
            review_result = self.db.execute("""
                SELECT COUNT(*) as count
                FROM study_sessions
                WHERE user_id = ? AND activity_type = 'knowledge_review' AND DATE(start_time) = ?
            """, (self.user_id, date_str)).fetchone()

            trend.append({
                "date": date_str,
                "study_minutes": study_result["total_seconds"] // 60,
                "review_count": review_result["count"],
            })

        return trend

    def close(self):
        """关闭数据库连接"""
        self.db.close()


def predict_exam_score(user_id: str, subject_id: str = None) -> Dict:
    """预测考试分数"""
    predictor = ExamPredictor(user_id)
    try:
        return predictor.predict_score(subject_id)
    finally:
        predictor.close()


def get_progress_trend(user_id: str, days: int = 30) -> List[Dict]:
    """获取学习进度趋势"""
    predictor = ExamPredictor(user_id)
    try:
        return predictor.get_progress_trend(days)
    finally:
        predictor.close()


if __name__ == "__main__":
    # 测试预测功能
    import sys

    if len(sys.argv) < 2:
        print("用法: python exam_prediction.py <用户ID> [学科ID]")
        sys.exit(1)

    user_id = sys.argv[1]
    subject_id = sys.argv[2] if len(sys.argv) > 2 else None

    print("=== 考试预测 ===")
    prediction = predict_exam_score(user_id, subject_id)

    print(f"预测分数: {prediction['predicted_score']}")
    print(f"置信度: {prediction['confidence'] * 100:.1f}%")
    print()

    print("分数构成:")
    for key, value in prediction["breakdown"].items():
        print(f"  {key}: {value}")
    print()

    print("数据摘要:")
    for key, value in prediction["data_summary"].items():
        print(f"  {key}: {value}")
    print()

    print("分析建议:")
    for item in prediction["analysis"]:
        print(f"  • {item}")
