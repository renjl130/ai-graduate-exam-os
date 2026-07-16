# Personal Study OS — 项目记忆

> 最后更新：2026-06-09
> 用途：新 Claude Code 会话启动时读取此文件即可无缝接管项目

---

## 一、项目愿景

**不是做一个能聊天的考研AI，而是做一个能管理、组织、调用、关联、复习全部考研知识的"第二大脑"。**

核心理念：知识库驱动，非聊天驱动。系统中心是 Knowledge Base，不是 Chat Box。

---

## 二、产品定位

**Personal Study OS — 佳乐考研学习平台**

- 单人使用，不考虑多用户/商业化/支付/会员/权限
- 三大学科：新传（334/440）、政治（101）、英语（204）
- 目标院校：深圳大学 新闻与传播 MJC
- 考研日期：2026-12-20

---

## 三、技术架构

```
前端：Next.js 15 + React 19 + TypeScript + Tailwind CSS 4
后端：FastAPI 0.136 + Uvicorn
数据库：SQLite（原生 sqlite3，非 ORM）
AI：DeepSeek V3/R1（真实 API，SSE 流式）
认证：自实现 JWT（无外部依赖）
PDF：PyPDF2 3.0.1
算法：FSRS 间隔复习（自实现）
```

### 启动方式

```bash
# 后端
cd backend && python main.py
# → http://localhost:8000

# 前端
cd frontend-next && npm run dev
# → http://localhost:3000

# 知识库初始化（首次运行）
cd backend && python seed_knowledge.py
```

### 环境变量

`backend/.env` 需配置：
```
DEEPSEEK_API_KEY=sk-xxx
DEEPSEEK_API_BASE=https://api.deepseek.com
JWT_SECRET=your-secret-key
```

---

## 四、目录结构

```
ai-graduate-exam-os/
├── backend/
│   ├── main.py              # 主入口（50+ API 端点）
│   ├── database.py          # SQLite 连接 + 18 张表定义
│   ├── config.py            # 环境变量加载
│   ├── auth.py              # JWT 认证（自实现，无外部依赖）
│   ├── search_engine.py     # FTS5 全文搜索
│   ├── seed_questions.py    # 题库种子数据（85 道选择题）
│   ├── seed_knowledge.py    # 知识库种子脚本（从 data/*.md 提取）
│   ├── services/
│   │   └── ai_service.py    # AI 服务（DeepSeek/OpenRouter/Ollama）
│   └── exam_os.db           # SQLite 数据库文件
│
├── frontend-next/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx     # 主路由（18 个页面组件切换）
│   │   │   └── layout.tsx   # 根布局
│   │   ├── components/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── AiTutorPage.tsx
│   │   │   ├── FlashcardsPage.tsx
│   │   │   ├── StudyPlanPage.tsx
│   │   │   ├── ResourceLibraryPage.tsx
│   │   │   ├── AISearchPage.tsx
│   │   │   ├── CoreTheoriesPage.tsx    # ⚠️ 硬编码，待改为知识库驱动
│   │   │   ├── HotTopicsPage.tsx       # ⚠️ 硬编码，待改为知识库驱动
│   │   │   ├── MockExamPage.tsx
│   │   │   ├── WrongQuestionsPage.tsx
│   │   │   ├── SchoolInfoPage.tsx      # ⚠️ 硬编码
│   │   │   ├── EnglishPage.tsx         # ⚠️ 硬编码，待改为知识库驱动
│   │   │   ├── PoliticsPage.tsx        # ⚠️ 硬编码，待改为知识库驱动
│   │   │   ├── VocabularyPage.tsx      # ⚠️ 硬编码
│   │   │   ├── KnowledgeBrowserPage.tsx  # ✅ 新增：知识库浏览器
│   │   │   ├── KnowledgeGraphPage.tsx    # ✅ 新增：知识图谱可视化
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── AuthPage.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   └── lib/
│   │       ├── api.ts        # API 客户端（JWT + SSE + 重试）
│   │       ├── auth-context.tsx
│   │       ├── types.ts
│   │       └── mock-data.ts
│   └── package.json
│
├── data/                     # 学习资料（14 个 Markdown，约 190KB）
│   ├── 传播学教程_完整知识点.md      # 40KB，最详细
│   ├── 新闻学概论_完整知识点.md      # 19KB
│   ├── 新闻采访与写作_完整知识点.md  # 16KB
│   ├── 中国新闻传播史_完整知识点.md  # 16KB
│   ├── 外国新闻传播史_完整知识点.md  # 14KB
│   ├── 深圳大学_新闻与传播_考研资料.md
│   ├── 网络传播与新媒体_完整知识点.md
│   ├── 广告学概论_完整知识点.md
│   ├── 公共关系学_完整知识点.md
│   ├── 新媒体热点专题_完整知识点.md
│   ├── 新闻评论_完整知识点.md
│   ├── 新闻编辑学_完整知识点.md
│   ├── 传播学笔记_merged_1_AI整理.md
│   └── 新媒体热点专题_完整知识点_AI整理.md
│
├── PROJECT_AUDIT.md          # 项目审计报告
├── KNOWLEDGE_ARCHITECTURE.md # 知识库架构设计
├── IMPLEMENT_PLAN.md         # 实施计划
└── MEMORY.md                 # 本文件
```

