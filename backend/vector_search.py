"""
向量搜索模块 - 基于 TF-IDF 和余弦相似度的简单实现
无需外部向量数据库依赖
"""
import sqlite3
import json
import math
import re
from pathlib import Path
from typing import List, Dict, Tuple
from collections import Counter

from database import DB_PATH


def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def tokenize(text: str) -> List[str]:
    """简单的中文分词（基于字符和常见词）"""
    # 移除标点符号和数字
    text = re.sub(r'[^一-龥a-zA-Z]', ' ', text)

    # 中文字符级分词（简单实现）
    tokens = []

    # 提取中文词组（2-4个字符）
    chinese_chars = re.findall(r'[一-龥]+', text)
    for chars in chinese_chars:
        # 添加单个字符
        tokens.extend(list(chars))
        # 添加2字符组合
        for i in range(len(chars) - 1):
            tokens.append(chars[i:i+2])
        # 添加3字符组合
        for i in range(len(chars) - 2):
            tokens.append(chars[i:i+3])

    # 提取英文单词
    english_words = re.findall(r'[a-zA-Z]+', text)
    tokens.extend([w.lower() for w in english_words])

    return tokens


def compute_tf(tokens: List[str]) -> Dict[str, float]:
    """计算词频（TF）"""
    counter = Counter(tokens)
    total = len(tokens)
    if total == 0:
        return {}
    return {word: count / total for word, count in counter.items()}


def compute_idf(documents: List[List[str]]) -> Dict[str, float]:
    """计算逆文档频率（IDF）"""
    doc_count = len(documents)
    if doc_count == 0:
        return {}

    # 统计每个词出现在多少个文档中
    word_doc_count = Counter()
    for doc_tokens in documents:
        unique_tokens = set(doc_tokens)
        for token in unique_tokens:
            word_doc_count[token] += 1

    # 计算 IDF
    idf = {}
    for word, count in word_doc_count.items():
        idf[word] = math.log(doc_count / (1 + count))

    return idf


def compute_tfidf(tf: Dict[str, float], idf: Dict[str, float]) -> Dict[str, float]:
    """计算 TF-IDF 向量"""
    tfidf = {}
    for word, tf_value in tf.items():
        if word in idf:
            tfidf[word] = tf_value * idf[word]
    return tfidf


def cosine_similarity(vec1: Dict[str, float], vec2: Dict[str, float]) -> float:
    """计算余弦相似度"""
    # 获取共同的词
    common_words = set(vec1.keys()) & set(vec2.keys())

    if not common_words:
        return 0.0

    # 计算点积
    dot_product = sum(vec1[word] * vec2[word] for word in common_words)

    # 计算向量长度
    norm1 = math.sqrt(sum(v ** 2 for v in vec1.values()))
    norm2 = math.sqrt(sum(v ** 2 for v in vec2.values()))

    if norm1 == 0 or norm2 == 0:
        return 0.0

    return dot_product / (norm1 * norm2)


