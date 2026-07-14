"""
AI 服务 - 真实 LLM API 调用
支持 DeepSeek / OpenRouter / Ollama (OpenAI 兼容格式)
"""
import httpx
import json
import logging
from typing import AsyncGenerator, Optional, List, Dict

from config import get_available_provider

logger = logging.getLogger(__name__)

# 考研导师系统提示词（通用版，支持所有专业）
SYSTEM_PROMPT = """你是考研AI导师「小研」，帮助考研学生备考。回答要求：中文、Markdown格式、准确有条理、不确定时诚实说明。根据学生所报专业和目标院校，提供针对性的考研指导。"""

# 资料整理专用提示词
ORGANIZE_PROMPT = """你是考研资料整理助手。请将用户提供的内容整理成结构化的复习笔记。
要求：
1. 使用 Markdown 格式，包含标题、要点、表格
2. 提取核心知识点和关键词
3. 标注重点（加粗）和考试频率
4. 内容精炼，便于背诵
5. 如有理论，注明提出者和核心观点"""

# 文件分析专用提示词
ANALYZE_PROMPT = """你是考研资料分析助手。请分析用户上传的学习资料，提取核心内容。
要求：
1. 总结资料的主要内容和结构
2. 提取核心知识点列表
3. 标注重点理论和概念
4. 指出可能的考试考点
5. 用 Markdown 格式输出"""


