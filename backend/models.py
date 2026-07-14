"""
数据库模型 - SQLAlchemy ORM
"""
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, DateTime, ForeignKey, JSON, Index
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy.sql import func
import uuid

Base = declarative_base()


def generate_uuid():
    return str(uuid.uuid4())


class User(Base):
    """用户表"""
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    avatar = Column(String(500))
    target_school = Column(String(200))
    target_major = Column(String(200))
    exam_date = Column(DateTime)
    is_active = Column(Boolean, default=True)
    is_premium = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # 关系
    conversations = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")
    flashcards = relationship("Flashcard", back_populates="user", cascade="all, delete-orphan")
    study_records = relationship("StudyRecord", back_populates="user", cascade="all, delete-orphan")


class Conversation(Base):
    """会话表"""
    __tablename__ = "conversations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), default="新对话")
    subject = Column(String(100))
    message_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # 关系
    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

    __table_args__ = (
        Index("idx_conversations_user", "user_id"),
        Index("idx_conversations_updated", "updated_at"),
    )


class Message(Base):
    """消息表"""
    __tablename__ = "messages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    conversation_id = Column(String(36), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    role = Column(String(20), nullable=False)  # user, assistant, system
    content = Column(Text, nullable=False)
    model = Column(String(100))
    provider = Column(String(50))
    tokens_used = Column(Integer)
    created_at = Column(DateTime, default=func.now())

    # 关系
    conversation = relationship("Conversation", back_populates="messages")

    __table_args__ = (
        Index("idx_messages_conversation", "conversation_id"),
        Index("idx_messages_created", "created_at"),
    )


class Flashcard(Base):
    """闪卡表"""
    __tablename__ = "flashcards"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    front = Column(Text, nullable=False)
    back = Column(Text, nullable=False)
    subject = Column(String(100))
    topic = Column(String(200))
    card_type = Column(String(20), default="qa")  # qa, concept, formula, cloze
    difficulty = Column(Float, default=0.5)
    stability = Column(Float, default=2.5)
    retrievability = Column(Float, default=0.9)
    due_date = Column(DateTime, default=func.now())
    last_review = Column(DateTime)
    review_count = Column(Integer, default=0)
    lapse_count = Column(Integer, default=0)
    source_doc = Column(String(500))
    created_at = Column(DateTime, default=func.now())

    # 关系
    user = relationship("User", back_populates="flashcards")
    reviews = relationship("FlashcardReview", back_populates="card", cascade="all, delete-orphan")

    __table_args__ = (
        Index("idx_flashcards_user", "user_id"),
        Index("idx_flashcards_due", "due_date", "subject"),
    )


class FlashcardReview(Base):
    """闪卡复习记录表"""
    __tablename__ = "flashcard_reviews"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    card_id = Column(String(36), ForeignKey("flashcards.id", ondelete="CASCADE"), nullable=False)
    rating = Column(Integer, nullable=False)  # 1-4
    review_duration = Column(Integer)  # 秒
    stability_before = Column(Float)
    stability_after = Column(Float)
    created_at = Column(DateTime, default=func.now())

    # 关系
    card = relationship("Flashcard", back_populates="reviews")

    __table_args__ = (
        Index("idx_flashcard_reviews_card", "card_id"),
    )


class WrongQuestion(Base):
    """错题表"""
    __tablename__ = "wrong_questions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    subject = Column(String(100), nullable=False)
    topic = Column(String(200))
    answer = Column(Text)
    user_answer = Column(Text)
    error_type = Column(String(50))
    error_analysis = Column(Text)
    wrong_count = Column(Integer, default=1)
    mastery = Column(Integer, default=0)  # 0-100
    last_wrong_at = Column(DateTime, default=func.now())
    next_review = Column(DateTime)
    exam_id = Column(String(36))
    created_at = Column(DateTime, default=func.now())

    __table_args__ = (
        Index("idx_wrong_questions_user", "user_id"),
        Index("idx_wrong_questions_subject", "subject", "topic"),
    )


class Document(Base):
    """文档表"""
    __tablename__ = "documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    filename = Column(String(500), nullable=False)
    file_path = Column(String(1000))
    file_size = Column(Integer)
    file_type = Column(String(50))
    subject = Column(String(100))
    title = Column(String(500))
    summary = Column(Text)
    tags = Column(JSON)
    page_count = Column(Integer)
    status = Column(String(20), default="uploaded")  # uploaded, processing, processed, error
    created_at = Column(DateTime, default=func.now())
    processed_at = Column(DateTime)

    __table_args__ = (
        Index("idx_documents_user", "user_id"),
        Index("idx_documents_subject", "subject"),
    )


class StudyPlan(Base):
    """学习计划表"""
    __tablename__ = "study_plans"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    target_date = Column(DateTime, nullable=False)
    daily_hours = Column(Integer, default=8)
    subjects = Column(JSON, nullable=False)
    phases = Column(JSON)
    daily_plan = Column(JSON)
    status = Column(String(20), default="active")  # active, completed, archived
    created_at = Column(DateTime, default=func.now())

    __table_args__ = (
        Index("idx_study_plans_user", "user_id"),
        Index("idx_study_plans_date", "target_date"),
    )


class StudyRecord(Base):
    """学习记录表"""
    __tablename__ = "study_records"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    activity_type = Column(String(50), nullable=False)  # ai_chat, flashcard_review, exam, file_upload, study
    subject = Column(String(100))
    duration_minutes = Column(Integer)
    score = Column(Float)
    details = Column(JSON)
    created_at = Column(DateTime, default=func.now())

    # 关系
    user = relationship("User", back_populates="study_records")

    __table_args__ = (
        Index("idx_study_records_user", "user_id"),
        Index("idx_study_records_date", "created_at"),
    )


class Exam(Base):
    """模拟考试表"""
    __tablename__ = "exams"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    subject = Column(String(100), nullable=False)
    difficulty = Column(String(20), default="medium")
    total_questions = Column(Integer)
    total_score = Column(Float)
    score = Column(Float)
    accuracy = Column(Float)
    time_limit = Column(Integer)  # 分钟
    time_used = Column(Integer)  # 秒
    status = Column(String(20), default="created")  # created, in_progress, completed
    questions = Column(JSON)
    answers = Column(JSON)
    analysis = Column(JSON)
    created_at = Column(DateTime, default=func.now())
    completed_at = Column(DateTime)

    __table_args__ = (
        Index("idx_exams_user", "user_id"),
    )
