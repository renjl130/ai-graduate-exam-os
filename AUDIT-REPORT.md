# 项目审计报告 — 从 Demo 到真实产品

## 1. 只有 Mock 数据的模块（全部）

| 模块 | 前端 | 后端 | 状态 |
|------|------|------|------|
| 仪表盘 | mock-data.ts 直接读取 | 返回硬编码JSON | ❌ 全假 |
| AI导师 | setTimeout模拟回复 | 硬编码文本流 | ❌ 全假 |
| 闪卡复习 | mock-data.ts, 仅内存操作 | 返回硬编码JSON | ❌ 全假 |
| 学习计划 | 无页面 | 返回硬编码JSON | ❌ 全假 |
| 资料库 | 占位页面 | 返回硬编码JSON | ❌ 全假 |
| 搜索 | 无页面 | 返回硬编码JSON | ❌ 全假 |
| 模拟考试 | 占位页面 | 返回硬编码JSON | ❌ 全假 |
| 错题本 | 占位页面 | 返回硬编码JSON | ❌ 全假 |
| 院校情报 | 占位页面 | 返回硬编码JSON | ❌ 全假 |

## 2. 假逻辑清单

- `AiTutorPage.sendMessage()`: setTimeout 1500ms 模拟AI回复
- `FlashcardsPage.handleRate()`: 仅修改内存state, 刷新即丢失
- `backend /api/chat`: 逐字符yield硬编码文本
- `backend /api/exam/generate`: 循环生成"示例题目"
- `backend /api/flashcards/*`: 全部返回假数据
- `backend /api/dashboard/*`: 全部返回假数据

## 3. 缺失基础设施

- ❌ 无数据库连接（Postgres/Supabase）
- ❌ 无向量数据库（Milvus/ChromaDB）
- ❌ 无文件存储（S3/本地）
- ❌ 无Redis缓存
- ❌ 无AI模型调用
- ❌ 无用户认证
- ❌ 无.env配置

## 4. 接近可用的部分

- ✅ Next.js项目结构完整, tsconfig/package.json正确
- ✅ TypeScript类型定义完整（18个接口）
- ✅ CSS设计系统完整（深色主题变量）
- ✅ UI组件框架存在（侧边栏、仪表盘、聊天、闪卡）
- ✅ FastAPI骨架完整（10个路由模块, Pydantic模型）
- ✅ API端点设计合理

## 5. 优先级排序（影响最大 → 最小）

| 优先级 | 模块 | 原因 |
|--------|------|------|
| **P0** | **AI对话（真实LLM）** | 核心价值, 用户最直接感知, 不需要数据库 |
| **P1** | **数据库 + 闪卡CRUD** | 间隔复习是高频功能, 数据持久化基础 |
| **P2** | **文档上传 + 解析** | 资料库是知识库入口, 可后续做 |
| **P3** | **错题系统** | 需要先有考试/练习数据 |
| **P4** | **模拟考试** | 依赖题库或AI出题 |
| **P5** | **仪表盘** | 依赖其他模块数据 |
| **P6** | **院校情报** | 需要爬虫/外部数据 |

---

## 第一个真实模块：AI 导师对话

### 为什么先做它
1. 考研学生最刚需的功能是"有个人能随时答疑"
2. 前端聊天UI已经完成
3. 只需连接LLM API, 不需要数据库
4. 效果立即可见, 用户体验提升最大
5. 是所有其他功能的基础（出题、解析、复盘都依赖AI）

### 需要的依赖
- `httpx` — 异步HTTP调用LLM API
- `.env` — API密钥配置
- DeepSeek API / OpenRouter API（免费额度即可启动）

### 涉及的API
- `POST /api/chat` — 改为真实LLM流式调用
- 支持 DeepSeek / OpenRouter / Ollama（OpenAI兼容格式）

### 实现路径
1. 创建 `.env.example` 和配置模块
2. 创建 `backend/services/ai_service.py` — LLM调用服务
3. 重写 `backend/main.py` 的 `/api/chat` 端点
4. 前端 `AiTutorPage` 改为调用真实API
5. 安装依赖, 测试端到端

### 完成后
- AI导师对话功能真实可用
- 用户可以问任何考研问题得到AI回答
- 后续可以叠加RAG（知识库检索增强）