---

## 五、数据库结构（18 张表）

### 原有表（10 张）

| 表名 | 用途 | 核心字段 |
|------|------|----------|
| `users` | 用户 | id, email, username, hashed_password, target_school, target_major |
| `conversations` | AI 对话会话 | id, user_id, title, subject, message_count |
| `messages` | 对话消息 | id, conversation_id, role, content, model, provider |
| `flashcards` | 闪卡 | id, user_id, front, back, subject, topic, stability, due_date, review_count |
| `flashcard_reviews` | 闪卡复习记录 | id, card_id, rating |
| `wrong_questions` | 错题 | id, user_id, content, subject, topic, answer, user_answer, mastery |
| `study_plans` | 学习计划 | id, user_id, target_date, daily_plan |
| `study_records` | 学习记录 | id, user_id, activity_type, subject, duration_minutes, score |
| `exams` | 模拟考试 | id, user_id, subject, score, accuracy, questions, answers |
| `posts` | 社区帖子 | id, user_id, title, content, tags, likes |

### 新增表（8 张）

| 表名 | 用途 | 核心字段 |
|------|------|----------|
| `subjects` | 学科 | id, name, code, icon, color |
| `chapters` | 章节 | id, subject_id, parent_id, name, level |
| `knowledge_points` | 知识点（核心） | id, subject_id, chapter_id, parent_id, title, content, importance, frequency, tags, exam_tips, answer_template, memory_tips, ai_explanation, mastery |
| `knowledge_relations` | 知识点关系 | id, source_id, target_id, relation_type (related/contrast/evolution/prerequisite/includes), description, weight |
| `exam_questions` | 真题 | id, knowledge_point_id, subject, year, school, question_type, content, answer, scoring_points, answer_framework |
| `ai_summaries` | AI 总结缓存 | id, knowledge_point_id, summary_type, content, model |
| `import_jobs` | 导入任务 | id, filename, file_path, file_type, status, knowledge_count |
| `study_sessions` | 学习会话 | id, user_id, knowledge_point_id, activity_type, start_time, duration_seconds |

### 搜索相关表（已有）

| 表名 | 用途 |
|------|------|
| `search_index` | 搜索内容索引 |
| `search_fts` | FTS5 全文搜索虚拟表 |
| `question_bank` | 题库（85 道选择题种子数据） |

---

## 六、API 结构（50+ 端点）

### 认证
- `POST /api/auth/register` — 注册
- `POST /api/auth/login` — 登录
- `GET /api/auth/me` — 当前用户
- `PUT /api/auth/me` — 更新用户

