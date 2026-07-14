"""
AI 考研学习操作系统 - FastAPI Backend v3.0
兼容版本：SQLite + JWT认证
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, timedelta
import json
from contextlib import asynccontextmanager
import logging
import uuid
from pathlib import Path

try:
    import PyPDF2
    HAS_PDF = True
except ImportError:
    HAS_PDF = False

from config import APP_NAME, APP_VERSION, HOST, PORT, DEBUG, CORS_ORIGINS_LIST, ALLOWED_EXTENSIONS_LIST, get_available_provider, UPLOAD_DIR as CONFIG_UPLOAD_DIR
from database import init_db, get_db, generate_id, dict_from_row, dicts_from_rows
from comprehensive_knowledge import seed_comprehensive_knowledge
from deep_knowledge_upgrade import upgrade_all_knowledge
from auth import get_password_hash, verify_password, create_access_token, decode_token
from services.ai_service import ai_service

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(_: FastAPI):
    """应用启动时初始化"""
    init_db()
    try:
        knowledge_stats = seed_comprehensive_knowledge()
        logger.info(f"📚 综合知识库已就绪: {knowledge_stats}")
    except Exception:
        logger.exception("综合知识库自动补全失败，服务将继续启动")
    try:
        deep_stats = upgrade_all_knowledge()
        logger.info(f"📖 642 点深度知识库已就绪: {deep_stats}")
    except Exception:
        logger.exception("深度知识库升级失败，服务将继续启动并保留原有数据")
    _create_admin_account()
    logger.info(f"✅ 数据库初始化完成")
    logger.info(f"🤖 AI Provider: {get_available_provider()['name']}")
    logger.info(f"🚀 {APP_NAME} v{APP_VERSION} 启动完成")
    yield

app = FastAPI(
    title=APP_NAME,
    description="一站式 AI 考研平台 API",
    version=APP_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS_LIST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer(auto_error=False)


def _create_admin_account():
    """仅在显式提供环境变量时创建管理员，绝不使用公开默认密码。"""
    admin_email = os.getenv("ADMIN_EMAIL", "").strip().lower()
    admin_password = os.getenv("ADMIN_PASSWORD", "")
    admin_username = os.getenv("ADMIN_USERNAME", "管理员").strip() or "管理员"
    if not admin_email and not admin_password:
        logger.info("ℹ️ 未配置 ADMIN_EMAIL/ADMIN_PASSWORD，跳过管理员账号创建")
        return
    if not admin_email or len(admin_password) < 12:
        raise RuntimeError("创建管理员需要同时设置 ADMIN_EMAIL 与至少 12 位的 ADMIN_PASSWORD")

    db = get_db()
    try:
        existing = db.execute("SELECT id FROM users WHERE email = ?", (admin_email,)).fetchone()
        if not existing:
            db.execute(
                "INSERT INTO users (id, email, username, hashed_password, target_school, target_major, is_active, is_premium) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (generate_id(), admin_email, admin_username, get_password_hash(admin_password),
                 os.getenv("ADMIN_TARGET_SCHOOL", ""), os.getenv("ADMIN_TARGET_MAJOR", ""), 1, 1),
            )
            db.commit()
            logger.info("✅ 管理员账号已按环境变量创建: %s", admin_email)
        else:
            logger.info("ℹ️ 管理员账号已存在: %s", admin_email)
    finally:
        db.close()


# ============ 认证辅助函数 ============

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """获取当前用户"""
    if not credentials:
        raise HTTPException(status_code=401, detail="未提供认证凭据")

    token = credentials.credentials
    payload = decode_token(token)
    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(status_code=401, detail="无效的认证凭据")

    db = get_db()
    user = db.execute("SELECT * FROM users WHERE id = ? AND is_active = 1", (user_id,)).fetchone()
    db.close()

    if not user:
        raise HTTPException(status_code=401, detail="用户不存在或已被禁用")

    return dict_from_row(user)


# ============ Pydantic Models ============

class UserRegister(BaseModel):
    email: str
    username: str
    password: str
    target_school: Optional[str] = None
    target_major: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class ChatRequest(BaseModel):
    message: str
    subject: Optional[str] = None
    model: Optional[str] = None
    conversation_id: Optional[str] = None

class FlashcardCreate(BaseModel):
    front: str
    back: str
    subject: Optional[str] = None
    topic: Optional[str] = None
    card_type: str = "qa"

class FlashcardReview(BaseModel):
    rating: int

class FlashcardGenerate(BaseModel):
    subject: str
    count: int = 10
    topic: Optional[str] = None

class WrongQuestionCreate(BaseModel):
    subject: str
    chapter: Optional[str] = None
    question: str
    user_answer: Optional[str] = None
    correct_answer: Optional[str] = None
    explanation: Optional[str] = None
    error_reason: Optional[str] = None

class StudyPlanCreate(BaseModel):
    title: str
    subject: str = "440"
    duration: int = 30
    priority: str = "medium"
    date: str

class StudySessionStart(BaseModel):
    knowledge_point_id: Optional[str] = None
    subject: Optional[str] = None
    activity_type: str = "study"

class StudySessionStop(BaseModel):
    duration_seconds: int

class ExamGenerateRequest(BaseModel):
    subject: str = "440"
    count: int = 10
    difficulty: str = "中等"

class ExamSaveRequest(BaseModel):
    subject: str
    difficulty: str = "中等"
    total_questions: int
    total_score: float
    score: float
    time_used: Optional[int] = None
    questions: List[dict]
    answers: dict


# ============ 知识库 Pydantic Models ============

class SubjectCreate(BaseModel):
    name: str
    code: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    sort_order: int = 0

class ChapterCreate(BaseModel):
    subject_id: str
    parent_id: Optional[str] = None
    name: str
    description: Optional[str] = None
    sort_order: int = 0
    level: int = 1

class KnowledgePointCreate(BaseModel):
    subject_id: str
    chapter_id: str
    parent_id: Optional[str] = None
    title: str
    content: str
    summary: Optional[str] = None
    importance: str = "medium"
    frequency: str = "medium"
    level: int = 1
    tags: Optional[List[str]] = None
    exam_tips: Optional[str] = None
    answer_template: Optional[str] = None
    memory_tips: Optional[str] = None
    key_points: Optional[str] = None
    case_analysis: Optional[str] = None
    common_mistakes: Optional[str] = None
    training_steps: Optional[str] = None
    self_test: Optional[str] = None
    source: Optional[str] = None
    sort_order: int = 0

class KnowledgePointUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    summary: Optional[str] = None
    importance: Optional[str] = None
    frequency: Optional[str] = None
    tags: Optional[List[str]] = None
    exam_tips: Optional[str] = None
    answer_template: Optional[str] = None
    memory_tips: Optional[str] = None
    key_points: Optional[str] = None
    case_analysis: Optional[str] = None
    common_mistakes: Optional[str] = None
    training_steps: Optional[str] = None
    self_test: Optional[str] = None
    ai_explanation: Optional[str] = None
    mastery: Optional[int] = None

class KnowledgeRelationCreate(BaseModel):
    source_id: str
    target_id: str
    relation_type: str
    description: Optional[str] = None
    weight: float = 1.0

class ExamQuestionCreate(BaseModel):
    knowledge_point_id: Optional[str] = None
    subject: str
    year: Optional[int] = None
    school: Optional[str] = None
    question_type: str
    content: str
    options: Optional[List[str]] = None
    answer: str
    score: Optional[int] = None
    analysis: Optional[str] = None
    scoring_points: Optional[List[str]] = None
    answer_framework: Optional[str] = None
    difficulty: int = 3

class AIExplainRequest(BaseModel):
    knowledge_point_id: str
    style: str = "detailed"  # detailed, concise, exam_focused

class AIAnswerHelperRequest(BaseModel):
    question: str
    subject: Optional[str] = None

class AIWrongAnalysisRequest(BaseModel):
    question_content: str
    user_answer: str
    correct_answer: str
    subject: Optional[str] = None

class AIStudyPlanRequest(BaseModel):
    exam_date: str
    subjects: Optional[List[str]] = None
    hours_per_day: int = 10


# ============ 用户认证 API ============

@app.post("/api/auth/register")
async def register(user_data: UserRegister):
    """用户注册"""
    db = get_db()

    existing = db.execute("SELECT id FROM users WHERE email = ?", (user_data.email,)).fetchone()
    if existing:
        db.close()
        raise HTTPException(400, "该邮箱已被注册")

    existing = db.execute("SELECT id FROM users WHERE username = ?", (user_data.username,)).fetchone()
    if existing:
        db.close()
        raise HTTPException(400, "该用户名已被使用")

    user_id = generate_id()
    db.execute(
        "INSERT INTO users (id, email, username, hashed_password, target_school, target_major) VALUES (?, ?, ?, ?, ?, ?)",
        (user_id, user_data.email, user_data.username, get_password_hash(user_data.password),
         user_data.target_school, user_data.target_major)
    )
    db.commit()
    db.close()

    access_token = create_access_token(data={"sub": user_id})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user_data.email,
            "username": user_data.username,
            "target_school": user_data.target_school,
            "target_major": user_data.target_major,
        }
    }


@app.post("/api/auth/login")
async def login(user_data: UserLogin):
    """用户登录"""
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email = ?", (user_data.email,)).fetchone()
    db.close()

    if not user:
        raise HTTPException(401, "邮箱或密码错误")

    if not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(401, "邮箱或密码错误")

    if not user["is_active"]:
        raise HTTPException(403, "用户已被禁用")

    access_token = create_access_token(data={"sub": user["id"]})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "username": user["username"],
            "target_school": user["target_school"],
            "target_major": user["target_major"],
        }
    }


@app.get("/api/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """获取当前用户信息"""
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "username": current_user["username"],
        "target_school": current_user["target_school"],
        "target_major": current_user["target_major"],
        "is_premium": current_user["is_premium"],
    }


@app.put("/api/auth/me")
async def update_me(update_data: dict, current_user: dict = Depends(get_current_user)):
    """更新当前用户信息"""
    db = get_db()
    allowed_fields = ["username", "target_school", "target_major", "exam_date", "avatar"]
    updates = []
    params = []
    for field in allowed_fields:
        if field in update_data and update_data[field] is not None:
            updates.append(f"{field} = ?")
            params.append(update_data[field])

    if updates:
        updates.append("updated_at = datetime('now', 'localtime')")
        params.append(current_user["id"])
        db.execute(f"UPDATE users SET {', '.join(updates)} WHERE id = ?", params)
        db.commit()
    db.close()
    return {"status": "updated"}


# ============ AI Chat API ============

@app.post("/api/chat")
async def chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    """AI 导师对话"""
    db = get_db()

    conversation_id = request.conversation_id
    if not conversation_id:
        conversation_id = generate_id()
        db.execute(
            "INSERT INTO conversations (id, user_id, title, subject) VALUES (?, ?, ?, ?)",
            (conversation_id, current_user["id"], request.message[:50], request.subject)
        )
        db.commit()

    db.execute(
        "INSERT INTO messages (id, conversation_id, role, content) VALUES (?, ?, ?, ?)",
        (generate_id(), conversation_id, "user", request.message)
    )
    db.execute(
        "UPDATE conversations SET updated_at = datetime('now', 'localtime'), message_count = message_count + 1 WHERE id = ?",
        (conversation_id,)
    )
    db.commit()
    db.close()

    async def stream_response():
        full_content = ""
        model_used = ""
        provider_used = ""

        async for chunk in ai_service.chat(
            message=request.message,
            conversation_id=conversation_id,
            model=request.model,
            subject=request.subject,
        ):
            try:
                data = json.loads(chunk.strip())
                if data["type"] == "content":
                    full_content += data["content"]
                elif data["type"] == "done":
                    model_used = data.get("model", "")
                    provider_used = data.get("provider", "")
            except:
                pass
            yield chunk

        if full_content:
            db = get_db()
            db.execute(
                "INSERT INTO messages (id, conversation_id, role, content, model, provider) VALUES (?, ?, ?, ?, ?, ?)",
                (generate_id(), conversation_id, "assistant", full_content, model_used, provider_used)
            )
            db.execute(
                "UPDATE conversations SET message_count = message_count + 1, updated_at = datetime('now', 'localtime') WHERE id = ?",
                (conversation_id,)
            )
            db.execute(
                "INSERT INTO study_records (id, user_id, activity_type, subject, details) VALUES (?, ?, ?, ?, ?)",
                (generate_id(), current_user["id"], "ai_chat", request.subject,
                 json.dumps({"conversation_id": conversation_id}))
            )
            db.commit()
            db.close()

    return StreamingResponse(stream_response(), media_type="text/event-stream")


@app.get("/api/conversations")
async def list_conversations(page: int = 1, limit: int = 50, current_user: dict = Depends(get_current_user)):
    """获取会话列表"""
    db = get_db()
    offset = (page - 1) * limit
    rows = db.execute(
        "SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT ? OFFSET ?",
        (current_user["id"], limit, offset)
    ).fetchall()
    total = db.execute("SELECT COUNT(*) FROM conversations WHERE user_id = ?", (current_user["id"],)).fetchone()[0]
    db.close()
    return {"total": total, "page": page, "conversations": dicts_from_rows(rows)}


@app.get("/api/conversations/{conversation_id}/messages")
async def get_messages(conversation_id: str, current_user: dict = Depends(get_current_user)):
    """获取会话消息"""
    db = get_db()
    rows = db.execute(
        "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
        (conversation_id,)
    ).fetchall()
    db.close()
    return {"conversation_id": conversation_id, "messages": dicts_from_rows(rows)}


@app.delete("/api/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str, current_user: dict = Depends(get_current_user)):
    """删除会话"""
    db = get_db()
    db.execute("DELETE FROM conversations WHERE id = ? AND user_id = ?", (conversation_id, current_user["id"]))
    db.commit()
    db.close()
    return {"status": "deleted"}


# ============ 闪卡 API ============

def fsrs_schedule(card: dict, rating: int) -> dict:
    """FSRS 间隔重复算法"""
    from datetime import timedelta

    stability = card.get("stability", 2.5)
    difficulty = card.get("difficulty", 0.5)
    review_count = card.get("review_count", 0)
    lapse_count = card.get("lapse_count", 0)

    if rating == 1:
        stability = max(0.5, stability * 0.5)
        lapse_count += 1
        interval_minutes = 10
    elif rating == 2:
        stability = stability * 0.8
        interval_minutes = int(60 * stability * 0.5)
    elif rating == 3:
        stability = stability * 1.0 + 0.1
        interval_minutes = int(60 * 24 * stability)
    else:
        stability = stability * 1.2 + 0.3
        interval_minutes = int(60 * 24 * stability * 1.5)

    review_count += 1
    due = datetime.now() + timedelta(minutes=interval_minutes)

    return {
        "stability": round(stability, 3),
        "difficulty": round(difficulty, 3),
        "due_date": due.isoformat(),
        "review_count": review_count,
        "lapse_count": lapse_count,
        "interval_description": f"{interval_minutes}分钟" if interval_minutes < 60 else f"{interval_minutes // 60}小时" if interval_minutes < 1440 else f"{interval_minutes // 1440}天",
    }


@app.get("/api/flashcards/due")
async def get_due_cards(subject: Optional[str] = None, limit: int = 20, current_user: dict = Depends(get_current_user)):
    """获取到期闪卡"""
    db = get_db()
    now = datetime.now().isoformat()

    if subject:
        rows = db.execute(
            "SELECT * FROM flashcards WHERE user_id = ? AND due_date <= ? AND subject = ? ORDER BY due_date ASC LIMIT ?",
            (current_user["id"], now, subject, limit)
        ).fetchall()
        total_due = db.execute(
            "SELECT COUNT(*) FROM flashcards WHERE user_id = ? AND due_date <= ? AND subject = ?",
            (current_user["id"], now, subject)
        ).fetchone()[0]
    else:
        rows = db.execute(
            "SELECT * FROM flashcards WHERE user_id = ? AND due_date <= ? ORDER BY due_date ASC LIMIT ?",
            (current_user["id"], now, limit)
        ).fetchall()
        total_due = db.execute(
            "SELECT COUNT(*) FROM flashcards WHERE user_id = ? AND due_date <= ?",
            (current_user["id"], now)
        ).fetchone()[0]

    db.close()
    return {"total_due": total_due, "cards": dicts_from_rows(rows)}


@app.post("/api/flashcards")
async def create_flashcard(card: FlashcardCreate, current_user: dict = Depends(get_current_user)):
    """创建闪卡"""
    card_id = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO flashcards (id, user_id, front, back, subject, topic, card_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (card_id, current_user["id"], card.front, card.back, card.subject, card.topic, card.card_type)
    )
    db.commit()
    db.close()
    return {"id": card_id, "status": "created"}


@app.post("/api/flashcards/generate")
async def generate_flashcards(request: FlashcardGenerate, current_user: dict = Depends(get_current_user)):
    """AI 生成闪卡"""
    prompt = f"""请为考研科目「{request.subject}」生成 {request.count} 张学习闪卡。
{f'重点主题：{request.topic}' if request.topic else ''}
请严格按JSON格式输出：[{{"front":"问题","back":"答案"}}]"""

    response_text = await ai_service.chat_simple(message=prompt, subject=request.subject)

    try:
        json_start = response_text.find("[")
        json_end = response_text.rfind("]") + 1
        cards_data = json.loads(response_text[json_start:json_end])
    except:
        return {"error": "AI 返回格式异常，请重试", "raw_response": response_text[:500]}

    db = get_db()
    created = []
    for card_data in cards_data:
        card_id = generate_id()
        db.execute(
            "INSERT INTO flashcards (id, user_id, front, back, subject, topic) VALUES (?, ?, ?, ?, ?, ?)",
            (card_id, current_user["id"], card_data["front"], card_data["back"], request.subject, request.topic)
        )
        created.append({"id": card_id, "front": card_data["front"], "back": card_data["back"]})

    db.commit()
    db.close()
    return {"generated": len(created), "cards": created}


@app.post("/api/flashcards/{card_id}/review")
async def review_flashcard(card_id: str, review: FlashcardReview, current_user: dict = Depends(get_current_user)):
    """复习闪卡"""
    if review.rating < 1 or review.rating > 4:
        raise HTTPException(400, "Rating must be 1-4")

    db = get_db()
    card = db.execute("SELECT * FROM flashcards WHERE id = ? AND user_id = ?", (card_id, current_user["id"])).fetchone()
    if not card:
        db.close()
        raise HTTPException(404, "闪卡不存在")

    result = fsrs_schedule(dict(card), review.rating)

    db.execute(
        "UPDATE flashcards SET stability = ?, difficulty = ?, due_date = ?, review_count = ?, lapse_count = ?, last_review = datetime('now', 'localtime') WHERE id = ?",
        (result["stability"], result["difficulty"], result["due_date"], result["review_count"], result["lapse_count"], card_id)
    )

    db.execute(
        "INSERT INTO study_records (id, user_id, activity_type, subject, score) VALUES (?, ?, ?, ?, ?)",
        (generate_id(), current_user["id"], "flashcard_review", card["subject"], review.rating)
    )

    db.commit()
    db.close()

    return {"card_id": card_id, "rating": review.rating, "next_review": result["interval_description"], "due_date": result["due_date"]}


@app.get("/api/flashcards")
async def list_flashcards(subject: Optional[str] = None, page: int = 1, limit: int = 50, current_user: dict = Depends(get_current_user)):
    """列出闪卡"""
    db = get_db()
    offset = (page - 1) * limit

    if subject:
        rows = db.execute(
            "SELECT * FROM flashcards WHERE user_id = ? AND subject = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
            (current_user["id"], subject, limit, offset)
        ).fetchall()
        total = db.execute("SELECT COUNT(*) FROM flashcards WHERE user_id = ? AND subject = ?", (current_user["id"], subject)).fetchone()[0]
    else:
        rows = db.execute(
            "SELECT * FROM flashcards WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
            (current_user["id"], limit, offset)
        ).fetchall()
        total = db.execute("SELECT COUNT(*) FROM flashcards WHERE user_id = ?", (current_user["id"],)).fetchone()[0]

    db.close()
    return {"total": total, "page": page, "cards": dicts_from_rows(rows)}


@app.get("/api/flashcards/stats")
async def flashcard_stats(current_user: dict = Depends(get_current_user)):
    """闪卡统计"""
    db = get_db()
    total = db.execute("SELECT COUNT(*) FROM flashcards WHERE user_id = ?", (current_user["id"],)).fetchone()[0]
    now = datetime.now().isoformat()
    due = db.execute("SELECT COUNT(*) FROM flashcards WHERE user_id = ? AND due_date <= ?", (current_user["id"], now)).fetchone()[0]

    today_start = datetime.now().replace(hour=0, minute=0, second=0).isoformat()
    reviewed_today = db.execute(
        "SELECT COUNT(*) FROM study_records WHERE user_id = ? AND activity_type = 'flashcard_review' AND created_at >= ?",
        (current_user["id"], today_start)
    ).fetchone()[0]

    db.close()
    return {"total_cards": total, "due_now": due, "reviewed_today": reviewed_today}


# ============ 知识点复习 API（FSRS） ============

@app.get("/api/knowledge/reviews/due")
async def get_due_knowledge_reviews(
    subject_id: Optional[str] = None,
    limit: int = 20,
    current_user: dict = Depends(get_current_user)
):
    """获取需要复习的知识点"""
    db = get_db()
    now = datetime.now().isoformat()

    # 获取用户的知识点复习记录
    if subject_id:
        rows = db.execute("""
            SELECT kr.*, kp.title, kp.content, kp.importance, kp.tags, kp.chapter_id
            FROM knowledge_reviews kr
            JOIN knowledge_points kp ON kr.knowledge_point_id = kp.id
            WHERE kr.user_id = ? AND kr.due_date <= ? AND kp.subject_id = ?
            ORDER BY kr.due_date ASC
            LIMIT ?
        """, (current_user["id"], now, subject_id, limit)).fetchall()
    else:
        rows = db.execute("""
            SELECT kr.*, kp.title, kp.content, kp.importance, kp.tags, kp.chapter_id
            FROM knowledge_reviews kr
            JOIN knowledge_points kp ON kr.knowledge_point_id = kp.id
            WHERE kr.user_id = ? AND kr.due_date <= ?
            ORDER BY kr.due_date ASC
            LIMIT ?
        """, (current_user["id"], now, limit)).fetchall()

    db.close()

    reviews = []
    for row in rows:
        review = dict(row)
        if review.get("tags"):
            review["tags"] = json.loads(review["tags"])
        else:
            review["tags"] = []
        reviews.append(review)

    return {"reviews": reviews, "total": len(reviews)}


@app.post("/api/knowledge/reviews/{knowledge_point_id}")
async def review_knowledge_point(
    knowledge_point_id: str,
    rating: int,
    current_user: dict = Depends(get_current_user)
):
    """复习知识点（FSRS 算法）"""
    if rating not in [1, 2, 3, 4]:
        raise HTTPException(status_code=400, detail="评分必须在 1-4 之间")

    db = get_db()

    # 检查知识点是否存在
    kp = db.execute("SELECT id FROM knowledge_points WHERE id = ?", (knowledge_point_id,)).fetchone()
    if not kp:
        db.close()
        raise HTTPException(status_code=404, detail="知识点不存在")

    # 获取或创建复习记录
    review = db.execute(
        "SELECT * FROM knowledge_reviews WHERE user_id = ? AND knowledge_point_id = ?",
        (current_user["id"], knowledge_point_id)
    ).fetchone()

    if review:
        # 更新现有记录
        review_dict = dict(review)
        result = fsrs_schedule(review_dict, rating)

        db.execute("""
            UPDATE knowledge_reviews
            SET stability = ?, difficulty = ?, review_count = ?, lapse_count = ?,
                due_date = ?, last_review = ?, updated_at = datetime('now', 'localtime')
            WHERE id = ?
        """, (
            result["stability"], result["difficulty"], result["review_count"],
            result["lapse_count"], result["due_date"], datetime.now().isoformat(),
            review_dict["id"]
        ))
    else:
        # 创建新记录
        result = fsrs_schedule({}, rating)
        review_id = generate_id()

        db.execute("""
            INSERT INTO knowledge_reviews (id, user_id, knowledge_point_id, stability, difficulty,
                review_count, lapse_count, due_date, last_review)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            review_id, current_user["id"], knowledge_point_id,
            result["stability"], result["difficulty"], result["review_count"],
            result["lapse_count"], result["due_date"], datetime.now().isoformat()
        ))

    # 记录学习会话
    session_id = generate_id()
    db.execute("""
        INSERT INTO study_sessions (id, user_id, knowledge_point_id, activity_type, start_time, duration_seconds)
        VALUES (?, ?, ?, 'knowledge_review', ?, 0)
    """, (session_id, current_user["id"], knowledge_point_id, datetime.now().isoformat()))

    db.commit()
    db.close()

    return {
        "message": "复习记录已更新",
        "next_review": result["due_date"],
        "interval": result["interval_description"],
        "stability": result["stability"],
    }


