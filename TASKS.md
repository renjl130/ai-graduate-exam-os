# 任务清单 — 佳乐考研

> 最后更新: 2026-05-28

---

## 已完成 ✅

- [x] 项目架构设计（前后端分离、技术选型）
- [x] 产品文档体系（6份技术文档 + README + PROJECT_HANDOFF）
- [x] Next.js 15 前端框架搭建
- [x] 深色主题设计系统（CSS变量、Notion风格）
- [x] 侧边栏导航组件（10模块、考研倒计时、折叠）
- [x] Dashboard 仪表盘 UI（已接入真实 API + localStorage）
- [x] AI 导师聊天 UI（流式对话、SSE、Markdown）
- [x] 闪卡系统 UI + 后端对接（FSRS 算法、真实 API 调用）
- [x] FastAPI 后端框架（20+ API 端点）
- [x] AI Service 真实调用（DeepSeek/OpenRouter/Ollama 多模型路由）
- [x] SQLite 数据库（6张表自动建表 + 索引）
- [x] FSRS 间隔复习算法实现
- [x] SSE 流式响应实现
- [x] 多 AI 模型自动降级路由
- [x] 前端构建验证通过
- [x] 启动脚本（start-frontend.bat / start-backend.bat）
- [x] API 客户端（api.ts，SSE 流式解析 + 全部接口封装）
- [x] Python 3.14 环境兼容（pydantic 2.13.4 正常工作）
- [x] 后端启动验证（Uvicorn + SQLite + DeepSeek）
- [x] 学习计划页面（任务CRUD、周视图、时间分配、localStorage持久化）
- [x] 资料库页面（文件列表、在线查看Markdown、拖拽上传、文件管理）
- [x] AI 搜索页面（20条可搜索内容、关键词高亮、类型筛选）
- [x] 核心理论页面（20个传播学&新闻学理论、详细解释、考试要点）
- [x] 热点专题页面（12个热点、考题角度、答题框架）
- [x] 模拟考试页面（10道真实考题、计时器、自动评分、答案解析）
- [x] 错题本页面（错题CRUD、掌握度追踪、薄弱环节分析）
- [x] 院校情报页面（分数线、参考书、考情分析、4个tab）
- [x] 学习社区页面（经验帖、点赞、标签筛选）
- [x] 设置页面（个人信息、目标分数、数据管理）
- [x] Dashboard 接入真实 API（/api/dashboard/stats）
- [x] Flashcards 接入真实 API（/api/flashcards/due, review, generate）
- [x] 侧边栏动态 Badge（闪卡待复习数、错题数）
- [x] 文件管理 API（列表、查看、上传、删除）
- [x] .gitignore 文件
- [x] 10份真实学习资料（真题、笔记、模板、热点）
- [x] DeepSeek API 集成（sk-7da8...，token 限制 2048）
- [x] AI 资料整理功能（/api/ai/organize，结构化笔记生成）
- [x] AI 文件分析功能（/api/ai/analyze-file，提取知识点）
- [x] PDF 在线查看（react-pdf，翻页、缩放）
- [x] PDF 文本提取（PyPDF2，后端解析）
- [x] AI 导师模式切换（智能问答 / 资料整理）
- [x] UI 优化（滚动条、聚焦发光、加载动画、focus-visible）

---

## 当前功能清单

### 1. 学习仪表盘
- 考研倒计时
- 今日学习统计（对话数、复习数、错题数）
- 四科进度追踪（政治/英语/334/440）
- 今日学习计划
- 快捷入口（复习、模考、AI问答、错题）

### 2. AI 导师（双模式）
- **智能问答模式**：SSE 流式对话，Markdown 渲染，推荐问题
- **资料整理模式**：输入主题/内容，AI 生成结构化复习笔记
- DeepSeek V3 模型，token 优化（系统提示 30 token，max_tokens 2048）

### 3. 资料库
- 文件列表（卡片网格布局，类型筛选，搜索）
- 拖拽上传（支持 .md .txt .pdf .doc .csv .json .png .jpg）
- 在线查看（Markdown 渲染、PDF 翻页缩放、文本预览）
- AI 分析（每个文件可调用 AI 提取知识点）
- 文件删除

### 4. 闪卡系统
- FSRS 间隔复习算法
- AI 自动生成闪卡
- 到期闪卡复习（4级评分）
- 闪卡统计

### 5. 学习计划
- 任务 CRUD（标题、科目、时长、优先级）
- 周视图展示
- 时间分配图
- localStorage 持久化

### 6. AI 搜索
- 20 条预设内容（理论、真题、热点）
- 关键词高亮
- 类型筛选

### 7. 核心理论
- 20 个传播学 & 新闻学理论
- 详细解释 + 考试要点 + 关键词

### 8. 热点专题
- 12 个考研热点
- 考题角度 + 相关理论 + 答题框架

### 9. 模拟考试
- 10 道真实考题（334/440）
- 计时器
- 自动评分 + 答案解析