### AI 对话
- `POST /api/chat` — SSE 流式对话
- `GET /api/chat/models` — 模型列表
- `GET /api/conversations` — 会话列表
- `GET /api/conversations/{id}/messages` — 会话消息
- `DELETE /api/conversations/{id}` — 删除会话

### 闪卡
- `GET /api/flashcards/due` — 到期闪卡
- `POST /api/flashcards` — 创建闪卡
- `POST /api/flashcards/generate` — AI 生成闪卡
- `POST /api/flashcards/{id}/review` — FSRS 复习
- `GET /api/flashcards/stats` — 闪卡统计

### 错题
- `GET /api/wrong-questions` — 错题列表
- `POST /api/wrong-questions` — 添加错题
- `PUT /api/wrong-questions/{id}` — 更新错题
- `DELETE /api/wrong-questions/{id}` — 删除错题
- `GET /api/wrong-questions/analysis` — 错题分析

### 学习计划
- `GET /api/study-plans` — 计划列表
- `POST /api/study-plans` — 创建计划
- `PUT /api/study-plans/{id}/toggle` — 切换状态
- `DELETE /api/study-plans/{id}` — 删除计划

### 考试
- `GET /api/exams` — 考试历史
- `POST /api/exams/save` — 保存考试
- `POST /api/exam/generate` — AI 生成试卷

### 文件
- `GET /api/files` — 文件列表
- `GET /api/files/content/{path}` — 文件内容
- `GET /api/files/pdf/{path}` — PDF 文件
- `POST /api/files/upload` — 上传文件
- `DELETE /api/files/{path}` — 删除文件

### 搜索
- `GET /api/search` — 全文搜索
- `GET /api/search/stats` — 搜索统计

### 仪表盘
- `GET /api/dashboard/stats` — 仪表盘统计

### AI 功能
- `POST /api/ai/organize` — 资料整理
- `POST /api/ai/analyze-file` — 文件分析
- `POST /api/ai/organize-file` — 文件整理
- `POST /api/study-plan/generate` — AI 学习计划

### 知识库（新增）
- `GET /api/knowledge/subjects` — 学科列表
- `POST /api/knowledge/subjects` — 创建学科
- `GET /api/knowledge/subjects/{id}/chapters` — 学科下章节
- `POST /api/knowledge/chapters` — 创建章节
- `GET /api/knowledge/chapters/{id}/points` — 章节下知识点
- `GET /api/knowledge/points/{id}` — 知识点详情（含关系、真题、子知识点）
- `GET /api/knowledge/points/{id}/children` — 子知识点
- `GET /api/knowledge/points/{id}/relations` — 知识关系
- `GET /api/knowledge/points/{id}/exams` — 关联真题
- `POST /api/knowledge/points` — 创建知识点
- `PUT /api/knowledge/points/{id}` — 更新知识点
- `POST /api/knowledge/relations` — 创建关系
- `GET /api/knowledge/search` — 搜索知识点
- `GET /api/knowledge/graph` — 知识图谱数据（nodes + edges）
- `POST /api/ai/knowledge-explain` — AI 讲解知识点（detailed/exam_focused/concise）
- `POST /api/ai/answer-helper` — AI 答题助手
- `POST /api/ai/wrong-analysis` — AI 错题分析
- `POST /api/ai/study-plan` — AI 学习规划
- `POST /api/knowledge/exam-questions` — 创建真题
- `GET /api/knowledge/exam-questions` — 真题列表

---

## 七、页面结构

### 侧边栏导航（24 项）

