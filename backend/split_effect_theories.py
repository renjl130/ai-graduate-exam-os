"""
拆分效果研究理论为独立知识点，并建立关系
"""
import sqlite3
import json
import uuid
from pathlib import Path

from database import DB_PATH


def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def generate_id():
    return str(uuid.uuid4())


def split_effect_theories():
    """拆分效果研究理论为独立知识点"""
    db = get_db()

    # 获取原始知识点
    original = db.execute(
        "SELECT id, chapter_id, subject_id FROM knowledge_points WHERE title = '二、主要的传播效果理论'"
    ).fetchone()

    if not original:
        print("未找到原始知识点")
        db.close()
        return

    original_id = original["id"]
    chapter_id = original["chapter_id"]
    subject_id = original["subject_id"]

    # 检查是否已经拆分
    existing = db.execute(
        "SELECT COUNT(*) FROM knowledge_points WHERE title LIKE '%议程设置理论%' AND subject_id = ?",
        (subject_id,)
    ).fetchone()[0]

    if existing > 0:
        print(f"效果研究理论已拆分（{existing} 个），跳过")
        db.close()
        return

    # 定义效果研究理论
    theories = [
        {
            "title": "议程设置理论",
            "content": """#### 提出者与经典研究

- **提出者**：麦库姆斯和肖（McCombs & Shaw, 1972）
- **经典研究**：1968年美国总统大选期间的"教堂山研究"
- **核心观点**：大众媒介不能决定人们"怎么想"（what to think），但可以决定人们"想什么"（what to think about）

#### 理论内容

- **第一层议程设置**：媒介通过反复报道某些议题，影响公众对议题重要性的认知
- **第二层议程设置（属性议程设置）**：媒介不仅影响人们关注什么议题，还影响人们如何认识这些议题的属性

#### 影响议程设置效果的因素

- **议题类型**：强制性议题（与个人直接相关）效果较弱，非强制性议题（抽象议题）效果较强
- **受众特征**：信息需求量大的人受议程设置影响较大
- **媒介特征**：权威性高、可信度高的媒介议程设置效果更强

#### 局限与拓展

- 局限：主要关注媒介对公众的影响，忽略了反向影响
- 拓展：媒介间议程设置、网络议程设置""",
            "importance": "high",
            "exam_tips": "高频考点，需掌握三个层次+新媒体环境下的发展",
            "tags": ["传播学", "效果研究", "议程设置"],
        },
        {
            "title": "沉默的螺旋理论",
            "content": """#### 提出者

- **伊丽莎白·诺尔-诺依曼**（Elisabeth Noelle-Neumann, 1974）

#### 理论内容

三个命题：
1. 个人意见的表达是一个社会心理过程——人具有"准统计官能"，能够感知社会的意见气候
2. 意见的表达和沉默的扩散是一个螺旋式的社会传播过程——当人们感觉自己的意见属于多数时，倾向于表达；当感觉属于少数时，倾向于沉默
3. 大众传播通过营造"意见环境"来影响社会舆论

#### 形成机制

- **害怕孤立**的社会心理是理论的核心
- 人们会通过以下方式感知意见气候：
  - 大众传播媒介（最广泛的参照物）
  - 人际传播
  - 个人观察

#### 评价

- 贡献：揭示了舆论形成的宏观机制，强调了大众传播对舆论的强大影响力
- 局限：
  - "害怕孤立"的假设未必普遍成立
  - 忽略了少数派的坚定性
  - 对"多数意见"的感知可能不准确
  - 在网络时代面临挑战（匿名性降低了孤立的恐惧）""",
            "importance": "high",
            "exam_tips": "常考简答/论述，注意新媒体环境下的适用性讨论",
            "tags": ["传播学", "效果研究", "舆论"],
        },
        {
            "title": "培养理论",
            "content": """#### 提出者

- **乔治·格伯纳**（George Gerbner, 1960s-1970s）

#### 理论内容

- 长期接触电视的人，其对现实世界的认知更接近电视所呈现的图景
- 电视节目中呈现的"符号现实"与客观现实存在差异
- 长期接触培养了观众对现实世界的特定认知

#### 三种效果

1. **主流化**（Mainstreaming）：不同社会群体的电视重度收看者的观点趋于一致
2. **共鸣**（Resonance）：电视内容与个人经历一致时，培养效果增强
3. **第一级信念与第二级信念**：
   - 第一级信念：对事实的判断（如犯罪率有多高）
   - 第二级信念：对态度的判断（如是否害怕犯罪）

#### 评价

- 贡献：揭示了大众传播的长期、累积效果
- 局限：主要关注电视，可能不适用于其他媒介；因果关系难以确立""",
            "importance": "medium",
            "exam_tips": "注意'主流化'和'共鸣'概念",
            "tags": ["传播学", "效果研究", "电视"],
        },
        {
            "title": "第三人效果理论",
            "content": """#### 提出者

- **戴维森**（W. Phillips Davison, 1983）

#### 理论内容

- 人们倾向于认为大众传播媒介对"他人"的影响大于对自己
- 两个层面：
  - **认知层面**：人们高估了媒介对他人影响的感知
  - **行为层面**：这种感知会引发行为反应（如支持对媒介内容的限制）

#### 评价

- 揭示了人们在媒介效果认知上的偏差
- 对理解舆论管制、审查制度有重要意义""",
            "importance": "medium",
            "exam_tips": "常考名词解释，注意两个层面",
            "tags": ["传播学", "效果研究", "心理学"],
        },
        {
            "title": "框架理论",
            "content": """#### 理论来源

- **戈夫曼**（Erving Goffman, 1974）：框架是人们用来认识和解释社会生活经验的一种认知结构
- **传播学应用**：媒介如何选择、强调和组织信息，从而影响受众对事件的理解

#### 媒介框架的功能

- **选择**：选择报道哪些事实，忽略哪些事实
- **强调**：突出某些方面，弱化其他方面
- **排除**：排除某些解释或观点
- **组织**：按照特定的逻辑组织信息

#### 框架与议程设置的关系

- 议程设置是第一层：影响人们"想什么"
- 属性议程设置是第二层：影响人们"怎么想"
- 框架理论是第三层：影响人们"用什么方式想" """,
            "importance": "high",
            "exam_tips": "与议程设置对比是高频考题",
            "tags": ["传播学", "效果研究", "框架"],
        },
        {
            "title": "创新扩散理论",
            "content": """#### 提出者

- **埃弗里特·罗杰斯**（Everett Rogers, 1962）

#### 理论内容

- **创新**：被个人或团体视为新的观念、实践或物品
- **扩散**：创新通过特定渠道，在一定时间内，在社会系统成员中传播的过程

#### 创新的采用者分类

| 类型 | 比例 | 特点 |
|------|------|------|
| 创新者（Innovators） | 2.5% | 冒险精神、社会活跃 |
| 早期采用者（Early Adopters） | 13.5% | 意见领袖、受人尊敬 |
| 早期多数（Early Majority） | 34% | 慎重、跟随意见领袖 |
| 晚期多数（Late Majority） | 34% | 怀疑、受经济或社会压力 |
| 落后者（Laggards） | 16% | 传统、保守 |

#### 创新采用的五个阶段

1. 知晓（Knowledge）：知道创新的存在
2. 说服（Persuasion）：形成对创新的态度
3. 决定（Decision）：采纳或拒绝
4. 实施（Implementation）：使用创新
5. 确认（Confirmation）：寻求对决定的支持""",
            "importance": "medium",
            "exam_tips": "掌握采用者分类和五个阶段",
            "tags": ["传播学", "效果研究", "创新"],
        },
        {
            "title": "议程融合理论",
            "content": """#### 提出者

- **肖**（Donald Shaw, 1999）

#### 核心观点

- 人们使用大众传播媒介是为了融入自己想要归属的群体
- 人们会选择与自己所属群体观点一致的媒介内容
- 强调受众的主动性

#### 与议程设置的关系

- 议程设置强调媒体对公众的影响
- 议程融合强调受众的主动性选择
- 两者互补，共同解释媒介与受众的关系""",
            "importance": "medium",
            "exam_tips": "注意与议程设置的区别",
            "tags": ["传播学", "效果研究", "受众"],
        },
    ]

    # 创建新的知识点
    new_ids = []
    for theory in theories:
        new_id = generate_id()
        db.execute(
            "INSERT INTO knowledge_points (id, subject_id, chapter_id, title, content, importance, frequency, level, tags, exam_tips, sort_order) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (new_id, subject_id, chapter_id, theory["title"], theory["content"],
             theory["importance"], "high", 1, json.dumps(theory["tags"]),
             theory["exam_tips"], len(new_ids))
        )
        new_ids.append((new_id, theory["title"]))
        print(f"  ✅ 创建知识点: {theory['title']}")

    # 创建理论之间的关系
    relations = [
        # 议程设置相关
        ("议程设置理论", "框架理论", "contrast", "议程设置告诉人们'想什么'，框架理论告诉人们'怎么想'", 0.9),
        ("议程设置理论", "沉默的螺旋理论", "contrast", "两者都是大众传播效果理论，但关注点不同", 0.8),
        ("议程设置理论", "议程融合理论", "evolution", "从议程设置发展到议程融合，强调受众主动性", 1.0),
        ("议程设置理论", "培养理论", "related", "两者都关注媒体对受众认知的长期影响", 0.7),

        # 沉默的螺旋相关
        ("沉默的螺旋理论", "第三人效果理论", "related", "两者都涉及社会心理机制", 0.7),
        ("沉默的螺旋理论", "框架理论", "related", "两者都关注信息呈现方式的影响", 0.6),

        # 培养理论相关
        ("培养理论", "框架理论", "related", "两者都关注媒体对受众认知的影响", 0.7),
        ("培养理论", "第三人效果理论", "related", "两者都涉及媒体效果的认知偏差", 0.6),

        # 框架理论相关
        ("框架理论", "创新扩散理论", "related", "框架理论影响创新扩散的认知过程", 0.6),

        # 创新扩散相关
        ("创新扩散理论", "议程融合理论", "related", "创新扩散与议程融合都关注信息传播过程", 0.6),
    ]

    # 获取所有新传知识点的标题→ID映射
    all_points = db.execute(
        "SELECT id, title FROM knowledge_points WHERE subject_id = ?",
        (subject_id,)
    ).fetchall()
    title_to_id = {p["title"]: p["id"] for p in all_points}

    relation_count = 0
    for t1, t2, rel_type, desc, weight in relations:
        id1 = title_to_id.get(t1)
        id2 = title_to_id.get(t2)
        if id1 and id2:
            db.execute(
                "INSERT INTO knowledge_relations (id, source_id, target_id, relation_type, description, weight) "
                "VALUES (?, ?, ?, ?, ?, ?)",
                (generate_id(), id1, id2, rel_type, desc, weight)
            )
            relation_count += 1
            print(f"  ✅ 创建关系: {t1} → {t2} ({rel_type})")

    # 删除原始知识点
    db.execute("DELETE FROM knowledge_points WHERE id = ?", (original_id,))
    print(f"  ✅ 删除原始知识点: 二、主要的传播效果理论")

    db.commit()
    db.close()
    print(f"\n✅ 完成！创建了 {len(new_ids)} 个知识点，{relation_count} 条关系")


if __name__ == "__main__":
    split_effect_theories()
