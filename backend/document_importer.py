"""
文档导入系统 - 将 PDF/Word/MD/TXT 文件解析为知识点
"""
import sqlite3
import json
import uuid
import re
import os
from pathlib import Path
from typing import List, Dict, Optional

from database import DB_PATH
from config import UPLOAD_DIR as CONFIG_UPLOAD_DIR
UPLOAD_DIR = Path(CONFIG_UPLOAD_DIR)


def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def generate_id():
    return str(uuid.uuid4())


def extract_text_from_file(file_path: str) -> str:
    """从文件中提取文本内容"""
    path = Path(file_path)
    suffix = path.suffix.lower()

    try:
        if suffix == '.md' or suffix == '.txt':
            with open(path, 'r', encoding='utf-8') as f:
                return f.read()

        elif suffix == '.pdf':
            try:
                from PyPDF2 import PdfReader
                reader = PdfReader(str(path))
                text = ""
                for page in reader.pages:
                    text += page.extract_text() + "\n"
                return text
            except ImportError:
                print("⚠️ PyPDF2 未安装，无法解析 PDF")
                return ""

        elif suffix == '.docx':
            try:
                from docx import Document
                doc = Document(str(path))
                text = ""
                for para in doc.paragraphs:
                    text += para.text + "\n"
                return text
            except ImportError:
                print("⚠️ python-docx 未安装，无法解析 Word 文档")
                return ""

        else:
            # 尝试作为文本文件读取
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()

    except Exception as e:
        print(f"❌ 读取文件失败: {e}")
        return ""


def parse_markdown_to_sections(content: str) -> List[Dict[str, str]]:
    """将 Markdown 内容解析为章节"""
    sections = []
    current_title = None
    current_content = []

    for line in content.split('\n'):
        # 检测标题
        if line.startswith('# ') or line.startswith('## '):
            # 保存之前的章节
            if current_title:
                sections.append({
                    "title": current_title,
                    "content": '\n'.join(current_content).strip()
                })

            # 开始新章节
            current_title = line.lstrip('#').strip()
            current_content = []
        else:
            current_content.append(line)

    # 保存最后一个章节
    if current_title:
        sections.append({
            "title": current_title,
            "content": '\n'.join(current_content).strip()
        })

    return sections


def parse_text_to_sections(content: str, min_length: int = 100) -> List[Dict[str, str]]:
    """将纯文本内容解析为章节（基于段落长度）"""
    sections = []
    paragraphs = content.split('\n\n')
    current_title = None
    current_content = []

    for i, para in enumerate(paragraphs):
        para = para.strip()
        if not para:
            continue

        # 如果段落较短且可能是标题
        if len(para) < 100 and (para.endswith('：') or para.endswith(':') or re.match(r'^[\d一二三四五六七八九十]+[、.]', para)):
            # 保存之前的内容
            if current_content:
                if current_title:
                    sections.append({
                        "title": current_title,
                        "content": '\n\n'.join(current_content).strip()
                    })
                else:
                    sections.append({
                        "title": f"第{i+1}部分",
                        "content": '\n\n'.join(current_content).strip()
                    })
                current_content = []

            current_title = para
        else:
            current_content.append(para)

    # 保存最后的内容
    if current_content:
        if current_title:
            sections.append({
                "title": current_title,
                "content": '\n\n'.join(current_content).strip()
            })
        else:
            sections.append({
                "title": "主要内容",
                "content": '\n\n'.join(current_content).strip()
            })

    return sections


def determine_importance(content: str) -> str:
    """根据内容判断重要度"""
    high_keywords = ["高频", "重点", "必背", "常考", "核心", "重要", "关键"]
    low_keywords = ["了解", "补充", "扩展", "参考", "选读"]

    for kw in high_keywords:
        if kw in content[:500]:
            return "high"

    for kw in low_keywords:
        if kw in content[:500]:
            return "low"

    return "medium"


def extract_tags(content: str, title: str) -> List[str]:
    """从内容中提取标签"""
    tags = []
    common_tags = [
        "传播学", "新闻学", "效果研究", "受众", "媒介", "理论", "概念", "实务",
        "新媒体", "网络传播", "广告", "公关", "新闻史", "新闻业务",
        "政治", "英语", "马克思主义", "毛泽东思想", "邓小平理论",
    ]

    for tag in common_tags:
        if tag in content[:1000] or tag in title:
            tags.append(tag)

    return tags[:5]  # 最多5个标签