1. 仪表盘 → `DashboardPage`
2. 📚 知识库 → `KnowledgeBrowserPage`
3. 🕸️ 知识图谱 → `KnowledgeGraphPage`
4. AI 导师 → `AiTutorPage`
5. 资料库 → `ResourceLibraryPage`
6. 闪卡复习 → `FlashcardsPage`
7. 学习计划 → `StudyPlanPage`
8. 模拟考试 → `MockExamPage`
9. 错题本 → `WrongQuestionsPage`
10. AI 搜索 → `AISearchPage`
11. 核心理论 → `CoreTheoriesPage`（知识库驱动）
12. 热点专题 → `HotTopicsPage`（知识库驱动）
13. 院校情报 → `SchoolInfoPage`（硬编码）
14. 英语专项 → `EnglishPage`（知识库驱动）
15. 政治专项 → `PoliticsPage`（知识库驱动）
16. 词汇打卡 → `VocabularyPage`
17. 📥 文档导入 → `DocumentImportPage`
18. 🔍 智能搜索 → `VectorSearchPage`
19. 📝 知识复习 → `KnowledgeReviewPage`
20. 🎯 个性化推荐 → `RecommendationsPage`
21. 📊 考试预测 → `ExamPredictionPage`
22. 👥 学习社区 → `CommunityPage`（新增）
23. 设置 → `SettingsPage`

### 页面数据源

| 页面 | 数据源 | 状态 |
|------|--------|------|
| 仪表盘 | API `/api/dashboard/stats` | ✅ 真实 |
| 知识库 | API `/api/knowledge/*` | ✅ 真实 |
| 知识图谱 | API `/api/knowledge/graph` | ✅ 真实 |
| AI 导师 | DeepSeek SSE | ✅ 真实 |
| 资料库 | 文件系统 API | ✅ 真实 |
| 闪卡 | API `/api/flashcards/*` | ✅ 真实 |
| 学习计划 | API `/api/study-plans` | ✅ 真实 |
| 模拟考试 | AI 生成 + 题库 API | ✅ 真实 |
| 错题本 | API `/api/wrong-questions` | ✅ 真实 |
| 核心理论 | API `/api/knowledge/chapters/.../points` | ✅ 知识库驱动 |
| 热点专题 | API `/api/knowledge/chapters/.../points` | ✅ 知识库驱动 |
| 英语专项 | API `/api/knowledge/chapters/.../points` | ✅ 知识库驱动 |
| 政治专项 | API `/api/knowledge/chapters/.../points` | ✅ 知识库驱动 |
| 词汇打卡 | API `/api/vocabulary/*` | ✅ 真实（291词） |
| 院校情报 | 前端硬编码深大数据 | ⚠️ 待迁移 |
| 文档导入 | API `/api/knowledge/import` | ✅ 真实 |
| 智能搜索 | API `/api/knowledge/vector-search` | ✅ 真实 |
| 知识复习 | API `/api/knowledge/reviews/*` | ✅ 真实 |
| 个性化推荐 | API `/api/recommendations/*` | ✅ 真实 |
| 考试预测 | API `/api/predictions/*` | ✅ 真实 |
| 学习社区 | API `/api/posts/*` | ✅ 真实 |
| 设置 | localStorage | ✅ 本地 |

---

## 八、AI 模块结构

### AI 服务 (`backend/services/ai_service.py`)

- **Provider 优先级**：DeepSeek > OpenRouter > Ollama
- **默认模型**：`deepseek-chat`（DeepSeek V3）
- **复杂模型**：`deepseek-reasoner`（DeepSeek R1）
- **流式响应**：SSE 格式，逐 chunk 返回
- **会话存储**：内存中，每会话保留最近 20 轮
- **Token 优化**：系统提示 30 token，max_tokens 2048，内容截断 6000 字符

### Prompt 结构

**AI 导师系统提示**：
```
你是考研AI导师「小研」，帮助新闻与传播考研学生备考。回答要求：中文、Markdown格式、准确有条理、不确定时诚实说明。
```

**AI 知识点讲解**（三种风格）：
- `detailed`：概念定义 → 理论背景 → 核心内容 → 典型案例 → 考试要点 → 答题方式
- `concise`：核心概念 + 考试要点，300 字以内
- `exam_focused`：常见题型 → 答题框架 → 得分要点 → 易错点 → 高分技巧

