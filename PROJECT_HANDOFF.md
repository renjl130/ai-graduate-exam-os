# 项目交接文档 — AI 考研学习操作系统

> 最后更新: 2026-05-28

---

## 1. 项目概述

一站式 AI 考研平台，服务中国考研学生。核心功能：资料上传→在线查看→AI答疑→真题搜索→模拟考试→错题管理→间隔复习→院校情报→学习规划。

**当前阶段：MVP 全功能可用，DeepSeek API 已接入，PDF 查看 + AI 分析完成。**

### 整体完成度：约 85%

| 层级 | 完成度 | 说明 |
|------|--------|------|
| 产品设计 & 文档 | 90% | 6份技术文档 + 完整架构设计 |
| 前端 UI | 90% | 14个完整页面 + PDF查看器 + UI优化 |
| 后端 API | 75% | 28+端点，含AI整理/分析、PDF服务 |
| 数据库 | 40% | SQLite 开发环境可用，6张表 |
| AI 集成 | 80% | DeepSeek 真实调用 + 资料整理 + 文件分析 |
| 文件管理 | 85% | 上传、列表、查看、删除 + PDF在线查看 + AI分析 |
| Agent 系统 | 0% | 仅架构设计文档 |
| RAG/向量搜索 | 0% | 仅架构设计文档 |

---

## 2. 已实现内容

### 页面状态

| 模块 | 状态 | 数据来源 | 说明 |
|------|------|----------|------|
| **Dashboard 仪表盘** | ✅ 真实 | API + localStorage | 从后端获取统计数据，从localStorage读取学习计划和错题 |
| **AI 导师** | ✅ 真实 | DeepSeek API | 双模式：智能问答（流式SSE）+ 资料整理（结构化笔记） |
| **闪卡系统** | ✅ 真实 | 后端 API | FSRS算法、真实数据库存储、AI生成闪卡 |
| **学习计划** | ✅ 真实 | localStorage | 任务CRUD、周视图、时间分配图、持久化 |
| **资料库** | ✅ 真实 | 文件系统 API | 文件列表、PDF在线查看（翻页缩放）、Markdown渲染、AI分析 |
| **AI 搜索** | ✅ 真实 | 前端数据 | 20条可搜索内容、关键词高亮、类型筛选 |
| **核心理论** | ✅ 真实 | 前端数据 | 20个传播学&新闻学理论、详细解释、考试要点 |
| **热点专题** | ✅ 真实 | 前端数据 | 12个热点、考题角度、相关理论、答题框架 |
| **模拟考试** | ✅ 真实 | 前端数据 | 10道真实考题、计时器、自动评分、答案解析 |
| **错题本** | ✅ 真实 | localStorage | 错题CRUD、掌握度追踪、薄弱环节分析 |
| **院校情报** | ✅ 真实 | 前端数据 | 分数线、参考书、考情分析、4个tab |
| **学习社区** | ✅ 真实 | 前端数据 | 经验帖、点赞、标签筛选 |
| **设置** | ✅ 真实 | localStorage | 个人信息、目标分数、数据管理 |
| **侧边栏** | ✅ 真实 | API + localStorage | 动态Badge、考研倒计时 |

### API 状态

| 端点 | 方法 | 状态 | 说明 |
|------|------|------|------|
| `/api/health` | GET | ✅ | 健康检查 |
| `/api/chat` | POST | ✅ | SSE流式AI对话 |
| `/api/chat/models` | GET | ✅ | AI模型列表 |
| `/api/ai/organize` | POST | ✅ | AI资料整理（结构化笔记） |
| `/api/ai/analyze-file` | POST | ✅ | AI文件分析（提取知识点） |
| `/api/conversations` | GET | ✅ | 会话列表 |
| `/api/conversations/{id}/messages` | GET | ✅ | 会话消息 |
| `/api/flashcards/due` | GET | ✅ | 到期闪卡 |
| `/api/flashcards` | POST | ✅ | 创建闪卡 |
| `/api/flashcards/generate` | POST | ✅ | AI生成闪卡 |
| `/api/flashcards/{id}/review` | POST | ✅ | FSRS复习 |
| `/api/flashcards/stats` | GET | ✅ | 闪卡统计 |
| `/api/dashboard/stats` | GET | ✅ | 仪表盘统计 |
| `/api/files` | GET | ✅ | 文件列表 |
| `/api/files/content/{path}` | GET | ✅ | 文件内容（文本/PDF文本提取） |
| `/api/files/pdf/{path}` | GET | ✅ | PDF二进制流（前端渲染） |
| `/api/files/upload` | POST | ✅ | 文件上传 |
| `/api/files/{path}` | DELETE | ✅ | 文件删除 |

