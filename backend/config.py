"""应用配置：统一管理本地开发与生产部署环境变量。"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DEFAULT_JWT_SECRET = "your-secret-key-change-in-production"


def load_env() -> None:
    """仅为本地开发加载 backend/.env；云端只使用平台环境变量。"""
    if os.getenv("ENVIRONMENT", "development").strip().lower() == "production":
        return
    env_path = BASE_DIR / ".env"
    if not env_path.exists():
        return
    with env_path.open(encoding="utf-8-sig") as env_file:
        for raw_line in env_file:
            line = raw_line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key.strip(), value.strip())


load_env()

ENVIRONMENT = os.getenv("ENVIRONMENT", "development").strip().lower()
IS_PRODUCTION = ENVIRONMENT == "production"
APP_NAME = os.getenv("APP_NAME", "AI 考研学习操作系统")
APP_VERSION = os.getenv("APP_VERSION", "3.1.0")
DEBUG = os.getenv("DEBUG", "false").lower() == "true" and not IS_PRODUCTION
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
CORS_ORIGINS_LIST = [origin.strip() for origin in CORS_ORIGINS.split(",") if origin.strip()]

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "").strip()
DEEPSEEK_API_BASE = os.getenv("DEEPSEEK_API_BASE", "https://api.deepseek.com").strip()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "").strip()
OPENROUTER_API_BASE = os.getenv("OPENROUTER_API_BASE", "https://openrouter.ai/api/v1").strip()
OLLAMA_API_BASE = os.getenv("OLLAMA_API_BASE", "http://localhost:11434/v1").strip()
ENABLE_OLLAMA = os.getenv("ENABLE_OLLAMA", "false").lower() == "true"

UPLOAD_DIR = str(Path(os.getenv("UPLOAD_DIR", str(BASE_DIR.parent / "data" / "uploads"))).expanduser().resolve())
ALLOWED_EXTENSIONS = os.getenv("ALLOWED_EXTENSIONS", ".md,.txt,.pdf,.doc,.docx,.csv,.json,.png,.jpg,.jpeg")
ALLOWED_EXTENSIONS_LIST = [ext.strip().lower() for ext in ALLOWED_EXTENSIONS.split(",") if ext.strip()]

SECRET_KEY = os.getenv("JWT_SECRET", DEFAULT_JWT_SECRET).strip()
if IS_PRODUCTION and (not SECRET_KEY or SECRET_KEY == DEFAULT_JWT_SECRET or len(SECRET_KEY) < 32):
    raise RuntimeError("生产环境必须设置至少 32 个字符的强随机 JWT_SECRET")

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_available_provider() -> dict:
    """返回已配置的 AI Provider；生产环境不再静默请求本机 Ollama。"""
    if DEEPSEEK_API_KEY and DEEPSEEK_API_KEY != "sk-xxx":
        return {
            "name": "deepseek", "configured": True,
            "api_key": DEEPSEEK_API_KEY, "api_base": DEEPSEEK_API_BASE,
            "default_model": os.getenv("DEEPSEEK_MODEL", "deepseek-chat"),
            "complex_model": os.getenv("DEEPSEEK_COMPLEX_MODEL", "deepseek-reasoner"),
        }
    if OPENROUTER_API_KEY and OPENROUTER_API_KEY != "sk-or-xxx":
        return {
            "name": "openrouter", "configured": True,
            "api_key": OPENROUTER_API_KEY, "api_base": OPENROUTER_API_BASE,
            "default_model": os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat-v3-0324"),
            "complex_model": os.getenv("OPENROUTER_COMPLEX_MODEL", "deepseek/deepseek-r1"),
        }
    if ENABLE_OLLAMA:
        return {
            "name": "ollama", "configured": True,
            "api_key": "ollama", "api_base": OLLAMA_API_BASE,
            "default_model": os.getenv("OLLAMA_MODEL", "qwen2.5:7b"),
            "complex_model": os.getenv("OLLAMA_COMPLEX_MODEL", "qwen2.5:14b"),
        }
    return {
        "name": "unconfigured", "configured": False, "api_key": "", "api_base": "",
        "default_model": "", "complex_model": "",
    }