**AI 答题助手**：标准答案 → 得分点 → 答题框架 → 评分标准 → 高分技巧

**AI 错题分析**：错误原因 → 知识漏洞 → 相关知识点 → 推荐复习计划

**AI 学习规划**：总体规划 → 阶段一/二/三 → 每日任务 → 每科时间分配 → 关键时间节点

---

## 九、知识库当前数据

| 类型 | 数量 |
|------|------|
| 学科 | 3（新传、政治、英语） |
| 章节 | 39（新传 21 + 政治 11 + 英语 7） |
| 知识点 | 289（新传 263 + 政治 17 + 英语 9） |
| 真题 | 4 |
| 知识关系 | 0（待修复） |
| 题库 | 85 道选择题 |
| 搜索索引 | 20 条 |

### 知识点分布

**新传（263 个）**：
- 传播学教程：32 个
- 新闻学概论：24 个
- 新闻采访与写作：25 个
- 新闻编辑学：18 个
- 新闻评论：25 个
- 网络传播与新媒体：23 个
- 新媒体热点专题：28 个
- 广告学概论：28 个
- 公共关系学：10 个
- 中国新闻传播史：24 个
- 外国新闻传播史：20 个
- 其他：6 个

**政治（17 个）**：马克思主义哲学（9）+ 毛泽东思想（2）+ 习近平新时代（3）+ 史纲（2）+ 思修法基（1）

**英语（9 个）**：语法（4）+ 阅读（2）+ 作文（2）+ 词汇（1）

---

## 十、已知问题

| 问题 | 严重度 | 说明 |
|------|--------|------|
| 知识关系较少 | P2 | 仅创建 14 条关系 |
| 核心理论页面已改为知识库驱动 | ✅ | 从 `/api/knowledge/chapters/ch_xc_cbs_effect/points` 读取 |
| 热点专题页面已改为知识库驱动 | ✅ | 从 `/api/knowledge/chapters/ch_xc_wl_newmedia/points` 读取 |
| 英语页面已改为知识库驱动 | ✅ | 从英语各章节 API 读取（已修复 data.knowledge_points） |
| 政治页面已改为知识库驱动 | ✅ | 从政治各章节 API 读取（已修复 data.knowledge_points） |
| 词汇打卡有数据 | ✅ | 291 个词汇，可通过 seed 接口初始化 |
| 院校情报硬编码 | P2 | 深大数据写死在前端 |
| models.py 未使用 | P3 | 定义了 SQLAlchemy ORM 但实际用原生 sqlite3 |
| 学习社区页面已集成 | ✅ | 已添加到侧边栏和路由 |

---

## 十、目标完成记录（2026-06-10）

### ✅ 目标 1：增加更多知识关系
- 拆分效果研究理论为 7 个独立知识点
- 创建 14 条知识关系（从 4 条增加）
- 关系类型包括：对比、发展、相关

### ✅ 目标 2：文档导入系统
- 创建 `document_importer.py` 模块
- 支持 PDF/Word/MD/TXT 文件导入
- 自动解析章节、判断重要度、提取标签
- 添加 API 端点：`POST /api/knowledge/import` 和 `GET /api/knowledge/import/history`

### ✅ 目标 3：向量搜索
- 创建 `vector_search.py` 模块
- 基于 TF-IDF 和余弦相似度的实现
- 支持混合搜索（向量 + 关键词）
- 添加 API 端点：`GET /api/knowledge/vector-search`

### ✅ 目标 4：复习调度系统
- 创建 `knowledge_reviews` 表
- 实现 FSRS 间隔复习算法
- 添加 API 端点：
  - `GET /api/knowledge/reviews/due` - 获取需要复习的知识点
  - `POST /api/knowledge/reviews/{knowledge_point_id}` - 复习知识点
  - `GET /api/knowledge/reviews/stats` - 复习统计