def import_document(file_path: str, subject_id: str, chapter_id: Optional[str] = None) -> Dict:
    """导入文档到知识库"""
    db = get_db()

    # 检查文件是否存在
    if not os.path.exists(file_path):
        return {"success": False, "error": "文件不存在"}

    # 提取文本内容
    content = extract_text_from_file(file_path)
    if not content:
        return {"success": False, "error": "无法提取文件内容"}

    # 根据文件类型解析章节
    file_path_obj = Path(file_path)
    if file_path_obj.suffix.lower() == '.md':
        sections = parse_markdown_to_sections(content)
    else:
        sections = parse_text_to_sections(content)

    if not sections:
        return {"success": False, "error": "无法解析文件内容"}

    # 过滤掉太短的章节
    sections = [s for s in sections if len(s["content"]) >= 50]

    if not sections:
        return {"success": False, "error": "文件内容太短，无法提取知识点"}

    # 如果没有指定章节，尝试自动匹配
    if not chapter_id:
        # 根据文件名或内容推断章节
        filename = file_path_obj.stem
        chapter_mapping = {
            "传播": "ch_xc_cbs_base",
            "新闻": "ch_xc_xw_base",
            "网络": "ch_xc_wl_base",
            "新媒体": "ch_xc_wl_newmedia",
            "广告": "ch_xc_ad_base",
            "公关": "ch_xc_pr",
            "政治": "ch_pol_my_phil",
            "英语": "ch_eng_vocab",
        }

        for keyword, ch_id in chapter_mapping.items():
            if keyword in filename or keyword in content[:1000]:
                chapter_id = ch_id
                break

    # 如果还是没有章节，使用默认章节
    if not chapter_id:
        if subject_id == "subject_xinchuan":
            chapter_id = "ch_xc_cbs_base"
        elif subject_id == "subject_politics":
            chapter_id = "ch_pol_my_phil"
        elif subject_id == "subject_english":
            chapter_id = "ch_eng_vocab"
        else:
            return {"success": False, "error": "无法确定章节，请手动指定"}

    # 创建知识点
    created_count = 0
    for i, section in enumerate(sections):
        # 跳过太短的内容
        if len(section["content"]) < 50:
            continue

        # 判断重要度
        importance = determine_importance(section["content"])

        # 提取标签
        tags = extract_tags(section["content"], section["title"])

        # 创建知识点
        knowledge_point = {
            "id": generate_id(),
            "subject_id": subject_id,
            "chapter_id": chapter_id,
            "title": section["title"][:200],  # 限制标题长度
            "content": section["content"][:5000],  # 限制内容长度
            "importance": importance,
            "frequency": "medium",
            "level": 1,
            "tags": tags,
            "sort_order": i,
        }

        db.execute(
            "INSERT INTO knowledge_points (id, subject_id, chapter_id, title, content, importance, frequency, level, tags, sort_order) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (knowledge_point["id"], knowledge_point["subject_id"], knowledge_point["chapter_id"],
             knowledge_point["title"], knowledge_point["content"], knowledge_point["importance"],
             knowledge_point["frequency"], knowledge_point["level"],
             json.dumps(knowledge_point["tags"]), knowledge_point["sort_order"])
        )
        created_count += 1

    # 记录导入任务
    import_job = {
        "id": generate_id(),
        "filename": file_path_obj.name,
        "file_path": str(file_path),
        "file_type": file_path_obj.suffix.lower(),
        "status": "completed",
        "knowledge_count": created_count,
    }

    db.execute(
        "INSERT INTO import_jobs (id, filename, file_path, file_type, status, knowledge_count) "
        "VALUES (?, ?, ?, ?, ?, ?)",
        (import_job["id"], import_job["filename"], import_job["file_path"],
         import_job["file_type"], import_job["status"], import_job["knowledge_count"])
    )

    db.commit()
    db.close()

    return {
        "success": True,
        "message": f"成功导入 {created_count} 个知识点",
        "knowledge_count": created_count,
        "import_job_id": import_job["id"],
    }


def get_import_history() -> List[Dict]:
    """获取导入历史"""
    db = get_db()
    rows = db.execute(
        "SELECT * FROM import_jobs ORDER BY created_at DESC LIMIT 50"
    ).fetchall()
    db.close()
    return [dict(row) for row in rows]


if __name__ == "__main__":
    # 测试导入功能
    import sys

    if len(sys.argv) < 3:
        print("用法: python document_importer.py <文件路径> <学科ID> [章节ID]")
        print("学科ID: subject_xinchuan, subject_politics, subject_english")
        sys.exit(1)

    file_path = sys.argv[1]
    subject_id = sys.argv[2]
    chapter_id = sys.argv[3] if len(sys.argv) > 3 else None

    result = import_document(file_path, subject_id, chapter_id)
    print(json.dumps(result, ensure_ascii=False, indent=2))