### 10. 错题本
- 错题 CRUD
- 掌握度追踪
- 薄弱环节分析

### 11. 院校情报
- 深圳大学新闻与传播 MJC
- 分数线、参考书、考情分析

### 12. 学习社区
- 经验帖浏览
- 点赞、标签筛选

### 13. 设置
- 个人信息编辑
- 目标分数设置
- 数据导入/导出

---

## P1 — 优化与增强（近期）

### 资料库增强
- [ ] 支持 Word 文件预览（mammoth.js 转 HTML）
- [ ] 支持图片文件预览
- [ ] 文件分类标签系统（手动打标签）
- [ ] 文件搜索增强（全文搜索文件内容）

### AI 功能增强
- [ ] AI 导师对话支持上传图片/PDF 进行问答
- [ ] AI 自动生成学习计划
- [ ] AI 智能搜索（语义搜索，需 Embedding）
- [ ] 错题 AI 分析 + 专项训练推荐

### 模拟考试增强
- [ ] 支持从题库随机抽题
- [ ] 支持自定义考试时长和题目数量
- [ ] 考试历史记录和成绩趋势
- [ ] AI 自动出题（调用 LLM 生成新题）

### 闪卡增强
- [ ] 支持手动创建闪卡（前端表单）
- [ ] 闪卡按科目筛选
- [ ] 闪卡统计图表

### 知识库增强（新增）
- [x] 知识关系创建（14条关系）
- [x] 核心理论页面改为知识库驱动
- [x] 热点专题页面改为知识库驱动
- [x] 英语页面改为知识库驱动
- [x] 政治页面改为知识库驱动
- [x] 增加更多知识关系（14条）
- [x] 将效果研究理论拆分为独立知识点（7个）
- [x] 文档导入系统（PDF/Word/MD/TXT）
- [x] 向量搜索（TF-IDF + 余弦相似度）
- [x] 复习调度系统（FSRS 算法）
- [x] 前端集成（5个新页面）
- [x] 学习时长追踪（StudyTimer 组件）
- [x] 个性化学习推荐（基于掌握度和错题）
- [x] 考试预测（基于学习数据的分数预测）

---

## P2 — 核心功能开发（中期）

### 用户系统
- [ ] 用户注册/登录（Supabase Auth 或自建）
- [ ] API 认证中间件
- [ ] 用户个人设置页面

### 资料库深度功能
- [ ] OCR 图片识别（PaddleOCR）
- [ ] 向量化存储（ChromaDB）
- [ ] RAG Pipeline（Embedding + Rerank）

### 学习计划增强
- [ ] AI 生成学习计划
- [ ] 每日/每周/阶段计划视图
- [ ] 计划执行追踪和统计
- [ ] 自动调整（连续低分时重规划）

---

## P3 — 高级功能（远期）

### Agent 系统
- [ ] Coordinator Agent（意图识别 + 路由）
- [ ] 问答 Agent / 出题 Agent / 规划 Agent / 院校 Agent / 资料 Agent / 复盘 Agent

### 部署
- [ ] Docker 容器化
- [ ] Vercel 前端部署 + Railway 后端部署
- [ ] 域名 + HTTPS

### 移动端
- [ ] 响应式适配
- [ ] PWA 支持

---

## 当前技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| 前端 | Next.js + React + TypeScript | 15.x / 19.x |
| 样式 | Tailwind CSS + CSS 变量 | 4.x |
| Markdown | react-markdown | 最新 |
| PDF | react-pdf + pdfjs-dist | 最新 |
| 后端 | FastAPI + Uvicorn | 0.136+ |
| 数据库 | SQLite | 内置 |
| AI | DeepSeek V3/R1 | 真实 API |
| PDF解析 | PyPDF2 | 3.0.1 |
| 算法 | FSRS 间隔复习 | 自实现 |

---

## API 端点清单

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/chat` | POST | SSE流式AI对话 |
| `/api/chat/models` | GET | AI模型列表 |
| `/api/ai/organize` | POST | AI资料整理 |
| `/api/ai/analyze-file` | POST | AI文件分析 |
| `/api/conversations` | GET | 会话列表 |
| `/api/conversations/{id}/messages` | GET | 会话消息 |
| `/api/flashcards/due` | GET | 到期闪卡 |
| `/api/flashcards` | POST | 创建闪卡 |
| `/api/flashcards/generate` | POST | AI生成闪卡 |
| `/api/flashcards/{id}/review` | POST | FSRS复习 |
| `/api/flashcards/stats` | GET | 闪卡统计 |
| `/api/dashboard/stats` | GET | 仪表盘统计 |
| `/api/files` | GET | 文件列表 |
| `/api/files/content/{path}` | GET | 文件内容（文本/PDF文本提取） |
| `/api/files/pdf/{path}` | GET | PDF二进制流 |
| `/api/files/upload` | POST | 文件上传 |
| `/api/files/{path}` | DELETE | 文件删除 |