### ✅ 目标 5：前端集成
- 创建 `DocumentImportPage.tsx` - 文档导入界面
- 创建 `VectorSearchPage.tsx` - 智能搜索界面
- 创建 `KnowledgeReviewPage.tsx` - 知识复习界面
- 创建 `RecommendationsPage.tsx` - 个性化推荐界面
- 创建 `ExamPredictionPage.tsx` - 考试预测界面
- 更新侧边栏导航，添加新页面入口

### ✅ 目标 6：学习时长追踪
- 创建 `StudyTimer.tsx` 组件
- 实现自动计时、暂停、重置功能
- 添加学习会话 API：
  - `POST /api/study-sessions/start` - 开始学习会话
  - `POST /api/study-sessions/{session_id}/stop` - 停止学习会话
  - `GET /api/study-sessions/stats` - 学习统计

### ✅ 目标 7：个性化学习推荐
- 创建 `recommendation.py` 模块
- 基于掌握度、错题、复习到期的推荐
- 添加推荐 API：
  - `GET /api/recommendations` - 获取推荐
  - `GET /api/recommendations/subject/{subject_id}` - 学科推荐
  - `GET /api/recommendations/weak-points` - 薄弱知识点
  - `GET /api/recommendations/study-plan` - 学习计划

### ✅ 目标 8：考试预测
- 创建 `exam_prediction.py` 模块
- 基于学习数据的分数预测
- 添加预测 API：
  - `GET /api/predictions/score` - 预测分数
  - `GET /api/predictions/trend` - 学习趋势

---

## 十一、关键决策记录

| 决策 | 原因 |
|------|------|
| SQLite 而非 PostgreSQL | 单人使用，零配置够用 |
| 原生 sqlite3 而非 ORM | 简单直接，无额外依赖 |
| 自实现 JWT 而非 python-jose | 减少依赖，功能够用 |
| DeepSeek 而非 GPT | 中文能力强，性价比高 |
| FSRS 而非 SM-2 | 更科学的间隔复习算法 |
| localStorage 存学习计划 | 无需用户认证即可持久化 |
| 文件系统存资料 | 简单直接，通过 API 管理 |
| Canvas 而非 D3.js 知识图谱 | 无额外依赖，轻量级 |
| 单页面 Tab 切换而非路由 | 简化开发，用户体验流畅 |

---

## 十二、下阶段路线图

### 优先级 P0（立即执行）

1. **知识关系修复** — ✅ 已修复，创建 4 条关系（议程设置↔沉默的螺旋、使用与满足↔议程设置等）
2. **核心理论页面改为知识库驱动** — ✅ 已完成，从 `/api/knowledge/chapters/ch_xc_cbs_effect/points` 读取
3. **热点专题页面改为知识库驱动** — ✅ 已完成，从 `/api/knowledge/chapters/ch_xc_wl_newmedia/points` 读取
4. **英语/政治页面与知识库联动** — ✅ 已完成，从各章节 API 读取数据

### 优先级 P1（近期）

5. **文档导入系统** — PDF/Word/MD/TXT → 自动解析 → 知识点 → 知识树
6. **向量搜索** — Embedding + 语义检索
7. **复习调度** — 知识点级别的 FSRS 调度

### 优先级 P2（中期）

8. **学习时长追踪** — 前端自动计时
9. **个性化学习推荐** — 基于掌握度和错题的推荐
10. **考试预测** — 基于学习数据的分数预测

---

## 十三、开发注意事项

