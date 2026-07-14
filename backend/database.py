"""
数据库连接管理 - SQLite（兼容旧版本）
"""
import sqlite3
import os
import json
import uuid
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict, Any

DB_PATH = Path(os.getenv("DATABASE_PATH", str(Path(__file__).parent / "exam_os.db"))).expanduser().resolve()
DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def get_db() -> sqlite3.Connection:
    """获取数据库连接"""
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def init_db():
    """初始化数据库表"""
    conn = get_db()
    cursor = conn.cursor()

    # 用户表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            username TEXT UNIQUE NOT NULL,
            hashed_password TEXT NOT NULL,
            avatar TEXT,
            target_school TEXT,
            target_major TEXT,
            exam_date TEXT,
            is_active INTEGER DEFAULT 1,
            is_premium INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime'))
        )
    """)

    # 会话表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS conversations (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            title TEXT DEFAULT '新对话',
            subject TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime')),
            message_count INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # 消息表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id TEXT PRIMARY KEY,
            conversation_id TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
            content TEXT NOT NULL,
            model TEXT,
            provider TEXT,
            tokens_used INTEGER,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
        )
    """)

    # 闪卡表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS flashcards (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            front TEXT NOT NULL,
            back TEXT NOT NULL,
            subject TEXT,
            topic TEXT,
            card_type TEXT DEFAULT 'qa',
            difficulty REAL DEFAULT 0.5,
            stability REAL DEFAULT 2.5,
            retrievability REAL DEFAULT 0.9,
            due_date TEXT DEFAULT (datetime('now', 'localtime')),
            last_review TEXT,
            review_count INTEGER DEFAULT 0,
            lapse_count INTEGER DEFAULT 0,
            source_doc TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # 闪卡复习记录表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS flashcard_reviews (
            id TEXT PRIMARY KEY,
            card_id TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 4),
            review_duration INTEGER,
            stability_before REAL,
            stability_after REAL,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (card_id) REFERENCES flashcards(id) ON DELETE CASCADE
        )
    """)

    # 错题表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS wrong_questions (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            content TEXT NOT NULL,
            subject TEXT NOT NULL,
            topic TEXT,
            answer TEXT,
            user_answer TEXT,
            error_type TEXT,
            error_analysis TEXT,
            wrong_count INTEGER DEFAULT 1,
            mastery INTEGER DEFAULT 0,
            last_wrong_at TEXT DEFAULT (datetime('now', 'localtime')),
            next_review TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # 学习计划表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS study_plans (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            target_date TEXT NOT NULL,
            daily_hours INTEGER DEFAULT 8,
            subjects TEXT,
            phases TEXT,
            daily_plan TEXT,
            status TEXT DEFAULT 'active',
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # 学习记录表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS study_records (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            activity_type TEXT NOT NULL,
            subject TEXT,
            duration_minutes INTEGER,
            score REAL,
            details TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # 模拟考试表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS exams (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            subject TEXT NOT NULL,
            difficulty TEXT DEFAULT 'medium',
            total_questions INTEGER,
            total_score REAL,
            score REAL,
            accuracy REAL,
            time_limit INTEGER,
            time_used INTEGER,
            status TEXT DEFAULT 'created',
            questions TEXT,
            answers TEXT,
            analysis TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            completed_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # 社区帖子表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            tags TEXT,
            likes INTEGER DEFAULT 0,
            comments INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # ============ 知识库表 ============

    # 学科表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS subjects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            code TEXT,
            description TEXT,
            icon TEXT,
            color TEXT,
            sort_order INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now', 'localtime'))
        )
    """)

    # 章节表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chapters (
            id TEXT PRIMARY KEY,
            subject_id TEXT NOT NULL,
            parent_id TEXT,
            name TEXT NOT NULL,
            description TEXT,
            sort_order INTEGER DEFAULT 0,
            level INTEGER DEFAULT 1,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (subject_id) REFERENCES subjects(id),
            FOREIGN KEY (parent_id) REFERENCES chapters(id)
        )
    """)

    # 知识点表（核心）
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS knowledge_points (
            id TEXT PRIMARY KEY,
            subject_id TEXT NOT NULL,
            chapter_id TEXT NOT NULL,
            parent_id TEXT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            base_content TEXT,
            summary TEXT,
            key_points TEXT,
            case_analysis TEXT,
            common_mistakes TEXT,
            training_steps TEXT,
            self_test TEXT,
            quality_version INTEGER DEFAULT 0,
            importance TEXT DEFAULT 'medium',
            frequency TEXT DEFAULT 'medium',
            level INTEGER DEFAULT 1,
            tags TEXT,
            exam_tips TEXT,
            answer_template TEXT,
            memory_tips TEXT,
            ai_explanation TEXT,
            source TEXT,
            sort_order INTEGER DEFAULT 0,
            mastery INTEGER DEFAULT 0,
            review_count INTEGER DEFAULT 0,
            last_reviewed TEXT,
            next_review TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (subject_id) REFERENCES subjects(id),
            FOREIGN KEY (chapter_id) REFERENCES chapters(id),
            FOREIGN KEY (parent_id) REFERENCES knowledge_points(id)
        )
    """)

    # 知识点关系表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS knowledge_relations (
            id TEXT PRIMARY KEY,
            source_id TEXT NOT NULL,
            target_id TEXT NOT NULL,
            relation_type TEXT NOT NULL,
            description TEXT,
            weight REAL DEFAULT 1.0,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (source_id) REFERENCES knowledge_points(id),
            FOREIGN KEY (target_id) REFERENCES knowledge_points(id)
        )
    """)

    # 真题关联表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS exam_questions (
            id TEXT PRIMARY KEY,
            knowledge_point_id TEXT,
            subject TEXT NOT NULL,
            year INTEGER,
            school TEXT,
            question_type TEXT NOT NULL,
            content TEXT NOT NULL,
            options TEXT,
            answer TEXT NOT NULL,
            score INTEGER,
            analysis TEXT,
            scoring_points TEXT,
            answer_framework TEXT,
            difficulty INTEGER DEFAULT 3,
            frequency INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (knowledge_point_id) REFERENCES knowledge_points(id)
        )
    """)

    # AI 总结缓存表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ai_summaries (
            id TEXT PRIMARY KEY,
            knowledge_point_id TEXT NOT NULL,
            summary_type TEXT NOT NULL,
            content TEXT NOT NULL,
            model TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (knowledge_point_id) REFERENCES knowledge_points(id)
        )
    """)

    # 导入任务表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS import_jobs (
            id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            file_path TEXT NOT NULL,
            file_type TEXT NOT NULL,
            subject TEXT,
            status TEXT DEFAULT 'pending',
            result_summary TEXT,
            knowledge_count INTEGER DEFAULT 0,
            error_message TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            completed_at TEXT
        )
    """)

    # 学习会话表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS study_sessions (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            knowledge_point_id TEXT,
            subject TEXT,
            activity_type TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT,
            duration_seconds INTEGER,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    # 词汇表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS vocabulary (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            word TEXT NOT NULL,
            phonetic TEXT,
            meaning TEXT NOT NULL,
            example TEXT,
            category TEXT DEFAULT '核心词汇',
            subject TEXT DEFAULT 'english',
            mastery INTEGER DEFAULT 0,
            review_count INTEGER DEFAULT 0,
            last_reviewed TEXT,
            next_review TEXT,
            is_custom INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    """)

    # 词汇复习记录表
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS vocabulary_reviews (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            word_id TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 4),
            stability REAL DEFAULT 2.5,
            difficulty REAL DEFAULT 0.5,
            due_date TEXT NOT NULL,
            review_count INTEGER DEFAULT 0,
            lapse_count INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (word_id) REFERENCES vocabulary(id) ON DELETE CASCADE,
            UNIQUE(user_id, word_id)
        )
    """)

    # 知识点复习记录表（FSRS 间隔复习）
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS knowledge_reviews (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            knowledge_point_id TEXT NOT NULL,
            stability REAL DEFAULT 2.5,
            difficulty REAL DEFAULT 0.5,
            review_count INTEGER DEFAULT 0,
            lapse_count INTEGER DEFAULT 0,
            due_date TEXT NOT NULL,
            last_review TEXT,
            created_at TEXT DEFAULT (datetime('now', 'localtime')),
            updated_at TEXT DEFAULT (datetime('now', 'localtime')),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (knowledge_point_id) REFERENCES knowledge_points(id),
            UNIQUE(user_id, knowledge_point_id)
        )
    """)

    # 创建索引
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_messages_conv ON messages(conversation_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_flashcards_user ON flashcards(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_flashcards_due ON flashcards(due_date, subject)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_wrong_questions_user ON wrong_questions(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_study_records_user ON study_records(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_study_records_date ON study_records(created_at)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kp_subject ON knowledge_points(subject_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kp_chapter ON knowledge_points(chapter_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kp_parent ON knowledge_points(parent_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kp_importance ON knowledge_points(importance, frequency)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kr_source ON knowledge_relations(source_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kr_target ON knowledge_relations(target_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kr_user ON knowledge_reviews(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kr_due ON knowledge_reviews(due_date)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_kr_kp ON knowledge_reviews(knowledge_point_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_eq_kp ON exam_questions(knowledge_point_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_eq_subject ON exam_questions(subject, year)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_vocab_user ON vocabulary(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_vocab_word ON vocabulary(word)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_vocab_due ON vocabulary(next_review)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_vr_user ON vocabulary_reviews(user_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_vr_word ON vocabulary_reviews(word_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_vr_due ON vocabulary_reviews(due_date)")

    conn.commit()
    conn.close()


def generate_id() -> str:
    """生成唯一ID"""
    return str(uuid.uuid4())


def dict_from_row(row: sqlite3.Row) -> dict:
    """将 Row 转为 dict"""
    if row is None:
        return None
    return dict(row)


def dicts_from_rows(rows: List[sqlite3.Row]) -> List[dict]:
    """将 Row 列表转为 dict 列表"""
    return [dict(r) for r in rows]
