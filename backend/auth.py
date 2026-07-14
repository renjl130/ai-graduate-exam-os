"""
认证模块 - 简化版（不依赖python-jose）
"""
import hashlib
import hmac
import json
import base64
import time
from typing import Optional
import os

from config import SECRET_KEY

# 简化的JWT实现
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 60 * 60 * 24 * 7  # 7天


def _base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('utf-8')


def _base64url_decode(s: str) -> bytes:
    s += '=' * (4 - len(s) % 4)
    return base64.urlsafe_b64decode(s)


def create_access_token(data: dict) -> str:
    """创建JWT Token"""
    header = {"alg": ALGORITHM, "typ": "JWT"}
    payload = data.copy()
    payload["exp"] = int(time.time()) + ACCESS_TOKEN_EXPIRE_SECONDS

    header_b64 = _base64url_encode(json.dumps(header).encode())
    payload_b64 = _base64url_encode(json.dumps(payload).encode())

    message = f"{header_b64}.{payload_b64}"
    signature = hmac.new(SECRET_KEY.encode(), message.encode(), hashlib.sha256).digest()
    signature_b64 = _base64url_encode(signature)

    return f"{message}.{signature_b64}"


def decode_token(token: str) -> dict:
    """解码JWT Token"""
    try:
        parts = token.split('.')
        if len(parts) != 3:
            raise ValueError("Invalid token format")

        header_b64, payload_b64, signature_b64 = parts

        # 验证签名
        message = f"{header_b64}.{payload_b64}"
        expected_sig = hmac.new(SECRET_KEY.encode(), message.encode(), hashlib.sha256).digest()
        actual_sig = _base64url_decode(signature_b64)

        if not hmac.compare_digest(expected_sig, actual_sig):
            raise ValueError("Invalid signature")

        # 解码payload
        payload = json.loads(_base64url_decode(payload_b64))

        # 检查过期时间
        if payload.get("exp", 0) < time.time():
            raise ValueError("Token expired")

        return payload
    except Exception as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=401, detail="无效的认证凭据")


def get_password_hash(password: str) -> str:
    """生成密码哈希"""
    import hashlib
    salt = os.urandom(32).hex()
    key = hashlib.pbkdf2_hmac('sha256', password.encode(), salt.encode(), 100000)
    return f"{salt}${key.hex()}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """验证密码"""
    import hashlib
    try:
        salt, key_hex = hashed_password.split('$')
        key = hashlib.pbkdf2_hmac('sha256', plain_password.encode(), salt.encode(), 100000)
        return hmac.compare_digest(key.hex(), key_hex)
    except:
        return False