---

## 3. 技术栈

### 前端
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 + CSS变量深色主题
- react-markdown（Markdown渲染）
- react-pdf + pdfjs-dist（PDF在线查看）
- next/dynamic（PDF组件动态导入，避免SSR）
- useState + localStorage（状态管理）

### 后端
- FastAPI 0.136 + Uvicorn
- Python 3.14 + pydantic 2.13.4
- SQLite3（零配置数据库）
- httpx（AI API 调用）
- PyPDF2 3.0.1（PDF文本提取）

### AI
- DeepSeek V3/R1（真实流式调用）
- 多模型自动降级路由
- Token 优化：系统提示 30 token，max_tokens 2048，内容截断 6000 字符

---

## 4. 项目目录

```
ai-graduate-exam-os/
├── frontend-next/          # Next.js 前端
│   ├── src/app/page.tsx    # 主路由（14个页面组件）
│   ├── src/components/     # 15个页面组件
│   │   ├── AITutorPage.tsx        # AI导师（问答+资料整理）
│   │   ├── ResourceLibraryPage.tsx # 资料库（PDF查看+AI分析）
│   │   ├── PdfViewer.tsx          # PDF查看器组件
│   │   └── ...                    # 其他12个页面组件
│   ├── src/lib/api.ts      # API客户端（含organize/analyze/getPdfUrl）
│   ├── src/lib/types.ts    # 类型定义
│   └── src/lib/mock-data.ts # 用户信息、科目数据
│
├── backend/                # FastAPI 后端
│   ├── main.py             # 主入口（28+ API端点）
│   ├── database.py         # SQLite数据库
│   ├── config.py           # 配置管理
│   ├── services/ai_service.py  # AI服务（chat/organize/analyze）
│   └── .env                # 环境变量（DeepSeek API Key）
│
├── data/                   # 学习资料文件
│   ├── 深圳大学_新闻与传播_考研资料.md
│   └── uploads/            # 用户上传的文件（含PDF）
│
├── docs/                   # 技术文档
├── .gitignore
├── PROJECT_HANDOFF.md
└── TASKS.md
```

---

## 5. 启动方式

```bash
# 后端
cd backend
venv\Scripts\python.exe main.py
# → http://localhost:8000

# 前端
cd frontend-next
npm run dev
# → http://localhost:3000
```

---

## 6. 关键决策

- **SQLite** 作为开发数据库，零配置够用
- **localStorage** 用于学习计划、错题本、设置的持久化（无需用户认证）
- **react-markdown** 用于资料库的 Markdown 文件在线渲染
- **react-pdf** 用于 PDF 在线查看（动态导入避免 SSR 问题）
- **PyPDF2** 用于后端 PDF 文本提取（供 AI 分析）
- **文件系统** 直接存储资料文件，通过 API 管理
- **DeepSeek** 性价比最高的中文 AI 模型
- **FSRS** 比 SM-2 更科学的间隔复习算法
- **Token 优化** 精简系统提示词 + 限制 max_tokens + 内容截断

---

## 7. 下一步方向

详见 TASKS.md 的 P1/P2/P3 优先级列表。

核心方向：
1. 资料库增强（Word预览、图片预览、全文搜索）
2. AI 功能增强（图片问答、自动出题、智能搜索）
3. 模拟考试增强（题库、历史记录、AI出题）
4. 用户认证系统
5. RAG Pipeline（向量搜索）
