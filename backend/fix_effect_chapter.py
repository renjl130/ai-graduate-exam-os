"""
修复效果研究知识点的章节归属
将 ch_xc_cbs_base 中的效果研究理论移动到 ch_xc_cbs_effect
"""
import sqlite3
from pathlib import Path

from database import DB_PATH

def fix_effect_chapter():
    db = sqlite3.connect(str(DB_PATH))
    db.row_factory = sqlite3.Row

    # 效果研究理论标题
    effect_theories = [
        "议程设置理论",
        "沉默的螺旋理论",
        "培养理论",
        "第三人效果理论",
        "框架理论",
        "创新扩散理论",
        "议程融合理论",
    ]

    # 检查 ch_xc_cbs_effect 是否存在
    effect_chapter = db.execute(
        "SELECT id FROM chapters WHERE id = 'ch_xc_cbs_effect'"
    ).fetchone()

    if not effect_chapter:
        print("错误：效果研究章节不存在")
        db.close()
        return

    print("开始修复效果研究知识点章节归属...")

    moved_count = 0
    for title in effect_theories:
        # 查找在错误章节的知识点
        point = db.execute(
            "SELECT id, chapter_id FROM knowledge_points WHERE title = ? AND chapter_id = 'ch_xc_cbs_base'",
            (title,)
        ).fetchone()

        if point:
            # 移动到正确章节
            db.execute(
                "UPDATE knowledge_points SET chapter_id = 'ch_xc_cbs_effect' WHERE id = ?",
                (point["id"],)
            )
            print(f"  ✓ 移动 '{title}' 到效果研究章节")
            moved_count += 1
        else:
            # 检查是否已在正确章节
            existing = db.execute(
                "SELECT id FROM knowledge_points WHERE title = ? AND chapter_id = 'ch_xc_cbs_effect'",
                (title,)
            ).fetchone()

            if existing:
                print(f"  - '{title}' 已在正确章节")
            else:
                print(f"  ✗ 未找到 '{title}'")

    db.commit()

    # 验证修复结果
    print("\n验证修复结果:")
    for title in effect_theories:
        point = db.execute(
            "SELECT chapter_id FROM knowledge_points WHERE title = ?",
            (title,)
        ).fetchone()
        if point:
            chapter_name = "效果研究" if point["chapter_id"] == "ch_xc_cbs_effect" else "传播学基础"
            print(f"  {title}: {chapter_name}")

    # 统计效果研究章节的知识点数量
    count = db.execute(
        "SELECT COUNT(*) FROM knowledge_points WHERE chapter_id = 'ch_xc_cbs_effect'"
    ).fetchone()[0]
    print(f"\n效果研究章节现有 {count} 个知识点")

    db.close()
    print(f"\n修复完成！移动了 {moved_count} 个知识点")

if __name__ == "__main__":
    fix_effect_chapter()