@app.get("/api/knowledge/reviews/stats")
async def knowledge_review_stats(current_user: dict = Depends(get_current_user)):
    """知识点复习统计"""
    db = get_db()
    now = datetime.now().isoformat()

    # 总复习记录数
    total = db.execute(
        "SELECT COUNT(*) FROM knowledge_reviews WHERE user_id = ?",
        (current_user["id"],)
    ).fetchone()[0]

    # 需要复习的数量
    due = db.execute(
        "SELECT COUNT(*) FROM knowledge_reviews WHERE user_id = ? AND due_date <= ?",
        (current_user["id"], now)
    ).fetchone()[0]

    # 今天复习的数量
    today_start = datetime.now().replace(hour=0, minute=0, second=0).isoformat()
    reviewed_today = db.execute(
        "SELECT COUNT(*) FROM study_sessions WHERE user_id = ? AND activity_type = 'knowledge_review' AND created_at >= ?",
        (current_user["id"], today_start)
    ).fetchone()[0]

    # 按学科统计
    by_subject = db.execute("""
        SELECT kp.subject_id, COUNT(*) as count
        FROM knowledge_reviews kr
        JOIN knowledge_points kp ON kr.knowledge_point_id = kp.id
        WHERE kr.user_id = ?
        GROUP BY kp.subject_id
    """, (current_user["id"],)).fetchall()

    db.close()

    return {
        "total": total,
        "due_now": due,
        "reviewed_today": reviewed_today,
        "by_subject": {row["subject_id"]: row["count"] for row in by_subject},
    }


# ============ 学习会话 API ============