1. **不要修改 `backend/database.py` 的 `init_db()` 函数结构** — 新增表直接追加
2. **前端组件使用 `getToken()` 获取认证头** — 格式为 `{ Authorization: Bearer ${token} }`
3. **API 基础地址**：`http://localhost:8000`（前端硬编码在多处）
4. **数据库文件**：`backend/exam_os.db`（SQLite，可直接用 DB Browser 查看）
5. **知识库种子脚本**：`backend/seed_knowledge.py`（会跳过已有数据，可安全重复运行）
6. **前端构建**：`cd frontend-next && npx next build`（TypeScript 严格模式）
7. **深色主题**：背景 `#0B0F1A`，卡片 `rgba(255,255,255,0.05)`，边框 `rgba(255,255,255,0.08)`
8. **样式风格**：iOS 26 毛玻璃风格，圆角 16px，渐变强调色 `#3B82F6 → #8B5CF6`

---

## 十四、文件修改记录（2026-06-09）

### 新增文件
- `backend/seed_knowledge.py` — 知识库种子脚本
- `frontend-next/src/components/KnowledgeBrowserPage.tsx` — 知识库浏览器
- `frontend-next/src/components/KnowledgeGraphPage.tsx` — 知识图谱可视化
- `PROJECT_AUDIT.md` — 项目审计报告
- `KNOWLEDGE_ARCHITECTURE.md` — 知识库架构设计
- `IMPLEMENT_PLAN.md` — 实施计划
- `MEMORY.md` — 本文件

### 修改文件
- `backend/database.py` — 新增 8 张表 + 索引
- `backend/main.py` — 新增 20+ API 端点 + Pydantic 模型
- `frontend-next/src/app/page.tsx` — 集成新组件
- `frontend-next/src/components/Sidebar.tsx` — 新增导航项
- `frontend-next/src/components/AiTutorPage.tsx` — 修复 ChatMessage 类型
- `frontend-next/src/components/ResourceLibraryPage.tsx` — 修复 getHeaders 类型
- `frontend-next/src/components/WrongQuestionsPage.tsx` — 修复 WrongQuestion 类型

---

## 十五、目标完成记录（2026-06-10 续）

### ✅ 目标 9：测试所有功能
- 后端服务器启动成功
- 所有 API 端点测试通过：
  - 知识复习统计：返回 0 条（新用户无复习记录）
  - 个性化推荐：返回 5 个推荐知识点
  - 考试预测：预测分数 50.0，置信度 0.0（无学习数据）
  - 学习计划：生成 7 天学习计划
  - 学习趋势：返回 30 天趋势数据
  - 向量搜索：返回 10 个结果，相似度 0.06-0.65
- 修复效果研究章节归属问题（7 个知识点从 ch_xc_cbs_base 移动到 ch_xc_cbs_effect）
- 清理空的 study_app.db 文件

### ✅ 目标 10：优化用户体验
- 修复效果研究知识点章节归属问题
- 创建 fix_effect_chapter.py 脚本修复数据
- 验证所有 API 返回正确数据
- 前端构建成功，所有页面正常

### ✅ 目标 11：数据迁移
- 数据库统计：
  - 知识要点：295 个
  - 知识关系：14 条
  - 学科：3 个
  - 章节：39 个
  - 知识复习：0 条（新功能，待用户使用）
- 数据完整性验证通过

### ✅ 目标 12：性能优化
- 向量搜索性能：55.56ms（10 个结果）
- 推荐系统性能：0.99ms（5 个推荐）
- 考试预测性能：0.64ms
- 所有系统性能优秀，无需进一步优化

---

## 十六、下次修改注意事项

### 1. 数据库相关

**重要**：
- 数据库文件：`backend/exam_os.db`（SQLite）
- 不要使用 `study_app.db`，已删除
- 新增表直接追加到 `database.py` 的 `init_db()` 函数
- 知识库种子脚本：`backend/seed_knowledge.py`（会跳过已有数据，可安全重复运行）

**注意**：
- 效果研究理论已在 `ch_xc_cbs_effect` 章节（7 个知识点）
- 不要将效果研究知识点移动到其他章节
- 知识关系使用模糊匹配（`find_point_id()` 函数）

### 2. 前端相关

