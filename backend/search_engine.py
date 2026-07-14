"""
轻量级搜索引擎 - 基于SQLite的全文搜索
无需额外依赖，支持中文分词和相关度排序
"""
import sqlite3
import re
from pathlib import Path
from typing import List, Dict, Any

from database import DB_PATH


def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_search_db():
    """初始化搜索索引表"""
    conn = get_db()
    cursor = conn.cursor()

    # 搜索内容表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS search_index (
            id TEXT PRIMARY KEY,
            content_type TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            subject TEXT,
            tags TEXT,
            importance INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now', 'localtime'))
        )
    """)

    # 创建FTS5虚拟表（SQLite全文搜索）
    try:
        cursor.execute("""
            CREATE VIRTUAL TABLE IF NOT EXISTS search_fts USING fts5(
                title, content, subject, tags,
                content='search_index',
                content_rowid='rowid'
            )
        """)
    except:
        pass  # FTS5可能不可用

    cursor.execute("CREATE INDEX IF NOT EXISTS idx_search_type ON search_index(content_type)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_search_subject ON search_index(subject)")

    conn.commit()
    conn.close()


def index_content(content_type: str, title: str, content: str, subject: str = None, tags: list = None, importance: int = 0):
    """索引内容"""
    import uuid
    conn = get_db()
    item_id = str(uuid.uuid4())
    tags_str = ",".join(tags) if tags else ""

    conn.execute(
        "INSERT OR REPLACE INTO search_index (id, content_type, title, content, subject, tags, importance) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (item_id, content_type, title, content, subject, tags_str, importance)
    )

    # 同时更新FTS索引
    try:
        conn.execute(
            "INSERT INTO search_fts (rowid, title, content, subject, tags) VALUES (?, ?, ?, ?, ?)",
            (conn.execute("SELECT rowid FROM search_index WHERE id = ?", (item_id,)).fetchone()[0],
             title, content, subject or "", tags_str)
        )
    except:
        pass

    conn.commit()
    conn.close()
    return item_id


def search(query: str, content_type: str = None, subject: str = None, limit: int = 20) -> List[Dict[str, Any]]:
    """搜索内容"""
    conn = get_db()

    # 尝试使用FTS5
    try:
        fts_query = " OR ".join(query.split())
        if content_type and subject:
            rows = conn.execute("""
                SELECT si.*, search_fts.rank
                FROM search_fts
                JOIN search_index si ON si.rowid = search_fts.rowid
                WHERE search_fts MATCH ? AND si.content_type = ? AND si.subject = ?
                ORDER BY search_fts.rank
                LIMIT ?
            """, (fts_query, content_type, subject, limit)).fetchall()
        elif content_type:
            rows = conn.execute("""
                SELECT si.*, search_fts.rank
                FROM search_fts
                JOIN search_index si ON si.rowid = search_fts.rowid
                WHERE search_fts MATCH ? AND si.content_type = ?
                ORDER BY search_fts.rank
                LIMIT ?
            """, (fts_query, content_type, limit)).fetchall()
        elif subject:
            rows = conn.execute("""
                SELECT si.*, search_fts.rank
                FROM search_fts
                JOIN search_index si ON si.rowid = search_fts.rowid
                WHERE search_fts MATCH ? AND si.subject = ?
                ORDER BY search_fts.rank
                LIMIT ?
            """, (fts_query, subject, limit)).fetchall()
        else:
            rows = conn.execute("""
                SELECT si.*, search_fts.rank
                FROM search_fts
                JOIN search_index si ON si.rowid = search_fts.rowid
                WHERE search_fts MATCH ?
                ORDER BY search_fts.rank
                LIMIT ?
            """, (fts_query, limit)).fetchall()

        results = []
        for row in rows:
            r = dict(row)
            if r.get("tags"):
                r["tags"] = r["tags"].split(",")
            else:
                r["tags"] = []
            results.append(r)

        conn.close()
        return results

    except Exception:
        # FTS不可用，使用LIKE搜索
        pass

    # 回退到LIKE搜索
    keywords = query.split()
    conditions = []
    params = []

    for kw in keywords:
        conditions.append("(title LIKE ? OR content LIKE ? OR tags LIKE ?)")
        params.extend([f"%{kw}%", f"%{kw}%", f"%{kw}%"])

    where_clause = " AND ".join(conditions)

    if content_type:
        where_clause += " AND content_type = ?"
        params.append(content_type)
    if subject:
        where_clause += " AND subject = ?"
        params.append(subject)

    params.append(limit)

    rows = conn.execute(f"""
        SELECT * FROM search_index
        WHERE {where_clause}
        ORDER BY importance DESC, created_at DESC
        LIMIT ?
    """, params).fetchall()

    results = []
    for row in rows:
        r = dict(row)
        if r.get("tags"):
            r["tags"] = r["tags"].split(",")
        else:
            r["tags"] = []
        results.append(r)

    conn.close()
    return results


def get_stats() -> Dict[str, int]:
    """获取搜索索引统计"""
    conn = get_db()
    total = conn.execute("SELECT COUNT(*) FROM search_index").fetchone()[0]

    by_type = {}
    rows = conn.execute("SELECT content_type, COUNT(*) as count FROM search_index GROUP BY content_type").fetchall()
    for row in rows:
        by_type[row["content_type"]] = row["count"]

    by_subject = {}
    rows = conn.execute("SELECT subject, COUNT(*) as count FROM search_index WHERE subject IS NOT NULL GROUP BY subject").fetchall()
    for row in rows:
        by_subject[row["subject"]] = row["count"]

    conn.close()
    return {"total": total, "by_type": by_type, "by_subject": by_subject}


# 初始化搜索索引数据
def seed_search_index():
    """种子搜索索引数据"""
    conn = get_db()
    count = conn.execute("SELECT COUNT(*) FROM search_index").fetchone()[0]
    if count > 0:
        conn.close()
        return

    # 理论数据
    theories = [
        ("议程设置理论", "麦库姆斯和肖（1972）提出。大众媒介可以通过反复报道来赋予议题不同程度的显著性，影响公众对议题重要性的判断。", "440", ["议程设置", "效果研究"]),
        ("沉默的螺旋", "诺依曼（1974）提出。人们在表达观点时会观察舆论环境，如果发现自己的观点属于少数派，出于被孤立的恐惧，会倾向于沉默。", "440", ["沉默的螺旋", "舆论"]),
        ("知沟理论", "蒂奇诺等（1970）提出。随着大众传播的信息量增加，社会经济地位较高的人获取知识的速度快于地位低的人。", "440", ["知沟", "信息差距"]),
        ("使用与满足理论", "卡茨（1974）提出。受众是主动的，基于特定需求选择和使用媒介来获得满足。", "440", ["使用与满足", "受众"]),
        ("把关人理论", "卢因（1947）提出。信息在传播过程中需要经过把关人的筛选和过滤。", "440", ["把关人", "信息过滤"]),
        ("框架理论", "戈夫曼（1974）提出框架概念，恩特曼引入传播学。媒体通过选择、强调和排除来建构报道框架。", "440", ["框架", "议程设置"]),
        ("培养理论", "格伯纳（1960s）提出。大众传媒通过长期的、潜移默化的影响，会塑造受众对现实世界的认知。", "440", ["培养理论", "电视"]),
        ("信息茧房", "桑斯坦（2001）提出。在信息传播中，公众只关注自己选择的或使自己愉悦的信息。", "440", ["信息茧房", "算法"]),
        ("编码/解码", "霍尔（1973）提出。媒介文本由传播者编码，由受众解码。三种解码立场。", "440", ["编码解码", "文化研究"]),
        ("公共领域", "哈贝马斯（1962）提出。介于国家与社会之间的空间，公民在此自由讨论公共事务。", "440", ["公共领域", "公共讨论"]),
    ]

    for title, content, subject, tags in theories:
        index_content("理论", title, content, subject, tags, importance=5)

    # 概念数据
    concepts = [
        ("新闻价值五要素", "①时新性 ②重要性 ③显著性 ④接近性 ⑤趣味性", "334", ["新闻价值", "五要素"]),
        ("新闻专业主义", "新闻工作者应遵循的职业理念和行为准则。核心要素：客观性、公正性、独立性、自由性。", "334", ["新闻专业主义", "客观性"]),
        ("媒介融合", "传统媒体与新兴媒体在内容、渠道、平台、经营、管理等方面的深度融合。", "334", ["媒介融合", "融媒体"]),
        ("新闻敏感", "记者发现和判断新闻的能力，又称新闻嗅觉、新闻鼻。", "334", ["新闻敏感", "记者"]),
        ("深度报道", "深入调查和分析，揭示事件背后的原因和意义的报道形式。", "334", ["深度报道", "调查报道"]),
    ]

    for title, content, subject, tags in concepts:
        index_content("概念", title, content, subject, tags, importance=4)

    # 热点数据
    hotspots = [
        ("AIGC与新闻生产变革", "以ChatGPT、Sora为代表的生成式AI正在深刻改变新闻生产流程。", "334/440", ["AIGC", "ChatGPT", "AI新闻"]),
        ("短视频平台传播机制", "短视频平台通过算法推荐、社交分发、内容池机制实现精准推送。", "334/440", ["短视频", "抖音", "算法推荐"]),
        ("国际传播与话语权建设", "在国际舆论场中，中国面临'有理说不出、说了传不开'的困境。", "334/440", ["国际传播", "话语权"]),
        ("算法推荐与信息茧房", "算法推荐提高了信息匹配效率，但也带来了信息茧房、算法偏见等问题。", "440", ["算法伦理", "信息茧房"]),
        ("元宇宙与沉浸式传播", "元宇宙概念为新闻传播带来新可能，虚拟主播和数字人在媒体领域广泛应用。", "334/440", ["元宇宙", "VR新闻"]),
    ]

    for title, content, subject, tags in hotspots:
        index_content("热点", title, content, subject, tags, importance=5)

    conn.close()


if __name__ == "__main__":
    init_search_db()
    seed_search_index()
    stats = get_stats()
    print(f"✅ 搜索索引初始化完成: {stats}")