class AIService:
    """统一 AI 服务，支持多个 LLM Provider"""

    def __init__(self):
        self.provider = get_available_provider()
        self.conversations: Dict[str, List[Dict]] = {}  # 简易会话存储
        logger.info(f"AI Provider: {self.provider['name']}, "
                    f"Default Model: {self.provider['default_model'] or 'not configured'}")

    def _build_headers(self) -> dict:
        """构建请求头"""
        return {
            "Authorization": f"Bearer {self.provider['api_key']}",
            "Content-Type": "application/json",
        }

    def _build_url(self, model: str) -> str:
        """构建 API URL"""
        base = self.provider["api_base"].rstrip("/")
        return f"{base}/chat/completions"

    async def chat(
        self,
        message: str,
        conversation_id: Optional[str] = None,
        model: Optional[str] = None,
        subject: Optional[str] = None,
    ) -> AsyncGenerator[str, None]:
        """
        流式聊天 - 真实 LLM API 调用
        返回 SSE 格式的流式响应
        """
        if not self.provider.get("configured"):
            yield json.dumps({"type": "error", "content": "AI 服务尚未配置。站点管理员可设置 DEEPSEEK_API_KEY 或 OPENROUTER_API_KEY。"}, ensure_ascii=False) + "\n"
            return

        # 选择模型
        chosen_model = model or self.provider["default_model"]

        # 构建消息历史
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # 添加学科上下文
        if subject:
            messages.append({
                "role": "system",
                "content": f"学生当前正在复习学科：{subject}。请优先围绕该学科回答问题。"
            })

        # 添加历史对话
        if conversation_id and conversation_id in self.conversations:
            messages.extend(self.conversations[conversation_id])

        # 添加当前问题
        messages.append({"role": "user", "content": message})

        # 发送状态：正在思考
        yield json.dumps({
            "type": "status",
            "content": f"🔍 正在思考...（使用 {self.provider['name']} - {chosen_model}）"
        }, ensure_ascii=False) + "\n"

        try:
            # 构建请求体
            request_body = {
                "model": chosen_model,
                "messages": messages,
                "stream": True,
                "temperature": 0.7,
                "max_tokens": 2048,
            }

            url = self._build_url(chosen_model)
            headers = self._build_headers()

            full_response = ""

            async with httpx.AsyncClient(timeout=120.0) as client:
                async with client.stream(
                    "POST",
                    url,
                    json=request_body,
                    headers=headers,
                ) as response:
                    if response.status_code != 200:
                        error_body = ""
                        async for chunk in response.aiter_text():
                            error_body += chunk
                        yield json.dumps({
                            "type": "error",
                            "content": f"AI 服务错误 (HTTP {response.status_code}): {error_body}"
                        }, ensure_ascii=False) + "\n"
                        return

                    # 解析 SSE 流
                    buffer = ""
                    async for chunk in response.aiter_text():
                        buffer += chunk
                        while "\n" in buffer:
                            line, buffer = buffer.split("\n", 1)
                            line = line.strip()
                            if not line or line == "data: [DONE]":
                                continue
                            if line.startswith("data: "):
                                json_str = line[6:]
                                try:
                                    data = json.loads(json_str)
                                    delta = data.get("choices", [{}])[0].get("delta", {})
                                    content = delta.get("content", "")
                                    if content:
                                        full_response += content
                                        yield json.dumps({
                                            "type": "content",
                                            "content": content
                                        }, ensure_ascii=False) + "\n"
                                except json.JSONDecodeError:
                                    continue

            # 保存到会话历史
            if conversation_id:
                if conversation_id not in self.conversations:
                    self.conversations[conversation_id] = []
                self.conversations[conversation_id].append(
                    {"role": "user", "content": message}
                )
                self.conversations[conversation_id].append(
                    {"role": "assistant", "content": full_response}
                )
                # 限制历史长度（保留最近20轮）
                if len(self.conversations[conversation_id]) > 40:
                    self.conversations[conversation_id] = \
                        self.conversations[conversation_id][-40:]

            # 发送完成信号
            yield json.dumps({
                "type": "done",
                "model": chosen_model,
                "provider": self.provider["name"],
                "conversation_id": conversation_id,
            }, ensure_ascii=False) + "\n"

        except httpx.TimeoutException:
            yield json.dumps({
                "type": "error",
                "content": "⏰ AI 响应超时，请稍后重试。可能是网络问题或服务繁忙。"
            }, ensure_ascii=False) + "\n"
        except httpx.ConnectError:
            yield json.dumps({
                "type": "error",
                "content": f"🔌 无法连接到 AI 服务 ({self.provider['name']})。请检查网络或 API 配置。"
            }, ensure_ascii=False) + "\n"
        except Exception as e:
            logger.exception("AI service error")
            yield json.dumps({
                "type": "error",
                "content": f"❌ AI 服务异常: {str(e)}"
            }, ensure_ascii=False) + "\n"

    async def chat_simple(
        self,
        message: str,
        model: Optional[str] = None,
        subject: Optional[str] = None,
    ) -> str:
        """非流式聊天 - 返回完整回复文本"""
        if not self.provider.get("configured"):
            return "AI 服务尚未配置。站点管理员可设置 DEEPSEEK_API_KEY 或 OPENROUTER_API_KEY。"
        chosen_model = model or self.provider["default_model"]
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        if subject:
            messages.append({
                "role": "system",
                "content": f"学生当前正在复习学科：{subject}。请优先围绕该学科回答问题。"
            })

        messages.append({"role": "user", "content": message})

        try:
            request_body = {
                "model": chosen_model,
                "messages": messages,
                "stream": False,
                "temperature": 0.7,
                "max_tokens": 2048,
            }

            url = self._build_url(chosen_model)
            headers = self._build_headers()

            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(url, json=request_body, headers=headers)

                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                else:
                    return f"AI 服务错误 (HTTP {response.status_code}): {response.text}"

        except Exception as e:
            logger.exception("AI simple chat error")
            return f"AI 服务异常: {str(e)}"

    async def organize_content(
        self,
        content: str,
        topic: Optional[str] = None,
    ) -> str:
        """资料整理 - 非流式，返回结构化笔记"""
        if not self.provider.get("configured"):
            return "AI 服务尚未配置。站点管理员可设置 DEEPSEEK_API_KEY 或 OPENROUTER_API_KEY。"
        chosen_model = self.provider["default_model"]
        messages = [{"role": "system", "content": ORGANIZE_PROMPT}]
        if topic:
            messages.append({"role": "system", "content": f"整理主题：{topic}"})
        # 截断过长内容，节省 token
        truncated = content[:6000] if len(content) > 6000 else content
        messages.append({"role": "user", "content": f"请整理以下内容：\n\n{truncated}"})
        try:
            request_body = {
                "model": chosen_model,
                "messages": messages,
                "stream": False,
                "temperature": 0.5,
                "max_tokens": 2048,
            }
            async with httpx.AsyncClient(timeout=120.0) as client:
                resp = await client.post(self._build_url(chosen_model), json=request_body, headers=self._build_headers())
                if resp.status_code == 200:
                    return resp.json()["choices"][0]["message"]["content"]
                return f"AI 服务错误 (HTTP {resp.status_code})"
        except Exception as e:
            logger.exception("organize error")
            return f"AI 服务异常: {str(e)}"

    async def analyze_content(
        self,
        content: str,
        filename: str = "",
    ) -> str:
        """文件分析 - 非流式，返回分析结果"""
        if not self.provider.get("configured"):
            return "AI 服务尚未配置。站点管理员可设置 DEEPSEEK_API_KEY 或 OPENROUTER_API_KEY。"
        chosen_model = self.provider["default_model"]
        messages = [{"role": "system", "content": ANALYZE_PROMPT}]
        truncated = content[:6000] if len(content) > 6000 else content
        messages.append({"role": "user", "content": f"请分析文件「{filename}」的内容：\n\n{truncated}"})
        try:
            request_body = {
                "model": chosen_model,
                "messages": messages,
                "stream": False,
                "temperature": 0.5,
                "max_tokens": 2048,
            }
            async with httpx.AsyncClient(timeout=120.0) as client:
                resp = await client.post(self._build_url(chosen_model), json=request_body, headers=self._build_headers())
                if resp.status_code == 200:
                    return resp.json()["choices"][0]["message"]["content"]
                return f"AI 服务错误 (HTTP {resp.status_code})"
        except Exception as e:
            logger.exception("analyze error")
            return f"AI 服务异常: {str(e)}"

    async def generate_exam(
        self,
        subject: str = "440",
        count: int = 10,
        difficulty: str = "中等",
    ) -> str:
        """AI 生成模拟试卷"""
        if not self.provider.get("configured"):
            return "AI 服务尚未配置。站点管理员可设置 DEEPSEEK_API_KEY 或 OPENROUTER_API_KEY。"
        chosen_model = self.provider["default_model"]
        prompt = f"""你是一位考研出题专家。请为学科「{subject}」生成一套模拟试卷。

要求：
1. 生成 {count} 道题，难度：{difficulty}
2. 包含以下题型：
   - 选择题（4道，每题5分，含4个选项和正确答案）
   - 简答题（3道，每题15分）
   - 论述题（2道，每题30分）
   - 名词解释（1道，5分）
3. 题目要贴近考研真题风格，覆盖重要知识点
4. 必须严格按照以下 JSON 格式输出，不要输出其他内容：

```json
[
  {{"type":"choice","question":"题目","options":["A. 选项1","B. 选项2","C. 选项3","D. 选项4"],"answer":"A","score":5,"explanation":"解析"}},
  {{"type":"short_answer","question":"题目","answer":"参考答案","score":15,"explanation":"评分要点"}},
  {{"type":"essay","question":"题目","answer":"参考答案","score":30,"explanation":"评分要点"}},
  {{"type":"term","question":"名词：XXX","answer":"定义","score":5,"explanation":"解析"}}
]
```"""
        messages = [
            {"role": "system", "content": "你是考研出题专家。只输出JSON数组，不要输出其他任何内容。"},
            {"role": "user", "content": prompt},
        ]
        try:
            request_body = {
                "model": chosen_model,
                "messages": messages,
                "stream": False,
                "temperature": 0.7,
                "max_tokens": 4096,
            }
            async with httpx.AsyncClient(timeout=180.0) as client:
                resp = await client.post(self._build_url(chosen_model), json=request_body, headers=self._build_headers())
                if resp.status_code == 200:
                    return resp.json()["choices"][0]["message"]["content"]
                return f"AI 服务错误 (HTTP {resp.status_code})"
        except Exception as e:
            logger.exception("generate_exam error")
            return f"AI 服务异常: {str(e)}"

    async def generate_study_plan(
        self,
        subjects: Optional[List[str]] = None,
        hours_per_day: int = 10,
        days: int = 7,
    ) -> str:
        """AI 生成学习计划"""
        if not self.provider.get("configured"):
            return "AI 服务尚未配置。站点管理员可设置 DEEPSEEK_API_KEY 或 OPENROUTER_API_KEY。"
        chosen_model = self.provider["default_model"]
        sub_list = "、".join(subjects) if subjects else "440新传基础、334新传综合、英语二、政治"
        prompt = f"""你是考研学习规划专家。请为考研学生制定{days}天的学习计划。

要求：
1. 每天学习 {hours_per_day} 小时
2. 涵盖科目：{sub_list}
3. 合理分配各科时间，重点科目多分配
4. 包含具体的任务内容（如精读某章节、做真题、背诵等）
5. 任务要具体可执行
6. 按天输出，每天3-6个任务

请严格按照以下 JSON 格式输出，不要输出其他内容：
```json
[
  {{"day": 0, "tasks": [{{"title": "具体任务描述", "subject": "440", "duration": 60, "priority": "high"}}]}},
  {{"day": 1, "tasks": [...]}}
]
```
day 从 0 开始表示今天，1 表示明天，以此类推。subject 只能是 440、334、英语二、政治。priority 只能是 high、medium、low。duration 单位是分钟。"""
        messages = [
            {"role": "system", "content": "你是考研学习规划专家。只输出JSON数组，不要输出其他任何内容。"},
            {"role": "user", "content": prompt},
        ]
        try:
            request_body = {
                "model": chosen_model,
                "messages": messages,
                "stream": False,
                "temperature": 0.7,
                "max_tokens": 4096,
            }
            async with httpx.AsyncClient(timeout=180.0) as client:
                resp = await client.post(self._build_url(chosen_model), json=request_body, headers=self._build_headers())
                if resp.status_code == 200:
                    return resp.json()["choices"][0]["message"]["content"]
                return f"AI 服务错误 (HTTP {resp.status_code})"
        except Exception as e:
            logger.exception("generate_study_plan error")
            return f"AI 服务异常: {str(e)}"

    def get_status(self) -> dict:
        """获取 AI 服务状态"""
        return {
            "provider": self.provider["name"],
            "default_model": self.provider["default_model"],
            "complex_model": self.provider["complex_model"],
            "active_conversations": len(self.conversations),
        }

    def clear_conversation(self, conversation_id: str) -> bool:
        """清除指定会话历史"""
        if conversation_id in self.conversations:
            del self.conversations[conversation_id]
            return True
        return False


# 全局单例
ai_service = AIService()