**重要**：
- 前端使用 Next.js 15 + React 19 + TypeScript + Tailwind CSS 4
- 所有页面组件在 `frontend-next/src/components/` 目录
- 主路由在 `frontend-next/src/app/page.tsx`（25 个页面）

**注意**：
- 新增页面需要：
  1. 创建组件文件
  2. 在 `page.tsx` 中添加 import 和 case
  3. 在 `Sidebar.tsx` 中添加导航项
- 前端构建：`cd frontend-next && npm run build`
- 前端开发：`cd frontend-next && npm run dev`（默认端口 3000，可指定 `-p 3001`）

### 3. 后端相关

**重要**：
- 后端使用 FastAPI + Uvicorn + SQLite
- 所有 API 端点在 `backend/main.py`
- 认证使用自实现 JWT（`backend/auth.py`）

**注意**：
- 新增 API 端点需要：
  1. 在 `main.py` 中添加路由函数
  2. 使用 `get_current_user()` 获取认证用户
  3. 使用 `get_db()` 获取数据库连接
- 后端启动：`cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000`
- 数据库使用原生 sqlite3，不是 SQLAlchemy ORM

### 4. 知识库相关

**重要**：
- 知识库结构：学科 → 章节 → 知识点
- 知识关系类型：contrast（对比）、evolution（发展）、related（相关）、prerequisite（前置）、includes（包含）
- 向量搜索使用 TF-IDF + 余弦相似度（`backend/vector_search.py`）

**注意**：
- 新增知识点使用 `seed_knowledge.py` 脚本
- 知识关系使用模糊匹配，不要使用精确匹配
- 效果研究理论已拆分为 7 个独立知识点

### 5. 性能相关

**重要**：
- 向量搜索性能：55.56ms（10 个结果）
- 推荐系统性能：0.99ms（5 个推荐）
- 考试预测性能：0.64ms

**注意**：
- 所有系统性能优秀，无需进一步优化
- 如需优化，可考虑：
  1. 向量搜索：使用更高效的索引结构
  2. 推荐系统：缓存推荐结果
  3. 考试预测：缓存预测结果

### 6. 测试相关

**重要**：
- 所有 API 端点已测试通过
- 前端构建成功
- 数据完整性验证通过

**注意**：
- 测试 API 需要先登录获取 token
- 测试账号：`test@test.com` / `test123`
- 测试命令：`curl -H "Authorization: Bearer <token>" http://localhost:8000/api/...`

### 7. 部署相关

**重要**：
- 前端端口：3000（或 3001，避免冲突）
- 后端端口：8000
- 数据库文件：`backend/exam_os.db`

**注意**：
- 启动顺序：先启动后端，再启动前端
- 环境变量：`backend/.env`（DeepSeek API Key 等）
- CORS 配置：`CORS_ORIGINS=http://localhost:3000,http://localhost:3001`

---

## 十七、修复记录（2026-06-12）

### ✅ 修复 1：知识库页面数据字段不匹配
- **问题**：EnglishPage、PoliticsPage、HotTopicsPage、CoreTheoriesPage 使用 `data.points` 读取知识点
- **原因**：API 返回 `data.knowledge_points` 而非 `data.points`
- **修复**：改为 `data.knowledge_points || data.points || []`
- **影响**：4 个页面的知识点列表现在能正确显示

### ✅ 修复 2：学习社区页面集成
- **问题**：CommunityPage 组件存在但未在侧边栏和路由中注册
- **修复**：
  - 在 `Sidebar.tsx` 添加社区导航项（👥 学习社区）
  - 在 `page.tsx` 添加 CommunityPage import 和路由 case
  - 添加 community SVG 图标

### ✅ 验证：所有 API 端点正常
- 健康检查、认证、仪表盘、知识库、知识图谱、推荐、预测、向量搜索、学习会话、词汇、闪卡、错题、搜索、题库、考试、文档导入 — 全部通过

### ✅ 验证：前端构建成功
- `next build` 编译通过，无 TypeScript 错误
- 所有 25 个页面组件正常加载