class VectorSearchEngine:
    """向量搜索引擎"""

    def __init__(self):
        self.db = get_db()
        self.documents = []  # 存储文档信息
        self.tfidf_vectors = []  # 存储 TF-IDF 向量
        self.idf = {}  # IDF 值
        self._build_index()

    def _build_index(self):
        """构建搜索索引"""
        # 获取所有知识点
        rows = self.db.execute(
            "SELECT id, title, content, subject_id, chapter_id FROM knowledge_points"
        ).fetchall()

        self.documents = []
        all_tokens = []

        for row in rows:
            doc = {
                "id": row["id"],
                "title": row["title"],
                "content": row["content"],
                "subject_id": row["subject_id"],
                "chapter_id": row["chapter_id"],
            }
            self.documents.append(doc)

            # 分词
            text = f"{row['title']} {row['content']}"
            tokens = tokenize(text)
            all_tokens.append(tokens)

        # 计算 IDF
        self.idf = compute_idf(all_tokens)

        # 计算每个文档的 TF-IDF 向量
        self.tfidf_vectors = []
        for tokens in all_tokens:
            tf = compute_tf(tokens)
            tfidf = compute_tfidf(tf, self.idf)
            self.tfidf_vectors.append(tfidf)

    def search(self, query: str, top_k: int = 10, subject_id: str = None) -> List[Dict]:
        """搜索知识点"""
        # 对查询进行分词和 TF-IDF 计算
        query_tokens = tokenize(query)
        query_tf = compute_tf(query_tokens)
        query_tfidf = compute_tfidf(query_tf, self.idf)

        # 计算相似度
        results = []
        for i, doc_tfidf in enumerate(self.tfidf_vectors):
            similarity = cosine_similarity(query_tfidf, doc_tfidf)

            if similarity > 0:
                doc = self.documents[i].copy()
                doc["similarity"] = similarity

                # 如果指定了学科，过滤结果
                if subject_id and doc["subject_id"] != subject_id:
                    continue

                results.append(doc)

        # 按相似度排序
        results.sort(key=lambda x: x["similarity"], reverse=True)

        return results[:top_k]

    def search_with_keywords(self, query: str, top_k: int = 10) -> List[Dict]:
        """结合关键词搜索"""
        # 先进行向量搜索
        vector_results = self.search(query, top_k * 2)

        # 再进行关键词搜索
        keyword_results = self._keyword_search(query, top_k * 2)

        # 合并结果，去重
        seen_ids = set()
        combined_results = []

        # 向量搜索结果权重更高
        for doc in vector_results:
            if doc["id"] not in seen_ids:
                doc["search_type"] = "vector"
                combined_results.append(doc)
                seen_ids.add(doc["id"])

        # 添加关键词搜索结果
        for doc in keyword_results:
            if doc["id"] not in seen_ids:
                doc["search_type"] = "keyword"
                combined_results.append(doc)
                seen_ids.add(doc["id"])

        # 按相似度排序
        combined_results.sort(key=lambda x: x.get("similarity", 0), reverse=True)

        return combined_results[:top_k]

    def _keyword_search(self, query: str, top_k: int = 10) -> List[Dict]:
        """关键词搜索"""
        results = []

        for doc in self.documents:
            score = 0

            # 标题匹配
            if query in doc["title"]:
                score += 3

            # 内容匹配
            if query in doc["content"]:
                score += 1

            # 部分匹配
            query_chars = list(query)
            for char in query_chars:
                if char in doc["title"]:
                    score += 0.5
                if char in doc["content"]:
                    score += 0.1

            if score > 0:
                result = doc.copy()
                result["similarity"] = score / 10  # 归一化
                results.append(result)

        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results[:top_k]

    def close(self):
        """关闭数据库连接"""
        self.db.close()


# 全局搜索引擎实例
_search_engine = None


def get_search_engine() -> VectorSearchEngine:
    """获取搜索引擎单例"""
    global _search_engine
    if _search_engine is None:
        _search_engine = VectorSearchEngine()
    return _search_engine


def search_knowledge(query: str, top_k: int = 10, subject_id: str = None) -> List[Dict]:
    """搜索知识点"""
    engine = get_search_engine()
    return engine.search(query, top_k, subject_id)


def search_knowledge_hybrid(query: str, top_k: int = 10) -> List[Dict]:
    """混合搜索（向量 + 关键词）"""
    engine = get_search_engine()
    return engine.search_with_keywords(query, top_k)


if __name__ == "__main__":
    # 测试搜索功能
    import sys

    if len(sys.argv) < 2:
        print("用法: python vector_search.py <查询>")
        sys.exit(1)

    query = " ".join(sys.argv[1:])
    print(f"搜索: {query}")
    print("-" * 50)

    results = search_knowledge_hybrid(query, top_k=5)

    for i, result in enumerate(results, 1):
        print(f"{i}. {result['title']}")
        print(f"   相似度: {result['similarity']:.4f}")
        print(f"   搜索类型: {result.get('search_type', 'vector')}")
        print()