@app.post("/api/study-sessions/start")
async def start_study_session(
    session: StudySessionStart,
    current_user: dict = Depends(get_current_user)
):
    """开始学习会话。请求参数使用 JSON body，便于 Web 与移动端统一调用。"""
    db = get_db()
    session_id = generate_id()

    db.execute("""
        INSERT INTO study_sessions (id, user_id, knowledge_point_id, subject, activity_type, start_time)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (session_id, current_user["id"], session.knowledge_point_id, session.subject, session.activity_type, datetime.now().isoformat()))

    db.commit()
    db.close()

    return {"session_id": session_id, "message": "学习会话已开始"}


@app.post("/api/study-sessions/{session_id}/stop")
async def stop_study_session(
    session_id: str,
    payload: StudySessionStop,
    current_user: dict = Depends(get_current_user)
):
    """停止学习会话"""
    db = get_db()

    # 检查会话是否存在
    session = db.execute(
        "SELECT * FROM study_sessions WHERE id = ? AND user_id = ?",
        (session_id, current_user["id"])
    ).fetchone()

    if not session:
        db.close()
        raise HTTPException(status_code=404, detail="学习会话不存在")

    # 更新会话
    db.execute("""
        UPDATE study_sessions
        SET end_time = ?, duration_seconds = ?
        WHERE id = ?
    """, (datetime.now().isoformat(), max(0, payload.duration_seconds), session_id))

    db.commit()
    db.close()

    return {"message": "学习会话已结束", "duration_seconds": max(0, payload.duration_seconds)}


@app.get("/api/study-sessions/stats")
async def study_session_stats(current_user: dict = Depends(get_current_user)):
    """学习会话统计"""
    db = get_db()

    # 今日学习时长
    today_start = datetime.now().replace(hour=0, minute=0, second=0).isoformat()
    today_result = db.execute("""
        SELECT COALESCE(SUM(duration_seconds), 0) as total_seconds
        FROM study_sessions
        WHERE user_id = ? AND start_time >= ?
    """, (current_user["id"], today_start)).fetchone()
    today_minutes = today_result["total_seconds"] // 60

    # 本周学习时长
    from datetime import timedelta
    week_start = (datetime.now() - timedelta(days=datetime.now().weekday())).replace(hour=0, minute=0, second=0).isoformat()
    week_result = db.execute("""
        SELECT COALESCE(SUM(duration_seconds), 0) as total_seconds
        FROM study_sessions
        WHERE user_id = ? AND start_time >= ?
    """, (current_user["id"], week_start)).fetchone()
    week_minutes = week_result["total_seconds"] // 60

    # 总学习时长
    total_result = db.execute("""
        SELECT COALESCE(SUM(duration_seconds), 0) as total_seconds
        FROM study_sessions
        WHERE user_id = ?
    """, (current_user["id"],)).fetchone()
    total_minutes = total_result["total_seconds"] // 60

    # 连续学习天数
    streak_days = 0
    current_date = datetime.now().date()
    while True:
        date_str = current_date.isoformat()
        has_study = db.execute("""
            SELECT COUNT(*) as count
            FROM study_sessions
            WHERE user_id = ? AND DATE(start_time) = ?
        """, (current_user["id"], date_str)).fetchone()["count"]

        if has_study > 0:
            streak_days += 1
            current_date -= timedelta(days=1)
        else:
            break

    db.close()

    return {
        "today_minutes": today_minutes,
        "week_minutes": week_minutes,
        "total_minutes": total_minutes,
        "streak_days": streak_days,
    }


# ============ 个性化推荐 API ============

@app.get("/api/recommendations")
async def get_recommendations(limit: int = 10, current_user: dict = Depends(get_current_user)):
    """获取个性化学习推荐"""
    from recommendation import get_user_recommendations
    recommendations = get_user_recommendations(current_user["id"], limit)
    return {"recommendations": recommendations, "total": len(recommendations)}


@app.get("/api/recommendations/subject/{subject_id}")
async def get_subject_recommendations(subject_id: str, limit: int = 5, current_user: dict = Depends(get_current_user)):
    """获取特定学科的推荐"""
    from recommendation import get_subject_recommendations
    recommendations = get_subject_recommendations(current_user["id"], subject_id, limit)
    return {"recommendations": recommendations, "total": len(recommendations)}


@app.get("/api/recommendations/weak-points")
async def get_weak_points(limit: int = 10, current_user: dict = Depends(get_current_user)):
    """获取薄弱知识点"""
    from recommendation import get_weak_points
    weak_points = get_weak_points(current_user["id"], limit)
    return {"weak_points": weak_points, "total": len(weak_points)}


@app.get("/api/recommendations/study-plan")
async def get_study_plan(days: int = 7, current_user: dict = Depends(get_current_user)):
    """获取学习计划"""
    from recommendation import get_study_plan
    plan = get_study_plan(current_user["id"], days)
    return plan


# ============ 考试预测 API ============

@app.get("/api/predictions/score")
async def predict_score(subject_id: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    """预测考试分数"""
    from exam_prediction import predict_exam_score
    prediction = predict_exam_score(current_user["id"], subject_id)
    return prediction


@app.get("/api/predictions/trend")
async def get_progress_trend(days: int = 30, current_user: dict = Depends(get_current_user)):
    """获取学习进度趋势"""
    from exam_prediction import get_progress_trend as get_trend
    trend = get_trend(current_user["id"], days)
    return {"trend": trend, "days": days}


# ============ 题库 API ============

@app.get("/api/question-bank")
async def list_questions(
    subject: Optional[str] = None,
    type: Optional[str] = None,
    limit: int = 50,
    current_user: dict = Depends(get_current_user)
):
    """从题库获取题目"""
    db = get_db()
    query = "SELECT * FROM question_bank WHERE 1=1"
    params = []

    if subject:
        query += " AND subject = ?"
        params.append(subject)
    if type:
        query += " AND type = ?"
        params.append(type)

    query += " ORDER BY RANDOM() LIMIT ?"
    params.append(limit)

    rows = db.execute(query, params).fetchall()
    db.close()

    questions = []
    for row in rows:
        q = dict(row)
        if q.get("options"):
            q["options"] = json.loads(q["options"])
        questions.append(q)

    return {"questions": questions, "count": len(questions)}


@app.get("/api/question-bank/stats")
async def question_bank_stats(current_user: dict = Depends(get_current_user)):
    """题库统计"""
    db = get_db()
    total = db.execute("SELECT COUNT(*) FROM question_bank").fetchone()[0]

    by_subject = {}
    rows = db.execute("SELECT subject, COUNT(*) as count FROM question_bank GROUP BY subject").fetchall()
    for row in rows:
        by_subject[row["subject"]] = row["count"]

    by_type = {}
    rows = db.execute("SELECT type, COUNT(*) as count FROM question_bank GROUP BY type").fetchall()
    for row in rows:
        by_type[row["type"]] = row["count"]

    db.close()
    return {"total": total, "by_subject": by_subject, "by_type": by_type}


# ============ 搜索 API ============

from search_engine import search as search_index, get_stats as search_stats

@app.get("/api/search")
async def search_content(
    q: str,
    type: Optional[str] = None,
    subject: Optional[str] = None,
    limit: int = 20,
    current_user: dict = Depends(get_current_user)
):
    """全文搜索"""
    if not q.strip():
        return {"results": [], "total": 0}

    results = search_index(q, content_type=type, subject=subject, limit=limit)
    return {"results": results, "total": len(results), "query": q}


@app.get("/api/search/stats")
async def search_index_stats(current_user: dict = Depends(get_current_user)):
    """搜索索引统计"""
    return search_stats()


# ============ 文件 API ============

UPLOAD_DIR = CONFIG_UPLOAD_DIR
DATA_DIR = str(Path(UPLOAD_DIR).parent)
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/api/files")
async def list_files(current_user: dict = Depends(get_current_user)):
    """列出文件"""
    files = []
    if os.path.exists(DATA_DIR):
        for root, dirs, filenames in os.walk(DATA_DIR):
            for fname in filenames:
                fpath = os.path.join(root, fname)
                rel_path = os.path.relpath(fpath, DATA_DIR).replace("\\", "/")
                stat = os.stat(fpath)
                ext = os.path.splitext(fname)[1].lower()
                files.append({
                    "name": fname,
                    "path": rel_path,
                    "size": stat.st_size,
                    "size_display": _format_file_size(stat.st_size),
                    "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
                    "type": _get_file_type(ext),
                    "extension": ext,
                })
    files.sort(key=lambda f: f["modified"], reverse=True)
    return {"files": files, "total": len(files)}


@app.get("/api/files/content/{file_path:path}")
async def get_file_content(file_path: str, current_user: dict = Depends(get_current_user)):
    """获取文件内容"""
    fpath = os.path.join(DATA_DIR, file_path)
    if not os.path.exists(fpath):
        raise HTTPException(404, "文件不存在")

    ext = os.path.splitext(fpath)[1].lower()
    try:
        if ext in [".md", ".txt", ".csv", ".json"]:
            with open(fpath, "r", encoding="utf-8") as f:
                content = f.read()
            return {"content": content, "type": "text", "extension": ext}
        elif ext == ".pdf" and HAS_PDF:
            text_parts = []
            with open(fpath, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    t = page.extract_text()
                    if t:
                        text_parts.append(t)
            return {"content": "\n\n".join(text_parts), "type": "pdf", "extension": ".pdf"}
        else:
            raise HTTPException(400, f"不支持预览 {ext} 格式")
    except UnicodeDecodeError:
        raise HTTPException(400, "文件编码不支持")


@app.get("/api/files/pdf/{file_path:path}")
async def serve_pdf(file_path: str, current_user: dict = Depends(get_current_user)):
    """返回PDF文件"""
    from fastapi.responses import FileResponse
    fpath = os.path.join(DATA_DIR, file_path)
    if not os.path.exists(fpath):
        raise HTTPException(404, "文件不存在")
    return FileResponse(fpath, media_type="application/pdf")


@app.post("/api/files/upload")
async def upload_file(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    """上传文件"""
    ext = os.path.splitext(file.filename)[1].lower() if file.filename else ""
    safe_name = file.filename.replace("/", "_").replace("\\", "_") if file.filename else f"upload_{datetime.now().strftime('%Y%m%d%H%M%S')}{ext}"
    save_path = os.path.join(UPLOAD_DIR, safe_name)

    if os.path.exists(save_path):
        name, extension = os.path.splitext(safe_name)
        counter = 1
        while os.path.exists(save_path):
            safe_name = f"{name}_{counter}{extension}"
            save_path = os.path.join(UPLOAD_DIR, safe_name)
            counter += 1

    content = await file.read()
    with open(save_path, "wb") as f:
        f.write(content)

    return {"filename": safe_name, "path": safe_name, "size": len(content), "status": "uploaded"}


@app.delete("/api/files/{file_path:path}")
async def delete_file(file_path: str, current_user: dict = Depends(get_current_user)):
    """删除文件"""
    fpath = os.path.join(DATA_DIR, file_path)
    if not os.path.exists(fpath):
        raise HTTPException(404, "文件不存在")
    if not file_path.startswith("uploads/"):
        raise HTTPException(403, "只能删除上传的文件")
    os.remove(fpath)
    return {"status": "deleted"}


def _format_file_size(size: int) -> str:
    if size < 1024: return f"{size} B"
    elif size < 1024 * 1024: return f"{size / 1024:.1f} KB"
    else: return f"{size / (1024 * 1024):.1f} MB"

def _get_file_type(ext: str) -> str:
    type_map = {".md": "markdown", ".txt": "text", ".pdf": "pdf", ".json": "data", ".png": "image", ".jpg": "image"}
    return type_map.get(ext, "other")


# ============ 错题 API ============

@app.get("/api/wrong-questions")
async def list_wrong_questions(subject: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    """获取错题"""
    db = get_db()
    if subject:
        rows = db.execute("SELECT * FROM wrong_questions WHERE user_id = ? AND subject = ? ORDER BY last_wrong_at DESC", (current_user["id"], subject)).fetchall()
    else:
        rows = db.execute("SELECT * FROM wrong_questions WHERE user_id = ? ORDER BY last_wrong_at DESC", (current_user["id"],)).fetchall()
    db.close()
    return {"questions": dicts_from_rows(rows), "total": len(rows)}


@app.post("/api/wrong-questions")
async def create_wrong_question(q: WrongQuestionCreate, current_user: dict = Depends(get_current_user)):
    """添加错题"""
    qid = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO wrong_questions (id, user_id, content, subject, topic, answer, user_answer, error_type, error_analysis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (qid, current_user["id"], q.question, q.subject, q.chapter, q.correct_answer, q.user_answer, q.error_reason, q.explanation)
    )
    db.commit()
    db.close()
    return {"id": qid, "status": "created"}


@app.put("/api/wrong-questions/{question_id}")
async def update_wrong_question(question_id: str, update: dict, current_user: dict = Depends(get_current_user)):
    """更新错题"""
    db = get_db()
    db.execute("UPDATE wrong_questions SET mastery = ?, wrong_count = ? WHERE id = ? AND user_id = ?",
               (update.get("mastery", 0), update.get("error_count", 1), question_id, current_user["id"]))
    db.commit()
    db.close()
    return {"status": "updated"}


@app.delete("/api/wrong-questions/{question_id}")
async def delete_wrong_question(question_id: str, current_user: dict = Depends(get_current_user)):
    """删除错题"""
    db = get_db()
    db.execute("DELETE FROM wrong_questions WHERE id = ? AND user_id = ?", (question_id, current_user["id"]))
    db.commit()
    db.close()
    return {"status": "deleted"}


@app.get("/api/wrong-questions/analysis")
async def wrong_questions_analysis(current_user: dict = Depends(get_current_user)):
    """错题分析"""
    db = get_db()
    rows = db.execute("SELECT * FROM wrong_questions WHERE user_id = ?", (current_user["id"],)).fetchall()
    db.close()

    questions = dicts_from_rows(rows)
    by_subject = {}
    for q in questions:
        sub = q.get("subject", "未知")
        if sub not in by_subject:
            by_subject[sub] = {"count": 0, "avg_mastery": 0}
        by_subject[sub]["count"] += 1
        by_subject[sub]["avg_mastery"] += q.get("mastery", 0)

    for sub in by_subject:
        if by_subject[sub]["count"] > 0:
            by_subject[sub]["avg_mastery"] = round(by_subject[sub]["avg_mastery"] / by_subject[sub]["count"])

    return {"total": len(questions), "by_subject": by_subject}


# ============ 学习计划 API ============

@app.get("/api/study-plans")
async def list_study_plans(date: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    """获取学习计划"""
    db = get_db()
    if date:
        rows = db.execute("SELECT * FROM study_plans WHERE user_id = ? AND target_date = ? ORDER BY created_at ASC", (current_user["id"], date)).fetchall()
    else:
        rows = db.execute("SELECT * FROM study_plans WHERE user_id = ? ORDER BY target_date DESC LIMIT 100", (current_user["id"],)).fetchall()
    db.close()
    return {"plans": dicts_from_rows(rows), "total": len(rows)}


@app.post("/api/study-plans")
async def create_study_plan(plan: StudyPlanCreate, current_user: dict = Depends(get_current_user)):
    """创建学习任务"""
    pid = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO study_plans (id, user_id, target_date, daily_hours, subjects, daily_plan) VALUES (?, ?, ?, ?, ?, ?)",
        (pid, current_user["id"], plan.date, plan.duration, plan.subject,
         json.dumps({"title": plan.title, "priority": plan.priority, "completed": False}))
    )
    db.commit()
    db.close()
    return {"id": pid, "status": "created"}


@app.put("/api/study-plans/{plan_id}/toggle")
async def toggle_study_plan(plan_id: str, current_user: dict = Depends(get_current_user)):
    """切换任务状态"""
    db = get_db()
    row = db.execute("SELECT * FROM study_plans WHERE id = ? AND user_id = ?", (plan_id, current_user["id"])).fetchone()
    if not row:
        db.close()
        raise HTTPException(404, "任务不存在")

    plan_data = json.loads(row["daily_plan"]) if row["daily_plan"] else {}
    plan_data["completed"] = not plan_data.get("completed", False)
    db.execute("UPDATE study_plans SET daily_plan = ? WHERE id = ?", (json.dumps(plan_data), plan_id))
    db.commit()
    db.close()
    return {"status": "toggled", "completed": plan_data["completed"]}


@app.delete("/api/study-plans/{plan_id}")
async def delete_study_plan(plan_id: str, current_user: dict = Depends(get_current_user)):
    """删除任务"""
    db = get_db()
    db.execute("DELETE FROM study_plans WHERE id = ? AND user_id = ?", (plan_id, current_user["id"]))
    db.commit()
    db.close()
    return {"status": "deleted"}


# ============ 考试 API ============

@app.get("/api/exams")
async def list_exams(current_user: dict = Depends(get_current_user)):
    """获取考试历史"""
    db = get_db()
    rows = db.execute("SELECT * FROM exams WHERE user_id = ? ORDER BY created_at DESC LIMIT 50", (current_user["id"],)).fetchall()
    db.close()
    return {"exams": dicts_from_rows(rows), "total": len(rows)}


@app.post("/api/exams/save")
async def save_exam(exam: ExamSaveRequest, current_user: dict = Depends(get_current_user)):
    """保存考试结果"""
    exam_id = generate_id()
    accuracy = round(exam.score / exam.total_score * 100, 1) if exam.total_score > 0 else 0

    db = get_db()
    db.execute(
        "INSERT INTO exams (id, user_id, subject, difficulty, total_questions, total_score, score, accuracy, time_used, status, questions, answers, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))",
        (exam_id, current_user["id"], exam.subject, exam.difficulty, exam.total_questions, exam.total_score,
         exam.score, accuracy, exam.time_used, "completed", json.dumps(exam.questions), json.dumps(exam.answers))
    )

    db.execute(
        "INSERT INTO study_records (id, user_id, activity_type, subject, duration_minutes, score, details) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (generate_id(), current_user["id"], "exam", exam.subject, exam.time_used // 60 if exam.time_used else None, exam.score, json.dumps({"accuracy": accuracy}))
    )
    db.commit()
    db.close()

    return {"id": exam_id, "accuracy": accuracy, "status": "saved"}


@app.get("/api/exams/{exam_id}")
async def get_exam_detail(exam_id: str, current_user: dict = Depends(get_current_user)):
    """获取考试详情"""
    db = get_db()
    row = db.execute("SELECT * FROM exams WHERE id = ? AND user_id = ?", (exam_id, current_user["id"])).fetchone()
    db.close()
    if not row:
        raise HTTPException(404, "考试记录不存在")
    return dict_from_row(row)


# ============ Dashboard API ============

@app.get("/api/dashboard/stats")
async def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    """获取仪表盘统计"""
    db = get_db()
    now = datetime.now().isoformat()
    today_start = datetime.now().replace(hour=0, minute=0, second=0).isoformat()

    today_records = db.execute(
        "SELECT * FROM study_records WHERE user_id = ? AND created_at >= ?",
        (current_user["id"], today_start)
    ).fetchall()

    today_chat = sum(1 for r in today_records if r["activity_type"] == "ai_chat")
    today_flashcard = sum(1 for r in today_records if r["activity_type"] == "flashcard_review")
    today_exam = sum(1 for r in today_records if r["activity_type"] == "exam")
    today_minutes = sum(r["duration_minutes"] or 0 for r in today_records if r["duration_minutes"])

    total_cards = db.execute("SELECT COUNT(*) FROM flashcards WHERE user_id = ?", (current_user["id"],)).fetchone()[0]
    due_cards = db.execute("SELECT COUNT(*) FROM flashcards WHERE user_id = ? AND due_date <= ?", (current_user["id"], now)).fetchone()[0]
    total_conversations = db.execute("SELECT COUNT(*) FROM conversations WHERE user_id = ?", (current_user["id"],)).fetchone()[0]
    total_messages = db.execute("SELECT COUNT(*) FROM messages m JOIN conversations c ON m.conversation_id = c.id WHERE c.user_id = ?", (current_user["id"],)).fetchone()[0]
    wrong_total = db.execute("SELECT COUNT(*) FROM wrong_questions WHERE user_id = ?", (current_user["id"],)).fetchone()[0]
    exam_count = db.execute("SELECT COUNT(*) FROM exams WHERE user_id = ? AND status = 'completed'", (current_user["id"],)).fetchone()[0]
    avg_accuracy = db.execute("SELECT AVG(accuracy) FROM exams WHERE user_id = ? AND status = 'completed'", (current_user["id"],)).fetchone()[0]

    # 连续学习天数
    streak_rows = db.execute(
        "SELECT DISTINCT date(created_at) as study_date FROM study_records WHERE user_id = ? ORDER BY study_date DESC LIMIT 30",
        (current_user["id"],)
    ).fetchall()

    streak = 0
    if streak_rows:
        check_date = datetime.now().date()
        for row in streak_rows:
            row_date = datetime.strptime(row["study_date"], "%Y-%m-%d").date() if row["study_date"] else None
            if row_date == check_date:
                streak += 1
                check_date -= timedelta(days=1)
            elif row_date == check_date - timedelta(days=1):
                streak += 1
                check_date = row_date - timedelta(days=1)
            else:
                break

    # 知识库统计
    total_knowledge_points = db.execute("SELECT COUNT(*) FROM knowledge_points").fetchone()[0]
    knowledge_reviewed = db.execute(
        "SELECT COUNT(*) FROM knowledge_reviews WHERE user_id = ?",
        (current_user["id"],)
    ).fetchone()[0]
    knowledge_due = db.execute(
        "SELECT COUNT(*) FROM knowledge_reviews WHERE user_id = ? AND due_date <= ?",
        (current_user["id"], now)
    ).fetchone()[0]
    vocab_total = db.execute("SELECT COUNT(*) FROM vocabulary WHERE user_id IS NULL OR user_id = ?", (current_user["id"],)).fetchone()[0]
    vocab_mastered = db.execute("SELECT COUNT(*) FROM vocabulary WHERE (user_id IS NULL OR user_id = ?) AND mastery >= 80", (current_user["id"],)).fetchone()[0]

    db.close()

    return {
        "today": {"chat_messages": today_chat, "flashcards_reviewed": today_flashcard, "exams_taken": today_exam, "total_activities": len(today_records), "study_minutes": today_minutes},
        "totals": {"conversations": total_conversations, "messages": total_messages, "flashcards": total_cards, "wrong_questions": wrong_total, "exams": exam_count},
        "due": {"flashcards": due_cards, "wrong_questions": 0, "knowledge_reviews": knowledge_due},
        "performance": {"exam_avg_accuracy": round(avg_accuracy, 1) if avg_accuracy else 0, "streak_days": streak},
        "knowledge": {"total_points": total_knowledge_points, "reviewed": knowledge_reviewed, "due": knowledge_due},
        "vocabulary": {"total": vocab_total, "mastered": vocab_mastered},
    }


# ============ 健康检查 & AI API ============

@app.get("/api/health")
async def health_check():
    """健康检查：同时返回数据库与 AI Provider 状态，供前端诊断。"""
    database_status = "healthy"
    try:
        db = get_db()
        db.execute("SELECT 1").fetchone()
        db.close()
    except Exception:
        database_status = "unavailable"

    provider = get_available_provider()
    return {
        "status": "healthy" if database_status == "healthy" else "degraded",
        "version": APP_VERSION,
        "database": database_status,
        "ai_provider": provider.get("name", "unknown"),
        "ai_configured": provider.get("configured", False),
        "ai_model": provider.get("default_model", ""),
        "timestamp": datetime.now().isoformat(),
    }


@app.get("/api/chat/models")
async def list_models():
    """AI模型列表"""
    provider = get_available_provider()
    models = [] if not provider.get("configured") else [{"id": provider["default_model"], "name": provider["default_model"], "recommended": True}]
    return {"provider": provider["name"], "configured": provider.get("configured", False), "models": models}


@app.post("/api/ai/organize")
async def ai_organize(request: dict, current_user: dict = Depends(get_current_user)):
    """AI整理资料"""
    result = await ai_service.organize_content(request.get("content", ""), request.get("topic"))
    return {"result": result}


@app.post("/api/ai/analyze-file")
async def ai_analyze_file(request: dict, current_user: dict = Depends(get_current_user)):
    """AI分析文件"""
    fpath = os.path.join(DATA_DIR, request.get("file_path", ""))
    if not os.path.exists(fpath):
        raise HTTPException(404, "文件不存在")

    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    result = await ai_service.analyze_content(content, os.path.basename(fpath))
    return {"result": result}


@app.post("/api/exam/generate")
async def generate_exam(request: ExamGenerateRequest, current_user: dict = Depends(get_current_user)):
    """AI生成试卷"""
    result = await ai_service.generate_exam(request.subject, request.count, request.difficulty)
    try:
        start = result.find("[")
        end = result.rfind("]") + 1
        questions = json.loads(result[start:end])
        return {"questions": questions, "count": len(questions)}
    except:
        return {"error": "AI 返回格式异常", "raw": result[:500]}


@app.post("/api/study-plan/generate")
async def generate_study_plan(request: dict, current_user: dict = Depends(get_current_user)):
    """AI生成学习计划"""
    result = await ai_service.generate_study_plan(
        request.get("subjects"), request.get("hours_per_day", 10), request.get("days", 7)
    )
    try:
        start = result.find("[")
        end = result.rfind("]") + 1
        plan = json.loads(result[start:end])
        return {"plan": plan}
    except:
        return {"error": "AI 返回格式异常", "raw": result[:500]}


@app.post("/api/ai/organize-file")
async def ai_organize_file(request: dict, current_user: dict = Depends(get_current_user)):
    """AI整理文件"""
    fpath = os.path.join(DATA_DIR, request.get("file_path", ""))
    if not os.path.exists(fpath):
        raise HTTPException(404, "文件不存在")

    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    result = await ai_service.organize_content(content, request.get("topic"))
    return {"result": result, "saved_file": request.get("file_path", "")}


# ============ 社区帖子 API ============

class PostCreate(BaseModel):
    title: str
    content: str
    tags: Optional[List[str]] = None

@app.get("/api/posts")
async def list_posts(tag: Optional[str] = None, limit: int = 20, current_user: dict = Depends(get_current_user)):
    """获取社区帖子"""
    db = get_db()
    query = "SELECT p.*, u.username as author_name FROM posts p JOIN users u ON p.user_id = u.id"
    params = []

    if tag:
        query += " WHERE p.tags LIKE ?"
        params.append(f"%{tag}%")

    query += " ORDER BY p.created_at DESC LIMIT ?"
    params.append(limit)

    rows = db.execute(query, params).fetchall()
    db.close()

    posts = []
    for row in rows:
        post = dict(row)
        if post.get("tags"):
            post["tags"] = json.loads(post["tags"])
        else:
            post["tags"] = []
        posts.append(post)

    return {"posts": posts, "total": len(posts)}


@app.post("/api/posts")
async def create_post(post: PostCreate, current_user: dict = Depends(get_current_user)):
    """创建帖子"""
    post_id = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO posts (id, user_id, title, content, tags) VALUES (?, ?, ?, ?, ?)",
        (post_id, current_user["id"], post.title, post.content, json.dumps(post.tags or []))
    )
    db.commit()
    db.close()
    return {"id": post_id, "status": "created"}


@app.post("/api/posts/{post_id}/like")
async def like_post(post_id: str, current_user: dict = Depends(get_current_user)):
    """点赞帖子"""
    db = get_db()
    db.execute("UPDATE posts SET likes = likes + 1 WHERE id = ?", (post_id,))
    db.commit()
    db.close()
    return {"status": "liked"}


@app.get("/api/posts/{post_id}")
async def get_post(post_id: str, current_user: dict = Depends(get_current_user)):
    """获取帖子详情"""
    db = get_db()
    row = db.execute(
        "SELECT p.*, u.username as author_name FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?",
        (post_id,)
    ).fetchone()
    db.close()

    if not row:
        raise HTTPException(404, "帖子不存在")

    post = dict(row)
    if post.get("tags"):
        post["tags"] = json.loads(post["tags"])
    else:
        post["tags"] = []

    return post


# ============ 知识库 API ============

@app.get("/api/knowledge/subjects")
async def list_subjects():
    """获取所有学科"""
    db = get_db()
    rows = db.execute(
        "SELECT s.*, COUNT(DISTINCT c.id) AS chapter_count, COUNT(kp.id) AS point_count "
        "FROM subjects s "
        "LEFT JOIN chapters c ON c.subject_id = s.id "
        "LEFT JOIN knowledge_points kp ON kp.chapter_id = c.id "
        "GROUP BY s.id ORDER BY s.sort_order ASC"
    ).fetchall()
    db.close()
    return {"subjects": dicts_from_rows(rows)}


@app.post("/api/knowledge/subjects")
async def create_subject(subject: SubjectCreate, current_user: dict = Depends(get_current_user)):
    """创建学科"""
    sid = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO subjects (id, name, code, description, icon, color, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (sid, subject.name, subject.code, subject.description, subject.icon, subject.color, subject.sort_order)
    )
    db.commit()
    db.close()
    return {"id": sid, "status": "created"}


@app.get("/api/knowledge/subjects/{subject_id}/chapters")
async def list_chapters(subject_id: str, parent_id: Optional[str] = None):
    """获取学科下的章节"""
    db = get_db()
    if parent_id:
        rows = db.execute(
            "SELECT c.*, COUNT(kp.id) AS point_count FROM chapters c "
            "LEFT JOIN knowledge_points kp ON kp.chapter_id = c.id "
            "WHERE c.subject_id = ? AND c.parent_id = ? "
            "GROUP BY c.id ORDER BY c.sort_order ASC",
            (subject_id, parent_id)
        ).fetchall()
    else:
        rows = db.execute(
            "SELECT c.*, COUNT(kp.id) AS point_count FROM chapters c "
            "LEFT JOIN knowledge_points kp ON kp.chapter_id = c.id "
            "WHERE c.subject_id = ? AND c.parent_id IS NULL "
            "GROUP BY c.id ORDER BY c.sort_order ASC",
            (subject_id,)
        ).fetchall()
    db.close()
    return {"chapters": dicts_from_rows(rows)}


@app.post("/api/knowledge/chapters")
async def create_chapter(chapter: ChapterCreate, current_user: dict = Depends(get_current_user)):
    """创建章节"""
    cid = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO chapters (id, subject_id, parent_id, name, description, sort_order, level) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (cid, chapter.subject_id, chapter.parent_id, chapter.name, chapter.description, chapter.sort_order, chapter.level)
    )
    db.commit()
    db.close()
    return {"id": cid, "status": "created"}


@app.get("/api/knowledge/chapters/{chapter_id}/points")
async def list_knowledge_points(chapter_id: str, parent_id: Optional[str] = None):
    """获取章节下的知识点"""
    db = get_db()
    if parent_id:
        rows = db.execute(
            "SELECT * FROM knowledge_points WHERE chapter_id = ? AND parent_id = ? ORDER BY sort_order ASC",
            (chapter_id, parent_id)
        ).fetchall()
    else:
        rows = db.execute(
            "SELECT * FROM knowledge_points WHERE chapter_id = ? AND parent_id IS NULL ORDER BY sort_order ASC",
            (chapter_id,)
        ).fetchall()
    db.close()
    points = []
    for row in rows:
        p = dict(row)
        if p.get("tags"):
            p["tags"] = json.loads(p["tags"])
        else:
            p["tags"] = []
        points.append(p)
    return {"knowledge_points": points, "total": len(points)}


@app.get("/api/knowledge/points/{point_id}")
async def get_knowledge_point(point_id: str):
    """获取知识点详情"""
    db = get_db()
    row = db.execute("SELECT * FROM knowledge_points WHERE id = ?", (point_id,)).fetchone()
    if not row:
        db.close()
        raise HTTPException(404, "知识点不存在")

    point = dict(row)
    if point.get("tags"):
        point["tags"] = json.loads(point["tags"])
    else:
        point["tags"] = []

    # 获取子知识点
    children = db.execute(
        "SELECT id, title, importance, frequency, level, mastery FROM knowledge_points WHERE parent_id = ? ORDER BY sort_order ASC",
        (point_id,)
    ).fetchall()
    point["children"] = dicts_from_rows(children)

    # 获取关系
    relations = db.execute(
        "SELECT kr.*, kp.title as target_title FROM knowledge_relations kr "
        "JOIN knowledge_points kp ON kr.target_id = kp.id "
        "WHERE kr.source_id = ?",
        (point_id,)
    ).fetchall()
    point["relations"] = dicts_from_rows(relations)

    # 获取关联真题
    exams = db.execute(
        "SELECT * FROM exam_questions WHERE knowledge_point_id = ? ORDER BY year DESC LIMIT 10",
        (point_id,)
    ).fetchall()
    point["exam_questions"] = []
    for eq in exams:
        eq_dict = dict(eq)
        if eq_dict.get("options"):
            eq_dict["options"] = json.loads(eq_dict["options"])
        if eq_dict.get("scoring_points"):
            eq_dict["scoring_points"] = json.loads(eq_dict["scoring_points"])
        point["exam_questions"].append(eq_dict)

    db.close()
    return point


@app.get("/api/knowledge/points/{point_id}/children")
async def get_children_points(point_id: str):
    """获取子知识点"""
    db = get_db()
    rows = db.execute(
        "SELECT * FROM knowledge_points WHERE parent_id = ? ORDER BY sort_order ASC",
        (point_id,)
    ).fetchall()
    db.close()
    points = []
    for row in rows:
        p = dict(row)
        if p.get("tags"):
            p["tags"] = json.loads(p["tags"])
        else:
            p["tags"] = []
        points.append(p)
    return {"knowledge_points": points, "total": len(points)}


@app.get("/api/knowledge/points/{point_id}/relations")
async def get_knowledge_relations(point_id: str):
    """获取知识点关系"""
    db = get_db()
    # 获取出向关系
    outgoing = db.execute(
        "SELECT kr.*, kp.title as target_title FROM knowledge_relations kr "
        "JOIN knowledge_points kp ON kr.target_id = kp.id "
        "WHERE kr.source_id = ?",
        (point_id,)
    ).fetchall()

    # 获取入向关系
    incoming = db.execute(
        "SELECT kr.*, kp.title as source_title FROM knowledge_relations kr "
        "JOIN knowledge_points kp ON kr.source_id = kp.id "
        "WHERE kr.target_id = ?",
        (point_id,)
    ).fetchall()

    db.close()
    return {
        "outgoing": dicts_from_rows(outgoing),
        "incoming": dicts_from_rows(incoming)
    }


@app.get("/api/knowledge/points/{point_id}/exams")
async def get_point_exams(point_id: str):
    """获取知识点关联真题"""
    db = get_db()
    rows = db.execute(
        "SELECT * FROM exam_questions WHERE knowledge_point_id = ? ORDER BY year DESC",
        (point_id,)
    ).fetchall()
    db.close()
    exams = []
    for row in rows:
        eq = dict(row)
        if eq.get("options"):
            eq["options"] = json.loads(eq["options"])
        if eq.get("scoring_points"):
            eq["scoring_points"] = json.loads(eq["scoring_points"])
        exams.append(eq)
    return {"exam_questions": exams, "total": len(exams)}


@app.post("/api/knowledge/points")
async def create_knowledge_point(point: KnowledgePointCreate, current_user: dict = Depends(get_current_user)):
    """创建知识点"""
    pid = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO knowledge_points (id, subject_id, chapter_id, parent_id, title, content, summary, "
        "importance, frequency, level, tags, exam_tips, answer_template, memory_tips, key_points, "
        "case_analysis, common_mistakes, training_steps, self_test, source, sort_order) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (pid, point.subject_id, point.chapter_id, point.parent_id, point.title, point.content, point.summary,
         point.importance, point.frequency, point.level,
         json.dumps(point.tags) if point.tags else None,
         point.exam_tips, point.answer_template, point.memory_tips, point.key_points,
         point.case_analysis, point.common_mistakes, point.training_steps, point.self_test,
         point.source, point.sort_order)
    )
    db.commit()
    db.close()
    return {"id": pid, "status": "created"}


@app.put("/api/knowledge/points/{point_id}")
async def update_knowledge_point(point_id: str, update: KnowledgePointUpdate, current_user: dict = Depends(get_current_user)):
    """更新知识点"""
    db = get_db()
    existing = db.execute("SELECT id FROM knowledge_points WHERE id = ?", (point_id,)).fetchone()
    if not existing:
        db.close()
        raise HTTPException(404, "知识点不存在")

    updates = []
    params = []
    for field, value in update.dict(exclude_unset=True).items():
        if field == "tags" and value is not None:
            updates.append(f"{field} = ?")
            params.append(json.dumps(value))
        elif value is not None:
            updates.append(f"{field} = ?")
            params.append(value)

    if updates:
        updates.append("updated_at = datetime('now', 'localtime')")
        params.append(point_id)
        db.execute(f"UPDATE knowledge_points SET {', '.join(updates)} WHERE id = ?", params)
        db.commit()

    db.close()
    return {"status": "updated"}


@app.post("/api/knowledge/relations")
async def create_knowledge_relation(rel: KnowledgeRelationCreate, current_user: dict = Depends(get_current_user)):
    """创建知识点关系"""
    rid = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO knowledge_relations (id, source_id, target_id, relation_type, description, weight) VALUES (?, ?, ?, ?, ?, ?)",
        (rid, rel.source_id, rel.target_id, rel.relation_type, rel.description, rel.weight)
    )
    db.commit()
    db.close()
    return {"id": rid, "status": "created"}


@app.get("/api/knowledge/search")
async def search_knowledge(q: str, subject_id: Optional[str] = None, limit: int = 20):
    """搜索知识点"""
    db = get_db()
    query = "SELECT * FROM knowledge_points WHERE (title LIKE ? OR content LIKE ? OR tags LIKE ?)"
    params = [f"%{q}%", f"%{q}%", f"%{q}%"]

    if subject_id:
        query += " AND subject_id = ?"
        params.append(subject_id)

    query += " ORDER BY importance DESC, frequency DESC LIMIT ?"
    params.append(limit)

    rows = db.execute(query, params).fetchall()
    db.close()

    points = []
    for row in rows:
        p = dict(row)
        if p.get("tags"):
            p["tags"] = json.loads(p["tags"])
        else:
            p["tags"] = []
        points.append(p)

    return {"results": points, "total": len(points), "query": q}


@app.get("/api/knowledge/vector-search")
async def vector_search_knowledge(q: str, top_k: int = 10, subject_id: Optional[str] = None):
    """向量搜索知识点（基于 TF-IDF 和余弦相似度）"""
    from vector_search import search_knowledge_hybrid, search_knowledge

    if subject_id:
        results = search_knowledge(q, top_k, subject_id)
    else:
        results = search_knowledge_hybrid(q, top_k)

    # 格式化结果
    formatted_results = []
    for result in results:
        formatted_result = {
            "id": result["id"],
            "title": result["title"],
            "content": result["content"][:300] + "..." if len(result["content"]) > 300 else result["content"],
            "subject_id": result["subject_id"],
            "chapter_id": result["chapter_id"],
            "similarity": round(result["similarity"], 4),
            "search_type": result.get("search_type", "vector"),
        }
        formatted_results.append(formatted_result)

    return {
        "results": formatted_results,
        "total": len(formatted_results),
        "query": q,
        "search_method": "tfidf_cosine_similarity",
    }


@app.get("/api/knowledge/graph")
async def get_knowledge_graph(subject_id: Optional[str] = None, chapter_id: Optional[str] = None):
    """获取知识图谱数据（增强版：含章节/学科元数据、自动构建父子边）"""
    db = get_db()

    # 获取学科映射
    subjects_rows = db.execute("SELECT id, name, color FROM subjects").fetchall()
    subject_map = {r["id"]: {"name": r["name"], "color": r["color"]} for r in subjects_rows}

    # 获取章节映射
    chapters_rows = db.execute("SELECT id, name, subject_id FROM chapters").fetchall()
    chapter_map = {r["id"]: {"name": r["name"], "subject_id": r["subject_id"]} for r in chapters_rows}

    # 获取知识点
    query = "SELECT id, title, subject_id, chapter_id, parent_id, importance, frequency, level, summary FROM knowledge_points"
    params = []
    conditions = []

    if subject_id:
        conditions.append("subject_id = ?")
        params.append(subject_id)
    if chapter_id:
        conditions.append("chapter_id = ?")
        params.append(chapter_id)

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    points = db.execute(query, params).fetchall()

    # 获取关系
    if subject_id:
        relations = db.execute(
            "SELECT kr.* FROM knowledge_relations kr "
            "JOIN knowledge_points kp ON kr.source_id = kp.id "
            "WHERE kp.subject_id = ?",
            (subject_id,)
        ).fetchall()
    else:
        relations = db.execute("SELECT * FROM knowledge_relations").fetchall()

    db.close()

    # 构建节点
    nodes = []
    for p in points:
        pd = dict(p)
        ch = chapter_map.get(pd["chapter_id"], {})
        sub = subject_map.get(pd["subject_id"], {})
        nodes.append({
            "id": pd["id"],
            "label": pd["title"],
            "subject_id": pd["subject_id"],
            "subject_name": sub.get("name", ""),
            "subject_color": sub.get("color", "#8B5CF6"),
            "chapter_id": pd["chapter_id"],
            "chapter_name": ch.get("name", ""),
            "importance": pd["importance"],
            "frequency": pd.get("frequency", "medium"),
            "level": pd["level"],
            "summary": (pd.get("summary") or "")[:100],
            "parent_id": pd.get("parent_id"),
        })

    # 构建边（显式关系 + 父子关系）
    edges = []
    edge_set = set()

    for r in relations:
        rd = dict(r)
        key = f"{rd['source_id']}->{rd['target_id']}"
        if key not in edge_set:
            edge_set.add(key)
            edges.append({
                "source": rd["source_id"],
                "target": rd["target_id"],
                "type": rd["relation_type"],
                "description": rd.get("description"),
                "weight": rd.get("weight", 1.0),
            })

    # 自动构建父子关系边
    for node in nodes:
        if node["parent_id"]:
            key = f"{node['parent_id']}->{node['id']}"
            if key not in edge_set:
                edge_set.add(key)
                edges.append({
                    "source": node["parent_id"],
                    "target": node["id"],
                    "type": "parent_child",
                    "description": "包含",
                    "weight": 0.5,
                })

    # 构建章节聚类信息
    chapters_used = {}
    for node in nodes:
        cid = node["chapter_id"]
        if cid and cid not in chapters_used:
            chapters_used[cid] = {
                "id": cid,
                "name": node["chapter_name"],
                "subject_id": node["subject_id"],
            }

    return {
        "nodes": nodes,
        "edges": edges,
        "subjects": subject_map,
        "chapters": list(chapters_used.values()),
    }


# ============ AI 学习辅助 API ============

@app.post("/api/ai/knowledge-explain")
async def ai_knowledge_explain(request: AIExplainRequest, current_user: dict = Depends(get_current_user)):
    """AI 讲解知识点"""
    db = get_db()
    point = db.execute("SELECT * FROM knowledge_points WHERE id = ?", (request.knowledge_point_id,)).fetchone()
    db.close()

    if not point:
        raise HTTPException(404, "知识点不存在")

    point_dict = dict(point)

    # 检查缓存
    db = get_db()
    cached = db.execute(
        "SELECT content FROM ai_summaries WHERE knowledge_point_id = ? AND summary_type = ? ORDER BY created_at DESC LIMIT 1",
        (request.knowledge_point_id, f"explanation_{request.style}")
    ).fetchone()
    db.close()

    if cached:
        return {"explanation": cached["content"], "cached": True}

    # 生成讲解
    style_prompts = {
        "detailed": "请详细讲解这个知识点，包括：1.概念定义 2.理论背景 3.核心内容 4.典型案例 5.考试要点 6.答题方式。用Markdown格式。",
        "concise": "请简洁讲解这个知识点，重点突出核心概念和考试要点。用Markdown格式，控制在300字以内。",
        "exam_focused": "请从考研出题角度讲解这个知识点，包括：1.常见题型 2.答题框架 3.得分要点 4.易错点 5.高分技巧。用Markdown格式。",
    }

    prompt = f"""请讲解以下考研知识点：

标题：{point_dict['title']}
内容：{point_dict['content'][:2000]}
学科：{point_dict.get('source', '新闻传播学')}

{style_prompts.get(request.style, style_prompts['detailed'])}"""

    result = await ai_service.chat_simple(message=prompt, subject="考研知识讲解")

    # 缓存结果
    db = get_db()
    db.execute(
        "INSERT INTO ai_summaries (id, knowledge_point_id, summary_type, content, model) VALUES (?, ?, ?, ?, ?)",
        (generate_id(), request.knowledge_point_id, f"explanation_{request.style}", result, "deepseek-chat")
    )
    db.commit()
    db.close()

    return {"explanation": result, "cached": False}


@app.post("/api/ai/answer-helper")
async def ai_answer_helper(request: AIAnswerHelperRequest, current_user: dict = Depends(get_current_user)):
    """AI 答题助手"""
    prompt = f"""你是一位考研答题专家。请分析以下题目并提供标准答案。

题目：{request.question}
{f'学科：{request.subject}' if request.subject else ''}

请按以下格式输出：

## 标准答案
（完整、规范的参考答案）

## 得分点
1. （得分点1）—— X分
2. （得分点2）—— X分
...

## 答题框架
（答题的逻辑结构和框架）

## 评分标准
（如何给分、扣分点）

## 高分技巧
（如何拿到更高分数）"""

    result = await ai_service.chat_simple(message=prompt, subject=request.subject or "考研答题")
    return {"result": result}


@app.post("/api/ai/wrong-analysis")
async def ai_wrong_analysis(request: AIWrongAnalysisRequest, current_user: dict = Depends(get_current_user)):
    """AI 错题分析"""
    prompt = f"""你是一位考研辅导专家。请分析以下错题，找出错误原因并推荐复习内容。

题目：{request.question_content}
学生答案：{request.user_answer}
正确答案：{request.correct_answer}
{f'学科：{request.subject}' if request.subject else ''}

请按以下格式输出：

## 错误原因分析
（分析学生为什么答错：概念混淆？记忆遗漏？理解偏差？）

## 知识漏洞
（指出学生在哪些知识点上存在漏洞）

## 相关知识点
（需要复习的相关知识点列表）

## 推荐复习计划
1. 首先复习：...
2. 然后练习：...
3. 最后巩固：...

## 类似题目练习建议
（建议做哪些类型的题目来巩固）"""

    result = await ai_service.chat_simple(message=prompt, subject=request.subject or "考研错题分析")
    return {"result": result}


@app.post("/api/ai/study-plan")
async def ai_study_plan(request: AIStudyPlanRequest, current_user: dict = Depends(get_current_user)):
    """AI 学习规划"""
    subjects_str = "、".join(request.subjects) if request.subjects else "政治、英语、专业课一、专业课二"

    prompt = f"""你是一位考研学习规划专家。请为考研学生制定学习计划。

考试日期：{request.exam_date}
每天学习时间：{request.hours_per_day} 小时
需要复习的科目：{subjects_str}

请按以下格式输出：

## 总体规划
（从现在到考试的阶段划分）

## 阶段一：基础阶段（X月-X月）
### 每日任务安排
- 上午（X小时）：...
- 下午（X小时）：...
- 晚上（X小时）：...

### 每周重点
- 周一至周五：...
- 周末：...

## 阶段二：强化阶段（X月-X月）
...

## 阶段三：冲刺阶段（X月-X月）
...

## 每科时间分配建议
- 政治：X%
- 英语：X%
- 334：X%
- 440：X%

## 关键时间节点
- X月：完成...
- X月：开始...
- X月：重点..."""

    result = await ai_service.chat_simple(message=prompt, subject="考研学习规划")
    return {"result": result}


@app.post("/api/knowledge/exam-questions")
async def create_exam_question(question: ExamQuestionCreate, current_user: dict = Depends(get_current_user)):
    """创建真题"""
    qid = generate_id()
    db = get_db()
    db.execute(
        "INSERT INTO exam_questions (id, knowledge_point_id, subject, year, school, question_type, content, options, "
        "answer, score, analysis, scoring_points, answer_framework, difficulty) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (qid, question.knowledge_point_id, question.subject, question.year, question.school, question.question_type,
         question.content, json.dumps(question.options) if question.options else None,
         question.answer, question.score, question.analysis,
         json.dumps(question.scoring_points) if question.scoring_points else None,
         question.answer_framework, question.difficulty)
    )
    db.commit()
    db.close()
    return {"id": qid, "status": "created"}


@app.get("/api/knowledge/exam-questions")
async def list_exam_questions(subject: Optional[str] = None, question_type: Optional[str] = None, limit: int = 50):
    """获取真题列表"""
    db = get_db()
    query = "SELECT * FROM exam_questions WHERE 1=1"
    params = []

    if subject:
        query += " AND subject = ?"
        params.append(subject)
    if question_type:
        query += " AND question_type = ?"
        params.append(question_type)

    query += " ORDER BY year DESC, created_at DESC LIMIT ?"
    params.append(limit)

    rows = db.execute(query, params).fetchall()
    db.close()

    exams = []
    for row in rows:
        eq = dict(row)
        if eq.get("options"):
            eq["options"] = json.loads(eq["options"])
        if eq.get("scoring_points"):
            eq["scoring_points"] = json.loads(eq["scoring_points"])
        exams.append(eq)

    return {"exam_questions": exams, "total": len(exams)}


@app.post("/api/knowledge/import")
async def import_document(
    file: UploadFile = File(...),
    subject_id: str = Form(...),
    chapter_id: Optional[str] = Form(None),
    current_user: dict = Depends(get_current_user)
):
    """导入文档到知识库"""
    # 保存上传的文件
    upload_dir = Path(DATA_DIR) / "uploads"
    upload_dir.mkdir(exist_ok=True)

    safe_name = file.filename.replace("/", "_").replace("\\", "_") if file.filename else f"upload_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    file_path = upload_dir / safe_name

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    # 导入文档
    from document_importer import import_document as import_doc
    result = import_doc(str(file_path), subject_id, chapter_id)

    if result["success"]:
        return {
            "message": result["message"],
            "knowledge_count": result["knowledge_count"],
            "import_job_id": result["import_job_id"],
            "filename": safe_name,
        }
    else:
        raise HTTPException(status_code=400, detail=result["error"])


@app.get("/api/knowledge/import/history")
async def get_import_history(current_user: dict = Depends(get_current_user)):
    """获取导入历史"""
    from document_importer import get_import_history as get_history
    history = get_history()
    return {"history": history, "total": len(history)}


# ============ 词汇 API ============

class VocabularyCreate(BaseModel):
    word: str
    phonetic: Optional[str] = None
    meaning: str
    example: Optional[str] = None
    category: str = "核心词汇"

class VocabularyReview(BaseModel):
    rating: int

@app.get("/api/vocabulary")
async def list_vocabulary(
    category: Optional[str] = None,
    mastered: Optional[bool] = None,
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 50,
    current_user: dict = Depends(get_current_user)
):
    """获取词汇列表"""
    db = get_db()
    offset = (page - 1) * limit

    query = "SELECT v.*, COALESCE(vr.stability, 0) as stability, COALESCE(vr.due_date, v.created_at) as due_date FROM vocabulary v LEFT JOIN vocabulary_reviews vr ON v.id = vr.word_id AND vr.user_id = ? WHERE (v.user_id = ? OR v.user_id IS NULL)"
    params = [current_user["id"], current_user["id"]]

    if category:
        query += " AND v.category = ?"
        params.append(category)
    if mastered is not None:
        if mastered:
            query += " AND v.mastery >= 80"
        else:
            query += " AND v.mastery < 80"
    if search:
        query += " AND (v.word LIKE ? OR v.meaning LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%"])

    count_query = query.replace("SELECT v.*, COALESCE(vr.stability, 0) as stability, COALESCE(vr.due_date, v.created_at) as due_date", "SELECT COUNT(*)")
    total = db.execute(count_query, params).fetchone()[0]

    query += " ORDER BY v.created_at DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    rows = db.execute(query, params).fetchall()
    db.close()

    return {"vocabulary": dicts_from_rows(rows), "total": total, "page": page}


@app.get("/api/vocabulary/due")
async def get_due_vocabulary(limit: int = 20, current_user: dict = Depends(get_current_user)):
    """获取需要复习的词汇"""
    db = get_db()
    now = datetime.now().isoformat()

    rows = db.execute("""
        SELECT v.*, vr.stability, vr.difficulty, vr.review_count, vr.due_date
        FROM vocabulary v
        JOIN vocabulary_reviews vr ON v.id = vr.word_id AND vr.user_id = ?
        WHERE vr.due_date <= ?
        ORDER BY vr.due_date ASC
        LIMIT ?
    """, (current_user["id"], now, limit)).fetchall()

    total_due = db.execute("""
        SELECT COUNT(*) FROM vocabulary_reviews
        WHERE user_id = ? AND due_date <= ?
    """, (current_user["id"], now)).fetchone()[0]

    db.close()
    return {"vocabulary": dicts_from_rows(rows), "total_due": total_due}


@app.post("/api/vocabulary")
async def create_vocabulary(word: VocabularyCreate, current_user: dict = Depends(get_current_user)):
    """创建词汇"""
    db = get_db()

    existing = db.execute("SELECT id FROM vocabulary WHERE word = ? AND (user_id = ? OR user_id IS NULL)", (word.word, current_user["id"])).fetchone()
    if existing:
        db.close()
        raise HTTPException(400, "该词汇已存在")

    word_id = generate_id()
    db.execute(
        "INSERT INTO vocabulary (id, user_id, word, phonetic, meaning, example, category, is_custom) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (word_id, current_user["id"], word.word, word.phonetic, word.meaning, word.example, word.category, 1)
    )
    db.commit()
    db.close()
    return {"id": word_id, "status": "created"}


@app.post("/api/vocabulary/{word_id}/review")
async def review_vocabulary(word_id: str, review: VocabularyReview, current_user: dict = Depends(get_current_user)):
    """复习词汇"""
    if review.rating < 1 or review.rating > 4:
        raise HTTPException(400, "Rating must be 1-4")

    db = get_db()
    word = db.execute("SELECT * FROM vocabulary WHERE id = ? AND (user_id = ? OR user_id IS NULL)", (word_id, current_user["id"])).fetchone()
    if not word:
        db.close()
        raise HTTPException(404, "词汇不存在")

    existing_review = db.execute("SELECT * FROM vocabulary_reviews WHERE user_id = ? AND word_id = ?", (current_user["id"], word_id)).fetchone()

    stability = existing_review["stability"] if existing_review else 2.5
    difficulty = existing_review["difficulty"] if existing_review else 0.5
    review_count = (existing_review["review_count"] if existing_review else 0) + 1
    lapse_count = existing_review["lapse_count"] if existing_review else 0

    if review.rating == 1:
        stability = max(0.5, stability * 0.5)
        lapse_count += 1
        interval_minutes = 10
    elif review.rating == 2:
        stability = stability * 0.8
        interval_minutes = int(60 * stability * 0.5)
    elif review.rating == 3:
        stability = stability * 1.0 + 0.1
        interval_minutes = int(60 * 24 * stability)
    else:
        stability = stability * 1.2 + 0.3
        interval_minutes = int(60 * 24 * stability * 1.5)

    due = datetime.now() + timedelta(minutes=interval_minutes)
    mastery = min(100, max(0, int((stability / 5) * 100)))

    if existing_review:
        db.execute(
            "UPDATE vocabulary_reviews SET stability = ?, difficulty = ?, due_date = ?, review_count = ?, lapse_count = ? WHERE user_id = ? AND word_id = ?",
            (round(stability, 3), round(difficulty, 3), due.isoformat(), review_count, lapse_count, current_user["id"], word_id)
        )
    else:
        db.execute(
            "INSERT INTO vocabulary_reviews (id, user_id, word_id, rating, stability, difficulty, due_date, review_count, lapse_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (generate_id(), current_user["id"], word_id, review.rating, round(stability, 3), round(difficulty, 3), due.isoformat(), review_count, lapse_count)
        )

    db.execute(
        "UPDATE vocabulary SET mastery = ?, review_count = ?, last_reviewed = datetime('now', 'localtime'), next_review = ? WHERE id = ?",
        (mastery, review_count, due.isoformat(), word_id)
    )

    db.commit()
    db.close()

    interval_desc = f"{interval_minutes}分钟" if interval_minutes < 60 else f"{interval_minutes // 60}小时" if interval_minutes < 1440 else f"{interval_minutes // 1440}天"
    return {"word_id": word_id, "rating": review.rating, "mastery": mastery, "next_review": interval_desc, "due_date": due.isoformat()}


@app.get("/api/vocabulary/stats")
async def vocabulary_stats(current_user: dict = Depends(get_current_user)):
    """获取词汇统计"""
    db = get_db()
    now = datetime.now().isoformat()

    total = db.execute("SELECT COUNT(*) FROM vocabulary WHERE user_id = ? OR user_id IS NULL", (current_user["id"],)).fetchone()[0]
    mastered = db.execute("SELECT COUNT(*) FROM vocabulary WHERE (user_id = ? OR user_id IS NULL) AND mastery >= 80", (current_user["id"],)).fetchone()[0]
    due_now = db.execute("SELECT COUNT(*) FROM vocabulary_reviews WHERE user_id = ? AND due_date <= ?", (current_user["id"], now)).fetchone()[0]
    reviewed_today = db.execute(
        "SELECT COUNT(*) FROM vocabulary_reviews WHERE user_id = ? AND DATE(created_at) = DATE('now', 'localtime')",
        (current_user["id"],)
    ).fetchone()[0]

    by_category = db.execute(
        "SELECT category, COUNT(*) as count FROM vocabulary WHERE user_id = ? OR user_id IS NULL GROUP BY category",
        (current_user["id"],)
    ).fetchall()

    db.close()
    return {
        "total": total,
        "mastered": mastered,
        "due_now": due_now,
        "reviewed_today": reviewed_today,
        "by_category": {row["category"]: row["count"] for row in by_category},
    }


@app.post("/api/vocabulary/seed")
async def seed_vocabulary(current_user: dict = Depends(get_current_user)):
    """初始化默认词汇数据"""
    db = get_db()

    existing = db.execute("SELECT COUNT(*) FROM vocabulary WHERE user_id IS NULL").fetchone()[0]
    if existing > 0:
        db.close()
        return {"message": "词汇数据已存在", "count": existing}

    default_words = [
        ("abandon", "/əˈbændən/", "v. 放弃；抛弃", "They had to abandon the project.", "核心词汇"),
        ("abstract", "/ˈæbstrækt/", "adj. 抽象的 n. 摘要", "The concept is abstract.", "核心词汇"),
        ("accelerate", "/əkˈseləreɪt/", "v. 加速；促进", "The plan will accelerate growth.", "核心词汇"),
        ("accommodate", "/əˈkɒmədeɪt/", "v. 容纳；适应", "The hotel can accommodate 500 guests.", "核心词汇"),
        ("acknowledge", "/əkˈnɒlɪdʒ/", "v. 承认；感谢", "He acknowledged his mistake.", "核心词汇"),
        ("acquire", "/əˈkwaɪər/", "v. 获得；学到", "She acquired a new skill.", "核心词汇"),
        ("adequate", "/ˈædɪkwət/", "adj. 足够的；适当的", "The supply is adequate.", "核心词汇"),
        ("advocate", "/ˈædvəkeɪt/", "v. 提倡 n. 倡导者", "She advocates for equality.", "核心词汇"),
        ("allocate", "/ˈæləkeɪt/", "v. 分配；拨出", "Funds were allocated for research.", "核心词汇"),
        ("ambiguous", "/æmˈbɪɡjuəs/", "adj. 模糊的；有歧义的", "The statement was ambiguous.", "核心词汇"),
        ("analogy", "/əˈnælədʒi/", "n. 类比；类推", "He drew an analogy between the two.", "核心词汇"),
        ("anticipate", "/ænˈtɪsɪpeɪt/", "v. 预期；期望", "We anticipate a positive outcome.", "核心词汇"),
        ("apparent", "/əˈpærənt/", "adj. 显然的；表面上的", "The answer is apparent.", "核心词汇"),
        ("appreciate", "/əˈpriːʃieɪt/", "v. 欣赏；感激；理解", "I appreciate your help.", "核心词汇"),
        ("arbitrary", "/ˈɑːbɪtrəri/", "adj. 任意的；武断的", "The decision seemed arbitrary.", "核心词汇"),
        ("assume", "/əˈsjuːm/", "v. 假设；承担", "Don't assume anything.", "核心词汇"),
        ("authentic", "/ɔːˈθentɪk/", "adj. 真实的；可靠的", "This is an authentic painting.", "核心词汇"),
        ("bias", "/ˈbaɪəs/", "n. 偏见；偏差", "There is a bias in the report.", "核心词汇"),
        ("cease", "/siːs/", "v. 停止；终止", "The rain ceased.", "核心词汇"),
        ("chronic", "/ˈkrɒnɪk/", "adj. 慢性的；长期的", "He has a chronic disease.", "核心词汇"),
        ("coherent", "/kəʊˈhɪərənt/", "adj. 连贯的；一致的", "She gave a coherent explanation.", "核心词汇"),
        ("collaborate", "/kəˈlæbəreɪt/", "v. 合作；协作", "They collaborated on the project.", "核心词汇"),
        ("compel", "/kəmˈpel/", "v. 强迫；迫使", "He was compelled to resign.", "核心词汇"),
        ("comprehensive", "/ˌkɒmprɪˈhensɪv/", "adj. 全面的；综合的", "The report is comprehensive.", "核心词汇"),
        ("conceive", "/kənˈsiːv/", "v. 构想；怀孕", "She conceived a plan.", "核心词汇"),
        ("consensus", "/kənˈsensəs/", "n. 共识；一致", "They reached a consensus.", "核心词汇"),
        ("constrain", "/kənˈstreɪn/", "v. 约束；限制", "Resources are constrained.", "核心词汇"),
        ("contemplate", "/ˈkɒntəmpleɪt/", "v. 沉思；考虑", "He contemplated the offer.", "核心词汇"),
        ("controversy", "/ˈkɒntrəvɜːsi/", "n. 争论；争议", "The decision caused controversy.", "核心词汇"),
        ("conventional", "/kənˈvenʃənl/", "adj. 传统的；常规的", "He uses conventional methods.", "核心词汇"),
        ("crucial", "/ˈkruːʃl/", "adj. 关键的；至关重要的", "This is a crucial moment.", "核心词汇"),
        ("deceive", "/dɪˈsiːv/", "v. 欺骗；蒙蔽", "Don't deceive yourself.", "核心词汇"),
        ("decisive", "/dɪˈsaɪsɪv/", "adj. 决定性的；果断的", "It was a decisive victory.", "核心词汇"),
        ("deficit", "/ˈdefɪsɪt/", "n. 赤字；不足", "The country has a budget deficit.", "核心词汇"),
        ("deteriorate", "/dɪˈtɪəriəreɪt/", "v. 恶化；变坏", "His health deteriorated.", "核心词汇"),
        ("dilemma", "/dɪˈlemə/", "n. 困境；进退两难", "She faced a moral dilemma.", "核心词汇"),
        ("diminish", "/dɪˈmɪnɪʃ/", "v. 减少；缩小", "The effect diminished over time.", "核心词汇"),
        ("disclose", "/dɪsˈkləʊz/", "v. 揭露；公开", "He refused to disclose the details.", "核心词汇"),
        ("discrepancy", "/dɪˈskrepənsi/", "n. 差异；不一致", "There is a discrepancy in the data.", "核心词汇"),
        ("disposition", "/ˌdɪspəˈzɪʃn/", "n. 性情；倾向", "She has a cheerful disposition.", "核心词汇"),
        ("disrupt", "/dɪsˈrʌpt/", "v. 扰乱；破坏", "The storm disrupted flights.", "核心词汇"),
        ("elaborate", "/ɪˈlæbərət/", "adj. 精心的 v. 详细说明", "Please elaborate on your plan.", "核心词汇"),
        ("eliminate", "/ɪˈlɪmɪneɪt/", "v. 消除；淘汰", "We must eliminate waste.", "核心词汇"),
        ("embrace", "/ɪmˈbreɪs/", "v. 拥抱；接受", "She embraced the opportunity.", "核心词汇"),
        ("emerge", "/ɪˈmɜːdʒ/", "v. 出现；浮现", "New problems emerged.", "核心词汇"),
        ("empirical", "/ɪmˈpɪrɪkl/", "adj. 经验主义的；实证的", "The study is empirical.", "核心词汇"),
        ("endeavor", "/ɪnˈdevər/", "n. 努力；尝试", "It was a worthy endeavor.", "核心词汇"),
        ("enhance", "/ɪnˈhɑːns/", "v. 提高；增强", "The plan will enhance quality.", "核心词汇"),
        ("entail", "/ɪnˈteɪl/", "v. 需要；使承担", "The job entails hard work.", "核心词汇"),
        ("equivalent", "/ɪˈkwɪvələnt/", "adj. 等价的 n. 等价物", "It is equivalent to $100.", "核心词汇"),
        ("erode", "/ɪˈrəʊd/", "v. 侵蚀；腐蚀", "Trust was eroded.", "核心词汇"),
        ("esteem", "/ɪˈstiːm/", "n. 尊重 v. 尊敬", "He is held in high esteem.", "核心词汇"),
        ("exacerbate", "/ɪɡˈzæsəbeɪt/", "v. 加剧；恶化", "The problem was exacerbated.", "核心词汇"),
        ("explicit", "/ɪkˈsplɪsɪt/", "adj. 明确的；清楚的", "The instructions are explicit.", "核心词汇"),
        ("exploit", "/ɪkˈsplɔɪt/", "v. 利用；开发", "They exploited the resources.", "核心词汇"),
        ("facilitate", "/fəˈsɪlɪteɪt/", "v. 促进；使容易", "Technology facilitates communication.", "核心词汇"),
        ("feasible", "/ˈfiːzəbl/", "adj. 可行的；可能的", "The plan is feasible.", "核心词汇"),
        ("fluctuate", "/ˈflʌktʃueɪt/", "v. 波动；起伏", "Prices fluctuate daily.", "核心词汇"),
        ("formidable", "/ˈfɔːmɪdəbl/", "adj. 强大的；令人敬畏的", "The opponent is formidable.", "核心词汇"),
        ("foster", "/ˈfɒstər/", "v. 培养；促进", "We must foster creativity.", "核心词汇"),
        ("fragment", "/ˈfræɡmənt/", "n. 碎片 v. 使破碎", "The vase broke into fragments.", "核心词汇"),
        ("fundamental", "/ˌfʌndəˈmentl/", "adj. 基本的；根本的", "This is a fundamental principle.", "核心词汇"),
        ("genuine", "/ˈdʒenjuɪn/", "adj. 真正的；真诚的", "He showed genuine concern.", "核心词汇"),
        ("hierarchy", "/ˈhaɪərɑːki/", "n. 等级制度；层次", "The company has a strict hierarchy.", "核心词汇"),
        ("hypothesis", "/haɪˈpɒθəsɪs/", "n. 假设；假说", "The hypothesis was tested.", "核心词汇"),
        ("ideology", "/ˌaɪdiˈɒlədʒi/", "n. 意识形态；思想体系", "Political ideology varies.", "核心词汇"),
        ("implication", "/ˌɪmplɪˈkeɪʃn/", "n. 含义；暗示", "The implications are serious.", "核心词汇"),
        ("impose", "/ɪmˈpəʊz/", "v. 强加；征税", "The government imposed a tax.", "核心词汇"),
        ("incentive", "/ɪnˈsentɪv/", "n. 激励；动机", "The bonus is an incentive.", "核心词汇"),
        ("inherent", "/ɪnˈhɪərənt/", "adj. 固有的；内在的", "There are inherent risks.", "核心词汇"),
        ("initiate", "/ɪˈnɪʃieɪt/", "v. 发起；开始", "They initiated the project.", "核心词汇"),
        ("innovative", "/ˈɪnəveɪtɪv/", "adj. 创新的；革新的", "It is an innovative approach.", "核心词汇"),
        ("integrate", "/ˈɪntɪɡreɪt/", "v. 整合；融合", "We must integrate the systems.", "核心词汇"),
        ("integrity", "/ɪnˈteɡrəti/", "n. 正直；完整性", "He is a man of integrity.", "核心词汇"),
        ("intervene", "/ˌɪntəˈviːn/", "v. 干预；介入", "The government intervened.", "核心词汇"),
        ("intricate", "/ˈɪntrɪkət/", "adj. 复杂的；错综的", "The design is intricate.", "核心词汇"),
        ("intrinsic", "/ɪnˈtrɪnzɪk/", "adj. 内在的；本质的", "It has intrinsic value.", "核心词汇"),
        ("invoke", "/ɪnˈvəʊk/", "v. 援引；调用", "He invoked his right.", "核心词汇"),
        ("legitimate", "/lɪˈdʒɪtɪmət/", "adj. 合法的；正当的", "It is a legitimate concern.", "核心词汇"),
        ("magnitude", "/ˈmæɡnɪtjuːd/", "n. 大小；重要性", "The magnitude of the problem.", "核心词汇"),
        ("mandate", "/ˈmændeɪt/", "n. 授权 v. 强制", "The law mandates safety standards.", "核心词汇"),
        ("manifest", "/ˈmænɪfest/", "v. 表明 adj. 明显的", "Symptoms manifest early.", "核心词汇"),
        ("manipulate", "/məˈnɪpjuleɪt/", "v. 操纵；控制", "He manipulated the data.", "核心词汇"),
        ("marginal", "/ˈmɑːdʒɪnl/", "adj. 边缘的；微不足道的", "The improvement was marginal.", "核心词汇"),
        ("mechanism", "/ˈmekənɪzəm/", "n. 机制；机理", "The mechanism is complex.", "核心词汇"),
        ("negligible", "/ˈneɡlɪdʒəbl/", "adj. 可忽略的；微不足道的", "The effect was negligible.", "核心词汇"),
        ("notorious", "/nəʊˈtɔːriəs/", "adj. 臭名昭著的", "He is notorious for his crimes.", "核心词汇"),
        ("paradox", "/ˈpærədɒks/", "n. 悖论；矛盾", "It is a paradox that...", "核心词汇"),
        ("perceive", "/pəˈsiːv/", "v. 察觉；感知", "She perceived a change.", "核心词汇"),
        ("precedent", "/ˈpresɪdənt/", "n. 先例；判例", "There is no precedent for this.", "核心词汇"),
        ("preliminary", "/prɪˈlɪmɪnəri/", "adj. 初步的；预备的", "The preliminary results are promising.", "核心词汇"),
        ("prevalent", "/ˈprevələnt/", "adj. 流行的；普遍的", "The disease is prevalent.", "核心词汇"),
        ("profound", "/prəˈfaʊnd/", "adj. 深刻的；深远的", "It had a profound impact.", "核心词汇"),
        ("prohibit", "/prəˈhɪbɪt/", "v. 禁止；阻止", "Smoking is prohibited here.", "核心词汇"),
        ("prospect", "/ˈprɒspekt/", "n. 前景；展望", "The prospects are good.", "核心词汇"),
        ("radical", "/ˈrædɪkl/", "adj. 激进的；根本的", "They proposed radical changes.", "核心词汇"),
        ("redundant", "/rɪˈdʌndənt/", "adj. 冗余的；多余的", "The information is redundant.", "核心词汇"),
        ("reinforce", "/ˌriːɪnˈfɔːs/", "v. 加强；巩固", "We need to reinforce the message.", "核心词汇"),
        ("reluctant", "/rɪˈlʌktənt/", "adj. 不情愿的；勉强的", "He was reluctant to agree.", "核心词汇"),
        ("rigorous", "/ˈrɪɡərəs/", "adj. 严格的；严谨的", "The study was rigorous.", "核心词汇"),
        ("scrutiny", "/ˈskruːtəni/", "n. 审查；仔细检查", "The plan is under scrutiny.", "核心词汇"),
        ("simultaneously", "/ˌsɪmlˈteɪniəsli/", "adv. 同时地", "They spoke simultaneously.", "核心词汇"),
        ("skeptical", "/ˈskeptɪkl/", "adj. 怀疑的", "She was skeptical about the claim.", "核心词汇"),
        ("sophisticated", "/səˈfɪstɪkeɪtɪd/", "adj. 复杂的；精密的", "It is a sophisticated system.", "核心词汇"),
        ("spontaneous", "/spɒnˈteɪniəs/", "adj. 自发的；自然的", "It was a spontaneous decision.", "核心词汇"),
        ("substantial", "/səbˈstænʃl/", "adj. 大量的；实质的", "There was substantial growth.", "核心词汇"),
        ("subtle", "/ˈsʌtl/", "adj. 微妙的；细微的", "There is a subtle difference.", "核心词汇"),
        ("suppress", "/səˈpres/", "v. 压制；抑制", "They suppressed the information.", "核心词汇"),
        ("sustain", "/səˈsteɪn/", "v. 维持；支撑", "We must sustain our efforts.", "核心词汇"),
        ("tangible", "/ˈtændʒəbl/", "adj. 有形的；可触摸的", "The results are tangible.", "核心词汇"),
        ("tentative", "/ˈtentətɪv/", "adj. 试探性的；暂定的", "It is a tentative plan.", "核心词汇"),
        ("threshold", "/ˈθreʃhəʊld/", "n. 门槛；阈值", "We reached the threshold.", "核心词汇"),
        ("undermine", "/ˌʌndəˈmaɪn/", "v. 破坏；削弱", "It undermines confidence.", "核心词汇"),
        ("unprecedented", "/ʌnˈpresɪdentɪd/", "adj. 前所未有的", "This is unprecedented.", "核心词汇"),
        ("vulnerable", "/ˈvʌlnərəbl/", "adj. 脆弱的；易受伤的", "Children are vulnerable.", "核心词汇"),
        ("warrant", "/ˈwɒrənt/", "v. 保证；担保 n. 令状", "The situation warrants attention.", "核心词汇"),
        ("whereby", "/weəˈbaɪ/", "adv. 凭借；通过", "A system whereby...", "核心词汇"),
        ("alleviate", "/əˈliːvieɪt/", "v. 减轻；缓解", "This will alleviate the pain.", "核心词汇"),
        ("ambiguous", "/æmˈbɪɡjuəs/", "adj. 模糊的；含混的", "The answer is ambiguous.", "核心词汇"),
        ("bureaucracy", "/bjʊˈrɒkrəsi/", "n. 官僚主义", "The bureaucracy is inefficient.", "核心词汇"),
        ("catastrophe", "/kəˈtæstrəfi/", "n. 灾难；大祸", "It was a catastrophe.", "核心词汇"),
        ("commodity", "/kəˈmɒdəti/", "n. 商品；日用品", "Oil is a valuable commodity.", "核心词汇"),
        ("compatible", "/kəmˈpætəbl/", "adj. 兼容的；可共存的", "The systems are compatible.", "核心词汇"),
        ("compile", "/kəmˈpaɪl/", "v. 编译；汇编", "We need to compile the data.", "核心词汇"),
        ("complement", "/ˈkɒmplɪment/", "v. 补充；补足", "The two plans complement each other.", "核心词汇"),
        ("concurrent", "/kənˈkʌrənt/", "adj. 并发的；同时发生的", "There were concurrent events.", "核心词汇"),
        ("configuration", "/kənˌfɪɡəˈreɪʃn/", "n. 配置；结构", "Change the configuration.", "核心词汇"),
        ("contempt", "/kənˈtempt/", "n. 蔑视；藐视", "He showed contempt for the rules.", "核心词汇"),
        ("contradiction", "/ˌkɒntrəˈdɪkʃn/", "n. 矛盾；反驳", "There is a contradiction.", "核心词汇"),
        ("cumulative", "/ˈkjuːmjələtɪv/", "adj. 累积的", "The cumulative effect is significant.", "核心词汇"),
        ("decisive", "/dɪˈsaɪsɪv/", "adj. 决定性的", "It was a decisive moment.", "核心词汇"),
        ("deficiency", "/dɪˈfɪʃnsi/", "n. 缺乏；不足", "There is a deficiency of vitamins.", "核心词汇"),
        ("deprive", "/dɪˈpraɪv/", "v. 剥夺；使丧失", "They were deprived of their rights.", "核心词汇"),
        ("derive", "/dɪˈraɪv/", "v. 源自；获得", "The word derives from Latin.", "核心词汇"),
        ("deviate", "/ˈdiːvieɪt/", "v. 偏离；偏差", "Do not deviate from the plan.", "核心词汇"),
        ("differentiate", "/ˌdɪfəˈrenʃieɪt/", "v. 区分；区别", "We must differentiate between them.", "核心词汇"),
        ("dilemma", "/dɪˈlemə/", "n. 困境；两难", "She is in a dilemma.", "核心词汇"),
        ("diminish", "/dɪˈmɪnɪʃ/", "v. 减少；缩小", "The influence diminished.", "核心词汇"),
        ("discourse", "/ˈdɪskɔːs/", "n. 论述；话语", "Academic discourse is formal.", "核心词汇"),
        ("discrepancy", "/dɪˈskrepənsi/", "n. 差异；矛盾", "There is a discrepancy.", "核心词汇"),
        ("disposition", "/ˌdɪspəˈzɪʃn/", "n. 性情；倾向", "She has a kind disposition.", "核心词汇"),
        ("distort", "/dɪˈstɔːt/", "v. 扭曲；歪曲", "The media distorted the facts.", "核心词汇"),
        ("doctrine", "/ˈdɒktrɪn/", "n. 教义；学说", "The doctrine is widely accepted.", "核心词汇"),
        ("domain", "/dəˈmeɪn/", "n. 领域；域", "This is outside my domain.", "核心词汇"),
        ("dwelling", "/ˈdwelɪŋ/", "n. 住所；寓所", "The dwelling was old.", "核心词汇"),
        ("elapse", "/ɪˈlæps/", "v. 逝去；过去", "Time elapsed quickly.", "核心词汇"),
        ("eligible", "/ˈelɪdʒəbl/", "adj. 有资格的", "She is eligible for the award.", "核心词汇"),
        ("embed", "/ɪmˈbed/", "v. 嵌入；植入", "The stone was embedded in the wall.", "核心词汇"),
        ("encompass", "/ɪnˈkʌmpəs/", "v. 包含；包围", "The park encompasses 100 acres.", "核心词汇"),
        ("endorse", "/ɪnˈdɔːs/", "v. 支持；赞同", "I endorse this proposal.", "核心词汇"),
        ("entity", "/ˈentəti/", "n. 实体；存在", "The company is a legal entity.", "核心词汇"),
        ("epoch", "/ˈiːpɒk/", "n. 时代；纪元", "It marked a new epoch.", "核心词汇"),
        ("equivalent", "/ɪˈkwɪvələnt/", "adj. 等价的", "It is equivalent to...", "核心词汇"),
        ("erode", "/ɪˈrəʊd/", "v. 侵蚀；腐蚀", "The cliff was eroded.", "核心词汇"),
        ("esteem", "/ɪˈstiːm/", "n. 尊重", "He is held in esteem.", "核心词汇"),
        ("excerpt", "/ˈeksɜːpt/", "n. 摘录；节选", "An excerpt from the book.", "核心词汇"),
        ("explicit", "/ɪkˈsplɪsɪt/", "adj. 明确的", "The instructions are explicit.", "核心词汇"),
        ("exponential", "/ˌekspəˈnenʃl/", "adj. 指数的", "Exponential growth is rapid.", "核心词汇"),
        ("fabricate", "/ˈfæbrɪkeɪt/", "v. 捏造；制造", "He fabricated the story.", "核心词汇"),
        ("fluctuation", "/ˌflʌktʃuˈeɪʃn/", "n. 波动；起伏", "Price fluctuation is normal.", "核心词汇"),
        ("formulate", "/ˈfɔːmjuleɪt/", "v. 制定；表述", "We need to formulate a plan.", "核心词汇"),
        ("forthcoming", "/ˌfɔːθˈkʌmɪŋ/", "adj. 即将到来的", "The forthcoming event is exciting.", "核心词汇"),
        ("fragmentation", "/ˌfræɡmenˈteɪʃn/", "n. 碎片化", "The fragmentation of society.", "核心词汇"),
        ("gratitude", "/ˈɡrætɪtjuːd/", "n. 感激；感谢", "I express my gratitude.", "核心词汇"),
        ("hazardous", "/ˈhæzədəs/", "adj. 危险的", "The material is hazardous.", "核心词汇"),
        ("hinder", "/ˈhɪndər/", "v. 阻碍；妨碍", "Bad weather hindered progress.", "核心词汇"),
        ("hypothesis", "/haɪˈpɒθəsɪs/", "n. 假设", "The hypothesis was proven.", "核心词汇"),
        ("immerse", "/ɪˈmɜːs/", "v. 沉浸；浸入", "She immersed herself in work.", "核心词汇"),
        ("impair", "/ɪmˈpeər/", "v. 损害；削弱", "It impairs judgment.", "核心词汇"),
        ("impede", "/ɪmˈpiːd/", "v. 妨碍；阻止", "It impedes progress.", "核心词汇"),
        ("imperative", "/ɪmˈperətɪv/", "adj. 必要的；紧迫的", "It is imperative to act now.", "核心词汇"),
        ("implicit", "/ɪmˈplɪsɪt/", "adj. 含蓄的；暗示的", "There was an implicit warning.", "核心词汇"),
        ("incidence", "/ˈɪnsɪdəns/", "n. 发生率", "The incidence of crime has fallen.", "核心词汇"),
        ("incorporate", "/ɪnˈkɔːpəreɪt/", "v. 合并；包含", "We incorporated the changes.", "核心词汇"),
        ("indigenous", "/ɪnˈdɪdʒɪnəs/", "adj. 本地的；土著的", "The indigenous people.", "核心词汇"),
        ("induce", "/ɪnˈdjuːs/", "v. 引起；诱导", "Stress can induce illness.", "核心词汇"),
        ("inference", "/ˈɪnfərəns/", "n. 推理；推论", "The inference is logical.", "核心词汇"),
        ("infrastructure", "/ˈɪnfrəstrʌktʃər/", "n. 基础设施", "The infrastructure is outdated.", "核心词汇"),
        ("inhibit", "/ɪnˈhɪbɪt/", "v. 抑制；阻止", "Fear inhibits action.", "核心词汇"),
        ("initiate", "/ɪˈnɪʃieɪt/", "v. 发起；开始", "They initiated the process.", "核心词汇"),
        ("innate", "/ɪˈneɪt/", "adj. 先天的；固有的", "It is an innate ability.", "核心词汇"),
        ("intact", "/ɪnˈtækt/", "adj. 完整的；未受损的", "The building remains intact.", "核心词汇"),
        ("integral", "/ˈɪntɪɡrəl/", "adj. 不可或缺的", "It is an integral part.", "核心词汇"),
        ("interim", "/ˈɪntərɪm/", "adj. 暂时的；临时的", "An interim solution was found.", "核心词汇"),
        ("invoke", "/ɪnˈvəʊk/", "v. 调用；援引", "He invoked the law.", "核心词汇"),
        ("jeopardize", "/ˈdʒepədaɪz/", "v. 危害；危及", "It could jeopardize the mission.", "核心词汇"),
        ("judicial", "/dʒuːˈdɪʃl/", "adj. 司法的；公正的", "The judicial system is fair.", "核心词汇"),
        ("juxtapose", "/ˌdʒʌkstəˈpəʊz/", "v. 并列；并置", "They juxtaposed the two ideas.", "核心词汇"),
        ("latent", "/ˈleɪtnt/", "adj. 潜在的；隐藏的", "The latent potential is great.", "核心词汇"),
        ("legitimate", "/lɪˈdʒɪtɪmət/", "adj. 合法的", "It is a legitimate claim.", "核心词汇"),
        ("leverage", "/ˈliːvərɪdʒ/", "v. 利用；杠杆", "We need to leverage our resources.", "核心词汇"),
        ("lucrative", "/ˈluːkrətɪv/", "adj. 有利可图的", "It is a lucrative business.", "核心词汇"),
        ("malicious", "/məˈlɪʃəs/", "adj. 恶意的", "It was a malicious attack.", "核心词汇"),
        ("mandatory", "/ˈmændətəri/", "adj. 强制的", "Attendance is mandatory.", "核心词汇"),
        ("maneuver", "/məˈnuːvər/", "n. 策略 v. 操纵", "It was a clever maneuver.", "核心词汇"),
        ("meditation", "/ˌmedɪˈteɪʃn/", "n. 冥想；沉思", "He practices meditation.", "核心词汇"),
        ("meticulous", "/məˈtɪkjələs/", "adj. 一丝不苟的", "She is meticulous in her work.", "核心词汇"),
        ("mitigate", "/ˈmɪtɪɡeɪt/", "v. 减轻；缓和", "We must mitigate the risks.", "核心词汇"),
        ("moratorium", "/ˌmɒrəˈtɔːriəm/", "n. 暂停；延期", "A moratorium was declared.", "核心词汇"),
        ("negligence", "/ˈneɡlɪdʒəns/", "n. 疏忽；过失", "It was an act of negligence.", "核心词汇"),
        ("nominal", "/ˈnɒmɪnl/", "adj. 名义上的", "The fee is nominal.", "核心词汇"),
        ("norm", "/nɔːm/", "n. 准则；规范", "It is the social norm.", "核心词汇"),
        ("notorious", "/nəʊˈtɔːriəs/", "adj. 臭名昭著的", "He is notorious.", "核心词汇"),
        ("novice", "/ˈnɒvɪs/", "n. 新手；初学者", "He is a novice at coding.", "核心词汇"),
        ("obligatory", "/əˈblɪɡətəri/", "adj. 义务的；必须的", "Attendance is obligatory.", "核心词汇"),
        ("obsolete", "/ˈɒbsəliːt/", "adj. 过时的", "The technology is obsolete.", "核心词汇"),
        ("obstruct", "/əbˈstrʌkt/", "v. 阻碍；阻塞", "The road was obstructed.", "核心词汇"),
        ("onset", "/ˈɒnset/", "n. 开始；发作", "The onset of winter.", "核心词汇"),
        ("opt", "/ɒpt/", "v. 选择", "She opted for the cheaper option.", "核心词汇"),
        ("optimum", "/ˈɒptɪməm/", "adj. 最佳的", "The optimum temperature.", "核心词汇"),
        ("orient", "/ˈɔːrient/", "v. 使适应；定向", "We need to orient new employees.", "核心词汇"),
        ("oscillate", "/ˈɒsɪleɪt/", "v. 摆动；波动", "The pendulum oscillates.", "核心词汇"),
        ("overlap", "/ˌəʊvəˈlæp/", "v. 重叠", "The two events overlap.", "核心词汇"),
        ("oversee", "/ˌəʊvəˈsiː/", "v. 监督；监管", "She oversees the project.", "核心词汇"),
        ("paradigm", "/ˈpærədaɪm/", "n. 范式；典范", "A new paradigm emerged.", "核心词汇"),
        ("parity", "/ˈpærəti/", "n. 平等；对等", "They achieved parity.", "核心词汇"),
        ("peculiar", "/pɪˈkjuːliər/", "adj. 特殊的；奇怪的", "It has a peculiar smell.", "核心词汇"),
        ("peripheral", "/pəˈrɪfərəl/", "adj. 外围的；次要的", "It is a peripheral issue.", "核心词汇"),
        ("perpetuate", "/pəˈpetʃueɪt/", "v. 使永久化", "It perpetuates the myth.", "核心词汇"),
        ("pertinent", "/ˈpɜːtɪnənt/", "adj. 相关的；切题的", "The question is pertinent.", "核心词汇"),
        ("plausible", "/ˈplɔːzəbl/", "adj. 似乎合理的", "The explanation is plausible.", "核心词汇"),
        ("pragmatic", "/præɡˈmætɪk/", "adj. 务实的", "He takes a pragmatic approach.", "核心词汇"),
        ("precedent", "/ˈpresɪdənt/", "n. 先例", "There is a precedent.", "核心词汇"),
        ("preclude", "/prɪˈkluːd/", "v. 排除；阻止", "This precludes other options.", "核心词汇"),
        ("predominant", "/prɪˈdɒmɪnənt/", "adj. 主要的；占优势的", "It is the predominant view.", "核心词汇"),
        ("preliminary", "/prɪˈlɪmɪnəri/", "adj. 初步的", "Preliminary results are positive.", "核心词汇"),
        ("premise", "/ˈpremɪs/", "n. 前提；假设", "The premise is correct.", "核心词汇"),
        ("presume", "/prɪˈzjuːm/", "v. 假定；推测", "I presume you agree.", "核心词汇"),
        ("prevalent", "/ˈprevələnt/", "adj. 普遍的", "The practice is prevalent.", "核心词汇"),
        ("proclaim", "/prəˈkleɪm/", "v. 宣布；声明", "They proclaimed independence.", "核心词汇"),
        ("profound", "/prəˈfaʊnd/", "adj. 深刻的", "It had a profound effect.", "核心词汇"),
        ("prohibit", "/prəˈhɪbɪt/", "v. 禁止", "The law prohibits it.", "核心词汇"),
        ("propagate", "/ˈprɒpəɡeɪt/", "v. 传播；繁殖", "They propagated the idea.", "核心词汇"),
        ("proprietary", "/prəˈpraɪətəri/", "adj. 专有的", "It is proprietary software.", "核心词汇"),
        ("proximity", "/prɒkˈsɪməti/", "n. 接近；邻近", "The proximity to the city.", "核心词汇"),
        ("radical", "/ˈrædɪkl/", "adj. 激进的", "Radical changes are needed.", "核心词汇"),
        ("rationale", "/ˌræʃəˈnɑːl/", "n. 理由；原理", "The rationale is clear.", "核心词汇"),
        ("reconcile", "/ˈrekənsaɪl/", "v. 调和；和解", "They reconciled their differences.", "核心词汇"),
        ("recur", "/rɪˈkɜːr/", "v. 重现；复发", "The problem keeps recurring.", "核心词汇"),
        ("redundant", "/rɪˈdʌndənt/", "adj. 冗余的", "The data is redundant.", "核心词汇"),
        ("refute", "/rɪˈfjuːt/", "v. 反驳；驳斥", "He refuted the argument.", "核心词汇"),
        ("reinforce", "/ˌriːɪnˈfɔːs/", "v. 加强", "We reinforced the structure.", "核心词汇"),
        ("reluctant", "/rɪˈlʌktənt/", "adj. 不情愿的", "He was reluctant.", "核心词汇"),
        ("remnant", "/ˈremnənt/", "n. 残余；遗迹", "The remnants of the past.", "核心词汇"),
        ("repercussion", "/ˌriːpəˈkʌʃn/", "n. 影响；后果", "The repercussions were severe.", "核心词汇"),
        ("replicate", "/ˈreplɪkeɪt/", "v. 复制；重复", "We replicated the experiment.", "核心词汇"),
        ("residual", "/rɪˈzɪdjuəl/", "adj. 残余的", "The residual effects.", "核心词汇"),
        ("resilient", "/rɪˈzɪliənt/", "adj. 有弹性的", "She is resilient.", "核心词汇"),
        ("retrospect", "/ˈretrəspekt/", "n. 回顾", "In retrospect, it was wise.", "核心词汇"),
        ("rigorous", "/ˈrɪɡərəs/", "adj. 严格的", "The process is rigorous.", "核心词汇"),
        ("robust", "/rəʊˈbʌst/", "adj. 强健的", "The system is robust.", "核心词汇"),
        ("scrutiny", "/ˈskruːtəni/", "n. 审查", "Under close scrutiny.", "核心词汇"),
        ("simulate", "/ˈsɪmjuleɪt/", "v. 模拟", "We simulated the conditions.", "核心词汇"),
        ("skeptical", "/ˈskeptɪkl/", "adj. 怀疑的", "She is skeptical.", "核心词汇"),
        ("solicitor", "/səˈlɪsɪtər/", "n. 律师", "He consulted a solicitor.", "核心词汇"),
        ("sophisticated", "/səˈfɪstɪkeɪtɪd/", "adj. 精密的", "A sophisticated system.", "核心词汇"),
        ("specify", "/ˈspesɪfaɪ/", "v. 指定；详述", "Please specify the details.", "核心词汇"),
        ("spectrum", "/ˈspektrəm/", "n. 光谱；范围", "A wide spectrum of opinions.", "核心词汇"),
        ("speculate", "/ˈspekjuleɪt/", "v. 推测；投机", "We can only speculate.", "核心词汇"),
        ("spontaneous", "/spɒnˈteɪniəs/", "adj. 自发的", "A spontaneous reaction.", "核心词汇"),
        ("stagnant", "/ˈstæɡnənt/", "adj. 停滞的", "The economy is stagnant.", "核心词汇"),
        ("stipulate", "/ˈstɪpjuleɪt/", "v. 规定；明确要求", "The contract stipulates...", "核心词汇"),
        ("subordinate", "/səˈbɔːdɪnət/", "adj. 从属的", "A subordinate role.", "核心词汇"),
        ("subsequent", "/ˈsʌbsɪkwənt/", "adj. 随后的", "In subsequent years.", "核心词汇"),
        ("substantial", "/səbˈstænʃl/", "adj. 大量的", "A substantial amount.", "核心词汇"),
        ("substantiate", "/səbˈstænʃieɪt/", "v. 证实", "He substantiated his claim.", "核心词汇"),
        ("subtle", "/ˈsʌtl/", "adj. 微妙的", "A subtle difference.", "核心词汇"),
        ("suffice", "/səˈfaɪs/", "v. 足够", "This will suffice.", "核心词汇"),
        ("superficial", "/ˌsuːpəˈfɪʃl/", "adj. 表面的", "A superficial analysis.", "核心词汇"),
        ("supplement", "/ˈsʌplɪment/", "v. 补充", "We supplemented the data.", "核心词汇"),
        ("suppress", "/səˈpres/", "v. 压制", "They suppressed the information.", "核心词汇"),
        ("sustain", "/səˈsteɪn/", "v. 维持", "We sustained our efforts.", "核心词汇"),
        ("synthesis", "/ˈsɪnθəsɪs/", "n. 综合；合成", "A synthesis of ideas.", "核心词汇"),
        ("tangible", "/ˈtændʒəbl/", "adj. 有形的", "Tangible results.", "核心词汇"),
        ("tentative", "/ˈtentətɪv/", "adj. 暂定的", "A tentative plan.", "核心词汇"),
        ("terminate", "/ˈtɜːmɪneɪt/", "v. 终止", "The contract was terminated.", "核心词汇"),
        ("threshold", "/ˈθreʃhəʊld/", "n. 阈值", "The threshold was reached.", "核心词汇"),
        ("transparent", "/trænsˈpærənt/", "adj. 透明的", "The process is transparent.", "核心词汇"),
        ("trivial", "/ˈtrɪviəl/", "adj. 琐碎的", "It is a trivial matter.", "核心词汇"),
        ("undergo", "/ˌʌndəˈɡəʊ/", "v. 经历", "He underwent surgery.", "核心词汇"),
        ("underlie", "/ˌʌndəˈlaɪ/", "v. 构成基础", "Several factors underlie this.", "核心词汇"),
        ("undermine", "/ˌʌndəˈmaɪn/", "v. 破坏", "It undermines trust.", "核心词汇"),
        ("undertake", "/ˌʌndəˈteɪk/", "v. 承担", "She undertook the task.", "核心词汇"),
        ("unprecedented", "/ʌnˈpresɪdentɪd/", "adj. 前所未有的", "An unprecedented event.", "核心词汇"),
        ("utilize", "/ˈjuːtɪlaɪz/", "v. 利用", "We utilized the resources.", "核心词汇"),
        ("viable", "/ˈvaɪəbl/", "adj. 可行的", "A viable option.", "核心词汇"),
        ("vigorous", "/ˈvɪɡərəs/", "adj. 有力的", "A vigorous campaign.", "核心词汇"),
        ("vulnerable", "/ˈvʌlnərəbl/", "adj. 脆弱的", "A vulnerable population.", "核心词汇"),
        ("warrant", "/ˈwɒrənt/", "v. 保证", "The action was warranted.", "核心词汇"),
        ("whereas", "/weərˈæz/", "conj. 然而", "Whereas the first was good...", "核心词汇"),
        ("yield", "/jiːld/", "v. 产出；屈服", "The crop yielded well.", "核心词汇"),
    ]

    for word, phonetic, meaning, example, category in default_words:
        db.execute(
            "INSERT OR IGNORE INTO vocabulary (id, word, phonetic, meaning, example, category) VALUES (?, ?, ?, ?, ?, ?)",
            (generate_id(), word, phonetic, meaning, example, category)
        )

    db.commit()
    db.close()
    return {"message": "词汇数据初始化成功", "count": len(default_words)}


@app.get("/api")
async def api_root():
    return {"name": APP_NAME, "version": APP_VERSION, "status": "running"}


# 所有 API 路由注册完成后再挂载静态前端，避免覆盖 /api。
FRONTEND_DIR = Path(os.getenv("FRONTEND_DIR", str(Path(__file__).parent / "frontend-dist"))).resolve()
if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
else:
    logger.warning("前端静态目录不存在，仅启动 API: %s", FRONTEND_DIR)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=DEBUG)

