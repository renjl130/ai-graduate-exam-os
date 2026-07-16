# 佳乐考研 - 产品架构设计

## 一、系统总览

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Jiale Graduate                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Frontend (Next.js 15)                       │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│  │
│  │  │Dashboard │ │Knowledge│ │AI Tutor │ │Mock Exam│ │Spaced   ││  │
│  │  │  仪表盘  │ │  资料库  │ │ AI导师  │ │模拟考试 │ │Rep.复习 ││  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘│  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│  │
│  │  │Planner  │ │Wrong Q  │ │AI Search│ │School   │ │Community ││  │
│  │  │学习规划  │ │ 错题本  │ │ AI搜索  │ │院校情报 │ │ 社区    ││  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘│  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    API Gateway (FastAPI)                       │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐ │  │
│  │  │ REST API    │  │ WebSocket    │  │ Background Tasks     │ │  │
│  │  │ CRUD Ops    │  │ Real-time    │  │ Celery Workers       │ │  │
│  │  └─────────────┘  └──────────────┘  └──────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    AI Agent System                            │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │              Coordinator Agent (LangGraph)               │  │  │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │  │  │
│  │  │  │Knowledge │ │Search    │ │Tutor     │ │Exam      │   │  │  │
│  │  │  │Agent     │ │Agent     │ │Agent     │ │Agent     │   │  │  │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │  │  │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │  │  │
│  │  │  │Planner   │ │Wrong Q   │ │School    │ │Review    │   │  │  │
│  │  │  │Agent     │ │Agent     │ │Agent     │ │Agent     │   │  │  │
│  │  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    Data Layer                                 │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │  │
│  │  │PostgreSQL│ │Redis     │ │Milvus    │ │S3/MinIO  │         │  │
│  │  │结构化数据 │ │缓存/队列 │ │向量数据库│ │文件存储  │         │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    AI/ML Services                             │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │  │
│  │  │DeepSeek  │ │Qwen      │ │Gemini    │ │Ollama    │         │  │
│  │  │API       │ │API       │ │API       │ │Local     │         │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                      │  │
│  │  │bge-m3    │ │bge-rerank│ │PaddleOCR │                      │  │
│  │  │Embedding │ │Reranker  │ │OCR       │                      │  │
│  │  └──────────┘ └──────────┘ └──────────┘                      │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## 二、模块架构

### 模块1：智能资料库 (Knowledge Base)

```
Upload → Parse → Chunk → Embed → Vector DB → Knowledge Retrieval
  │        │       │       │         │              │
  │        │       │       │         │              └─ RAG Query
  │        │       │       │         └─ Milvus/ChromaDB
  │        │       │       └─ bge-m3
  │        │       └─ 512 tokens, 64 overlap
  │        └─ PDF/Word/PPT/Image/Video/Audio
  └─ Drag & Drop / Link / Bulk Upload
```

### 模块2：AI 搜索引擎

```
Query → Intent Recognition → Hybrid Search → Rerank → Results
         │                    │              │          │
         ├─ Keyword           ├─ BM25        └─ bge    ├─ Notes
         ├─ Semantic          ├─ Vector                 ├─ Papers
         └─ Filter            └─ Tag                    ├─ Explanations
                                                        └─ Recommendations
```

### 模块3：AI 院校情报系统

```
Target School → Crawler → Data Aggregation → Analysis → Report
                  │            │                │          │
                  ├─ Scores    ├─ Statistics    ├─ AI      ├─ Difficulty
                  ├─ Books     ├─ Trends        ├─ Compare └─ Suggestions
                  └─ Posts     └─ Faculty       └─ Predict
```

### 模块4：AI 学习规划系统

```
Profile + Goal + Timeline → Planner Agent → Schedule
         │                        │              │
         ├─ Current Level         ├─ Daily       ├─ Adaptive
         ├─ Weak Points           ├─ Weekly      ├─ Milestone
         └─ Available Time        └─ Phase       └─ Review Loop
```

### 模块5：AI 导师系统

```
Question → Router → Model Selection → Response
           │           │                │
           ├─ Simple   ├─ Small Model   ├─ Explanation
           ├─ Complex  ├─ Large Model   ├─ Examples
           └─ RAG      └─ Local Model   ├─ Diagrams
                                        └─ Related Topics
```

## 三、技术栈详情

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | Next.js 15 + React 19 | SSR, RSC, App Router, 最佳性能 |
| UI | Tailwind CSS + Shadcn/ui | 快速开发, 高度可定制 |
| Animation | Framer Motion | 流畅动画, 手势支持 |
| Backend | FastAPI | 异步, 高性能, 自动文档 |
| Database | PostgreSQL + Supabase | 结构化数据, 实时订阅 |
| Vector DB | Milvus | 高性能向量检索 |
| Cache | Redis | 会话缓存, 任务队列 |
| Queue | Celery | 异步任务处理 |
| Storage | S3 / Supabase Storage | 文件存储 |
| AI Models | DeepSeek / Qwen / Gemini | 免费/低成本, 中文优化 |
| Embedding | bge-m3 | 中文优化, 多语言 |
| OCR | PaddleOCR | 中文OCR最优 |
| Agent | LangGraph | 复杂工作流编排 |
| Deploy | Vercel + Railway | 前端CDN, 后端容器化 |
</parameter>
</write_to_file>