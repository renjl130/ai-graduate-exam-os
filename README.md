# 研途 AI · 考研学习操作系统

> 以“计划 → 专注 → 复习 → 检测 → 复盘”为核心闭环的个人 AI 考研工作台。

![Version](https://img.shields.io/badge/version-4.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.11+-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

## 本轮体验升级

- **学习驾驶舱**：将下一步行动、今日任务、专注时长、复习队列和学习健康度集中到首页。
- **分组导航**：23 个功能按学习阶段分组，桌面端可收起，移动端使用抽屉和底部导航。
- **全局功能搜索**：按 `Ctrl/Cmd + K` 或 `/`，可快速搜索并打开任意功能。
- **全局专注计时器**：跨页面持续计时，支持暂停、继续、完成记录与异常恢复。
- **学习计划双层存储**：后端作为主数据源，localStorage 作为离线缓存，增删改和 AI 计划会自动同步。
- **统一个人目标**：考试日期、每日目标、默认专注时长和目标分数由设置页统一管理。
- **性能与稳定性**：业务页面按需加载，首屏 First Load JS 从约 210 kB 降至约 125 kB；页面级错误隔离、加载骨架和离线降级已补齐。
- **自适应启动端口**：3000/8000 被占用时自动寻找下一可用端口，并自动配置前后端地址与 CORS。
- **100% 缩放可完整浏览**：主内容区改为视口内独立纵向滚动，顶栏保持固定，桌面端与移动端均不再依赖缩小浏览器比例。
- **综合知识库补全**：知识库扩充至 3 学科、44 章节、642 个知识点，所有章节均有内容。
- **642 点深度重整**：每个知识点独立提供讲义、关键要点、案例应用、易错辨析、专项训练、自测题、考试提示、答题结构和记忆链，并通过全字段质量校验。

---

## ✨ 核心特性

### 🤖 AI 智能学习
- **AI 导师对话**：基于 DeepSeek 的流式对话，支持多轮追问
- **智能出题**：AI 自动生成模拟试题，覆盖各科目考点
- **资料整理**：AI 自动整理学习笔记，提取核心知识点
- **学习计划**：AI 生成个性化学习计划

### 📚 学习工具
- **闪卡复习**：FSRS 间隔重复算法，科学安排复习节奏
- **模拟考试**：真实考题模拟，自动评分与解析
- **错题本**：智能错题管理，薄弱环节分析
- **资料库**：支持 PDF/Markdown 在线查看，AI 分析

### 📊 数据追踪
- **学习仪表盘**：实时统计学习时长、进度、成绩
- **连续打卡**：学习 streak 追踪
- **科目分析**：各科目掌握度可视化

### 🔒 用户系统
- **JWT 认证**：安全的用户注册/登录
- **数据隔离**：每个用户独立数据空间
- **个性化设置**：目标院校、考试日期、学习偏好

### 🧠 知识库系统（新增）
- **结构化知识库**：学科 → 章节 → 知识点三级结构，现有 44 章、642 个知识点、0 个空章节
- **三科系统覆盖**：新传 24 章 / 435 点，政治 12 章 / 125 点，英语二 8 章 / 82 点
- **十层学习结构**：每个知识点均包含摘要、深度讲义、关键要点、案例与应用、易错辨析、专项训练、自测题、考试提示、答题模板和速记链
- **分型理解与训练**：按 44 个章节画像、38 类知识形态生成对应的理解维度和训练流程，传播模式、新闻实务、研究方法、政治史、英语阅读、语法、写作等不再共用单一训练框架
- **质量门槛**：642 点十个字段均非空且内容互异，正文最短 679 字，专项训练最短 363 字，自测最短 293 字
- **安全升级**：新增 `base_content` 保存升级前讲义，`quality_version` 实现幂等迁移；掌握度、复习次数、复习日期和知识关系均保持不变
- **知识图谱**：335 条知识关系用于可视化关联与同章串联
- **真题关联**：知识点与历年真题关联
- **幂等自动补全**：后端启动时补齐缺失内容，不重复插入，也不重置掌握度、复习记录或用户数据

### 📥 文档导入（新增）
- **多格式支持**：PDF/Word/MD/TXT 文件导入
- **自动解析**：自动提取章节、判断重要度、生成标签
- **智能分类**：根据文件名和内容自动分类到对应学科

### 🔍 向量搜索（新增）
- **语义搜索**：基于 TF-IDF 和余弦相似度的向量搜索
- **混合搜索**：向量搜索 + 关键词搜索结合
- **相似度排序**：按相似度排序返回结果

### 📝 知识复习（新增）
- **FSRS 调度**：知识点级别的 FSRS 间隔复习
- **复习统计**：复习次数、掌握度、稳定性追踪
- **到期提醒**：自动显示需要复习的知识点

### 🎯 个性化推荐（新增）
- **智能推荐**：基于掌握度、错题、复习到期的推荐
- **薄弱知识点**：自动识别掌握度低的知识点
- **学习计划**：7 天个性化学习计划

### 📈 考试预测（新增）
- **分数预测**：基于学习数据的考试分数预测
- **置信度**：预测结果的置信度分析
- **分数构成**：分析分数的各个组成部分
- **学习趋势**：30 天学习进度趋势

### ⏱️ 学习时长追踪（新增）
- **自动计时**：学习会话自动计时
- **暂停/继续**：支持暂停和继续计时
- **学习统计**：每日、每周学习时长统计

---

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────────────────────┐
│                      用户层 (Frontend)                        │
│  Next.js 15 + React 19 + TypeScript + Tailwind CSS           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │  仪表盘  │ │ AI 导师  │ │  闪卡    │ │  模拟考  │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├──────────────────────────────────────────────────────────────┤
│                      服务层 (Backend)                         │
│  FastAPI + sqlite3 + JWT Auth                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ 认证服务 │ │ AI 服务  │ │ 文件服务 │ │ 数据服务 │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├──────────────────────────────────────────────────────────────┤
│                      数据层                                   │
│  SQLite + 文件系统                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│  │  数据库  │ │ 文件存储 │ │ AI 模型  │                     │
│  └──────────┘ └──────────┘ └──────────┘                     │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### Windows 一键启动（推荐）

双击项目根目录下的 `start.bat`。脚本会：

1. 检查 Python 与 Node.js；
2. 仅在依赖缺失时安装环境；
3. 自动选择可用的前后端端口；
4. 写入 `.runtime-ports`；
5. 启动 API 与网页并打开浏览器。

默认优先使用：

- 前端：`http://localhost:3000`
- 后端：`http://localhost:8000`
- API 文档：`http://localhost:8000/docs`

如果端口已被占用，终端会显示实际地址，例如 3001/8001。不要手动关闭占用端口的其他项目。

### 分别启动

`start-backend.bat` 与 `start-frontend.bat` 可以单独运行。前端脚本会读取 `.runtime-ports` 中的后端端口。

### 手动开发启动

```powershell
# 后端
cd backend
.\venv\Scripts\python.exe main.py

# 前端（另开终端）
cd frontend-next
$env:NEXT_PUBLIC_API_URL='http://localhost:8000'
npm run dev
```

### 登录与快捷键

- 首次使用请自行注册账号；生产环境不提供固定默认管理员密码。
- `Ctrl/Cmd + K`：打开功能搜索
- `/`：在非输入状态打开功能搜索
- `Esc`：关闭弹窗或面板

### 构建验证

```powershell
cd frontend-next
npm run build

cd ..
.\backend\venv\Scripts\python.exe -m py_compile backend\main.py
```

> AI 能力需要在 `backend/.env` 中配置 DeepSeek/OpenRouter，或运行可用的 Ollama 服务；未配置远程 AI 时，其余计划、复习、计时和知识管理功能仍可使用。

---

## 📁 项目结构

```
ai-graduate-exam-os/
├── backend/                    # FastAPI 后端
│   ├── main.py                 # 主入口（89 个 API 端点）
│   ├── models.py               # 旧版 ORM 模型定义（当前主路径未使用）
│   ├── database.py             # sqlite3 数据库连接与 21 张表初始化
│   ├── auth.py                 # JWT 认证模块
│   ├── config.py               # 配置管理
│   ├── services/
│   │   └── ai_service.py       # AI 服务（DeepSeek）
│   ├── seed_knowledge.py       # 基础知识库种子脚本
│   ├── comprehensive_knowledge.py # 综合知识库幂等补全脚本
│   ├── document_importer.py    # 文档导入模块
│   ├── vector_search.py        # 向量搜索模块
│   ├── recommendation.py       # 个性化推荐模块
│   ├── exam_prediction.py      # 考试预测模块
│   ├── split_effect_theories.py # 效果研究理论拆分脚本
│   ├── fix_effect_chapter.py   # 效果研究章节修复脚本
│   ├── requirements.txt        # Python 依赖
│   ├── Dockerfile              # Docker 配置
│   └── .env                    # 环境变量
│
├── frontend-next/              # Next.js 前端
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx      # 根布局
│   │   │   └── page.tsx        # 主页面（25 个页面组件）
│   │   ├── components/         # 25+ 页面组件
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── AiTutorPage.tsx
│   │   │   ├── FlashcardsPage.tsx
│   │   │   ├── StudyPlanPage.tsx
│   │   │   ├── ResourceLibraryPage.tsx
│   │   │   ├── AISearchPage.tsx
│   │   │   ├── CoreTheoriesPage.tsx
│   │   │   ├── HotTopicsPage.tsx
│   │   │   ├── MockExamPage.tsx
│   │   │   ├── WrongQuestionsPage.tsx
│   │   │   ├── SchoolInfoPage.tsx
│   │   │   ├── EnglishPage.tsx
│   │   │   ├── PoliticsPage.tsx
│   │   │   ├── VocabularyPage.tsx
│   │   │   ├── KnowledgeBrowserPage.tsx
│   │   │   ├── KnowledgeGraphPage.tsx
│   │   │   ├── DocumentImportPage.tsx    # 新增
│   │   │   ├── VectorSearchPage.tsx      # 新增
│   │   │   ├── KnowledgeReviewPage.tsx   # 新增
│   │   │   ├── RecommendationsPage.tsx   # 新增
│   │   │   ├── ExamPredictionPage.tsx    # 新增
│   │   │   ├── StudyTimer.tsx            # 新增
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── AuthPage.tsx
│   │   │   └── Sidebar.tsx
│   │   └── lib/
│   │       ├── api.ts          # API 客户端
│   │       ├── auth-context.tsx # 认证上下文
│   │       └── types.ts        # 类型定义
│   ├── package.json
│   └── Dockerfile
│
├── data/                       # 学习资料（14 个 Markdown，约 190KB）
├── nginx/                      # Nginx 配置
├── docker-compose.yml          # Docker Compose
├── start.bat                   # 启动脚本
├── MEMORY.md                   # 项目记忆文件
├── KNOWLEDGE_ARCHITECTURE.md  # 知识库架构设计
├── PROJECT_AUDIT.md           # 项目审计报告
├── IMPLEMENT_PLAN.md          # 实施计划
└── README.md
```

---

## 🔌 API 端点

### 认证
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/auth/register` | POST | 用户注册 |
| `/api/auth/login` | POST | 用户登录 |
| `/api/auth/me` | GET | 获取当前用户 |
| `/api/auth/me` | PUT | 更新用户信息 |

### AI 对话
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/chat` | POST | SSE流式AI对话 |
| `/api/chat/models` | GET | AI模型列表 |
| `/api/conversations` | GET | 会话列表 |
| `/api/conversations/{id}/messages` | GET | 会话消息 |

### 闪卡系统
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/flashcards/due` | GET | 到期闪卡 |
| `/api/flashcards` | POST | 创建闪卡 |
| `/api/flashcards/generate` | POST | AI生成闪卡 |
| `/api/flashcards/{id}/review` | POST | FSRS复习 |
| `/api/flashcards/stats` | GET | 闪卡统计 |

### 学习管理
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/wrong-questions` | GET/POST | 错题管理 |
| `/api/study-plans` | GET/POST | 学习计划 |
| `/api/exams` | GET/POST | 模拟考试 |
| `/api/dashboard/stats` | GET | 仪表盘统计 |

### 文件管理
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/files` | GET | 文件列表 |
| `/api/files/upload` | POST | 文件上传 |
| `/api/files/content/{path}` | GET | 文件内容 |
| `/api/files/pdf/{path}` | GET | PDF文件 |

### 知识库（新增）
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/knowledge/subjects` | GET | 学科列表 |
| `/api/knowledge/subjects/{id}/chapters` | GET | 学科下章节 |
| `/api/knowledge/chapters/{id}/points` | GET | 章节下知识点 |
| `/api/knowledge/points/{id}` | GET | 知识点详情 |
| `/api/knowledge/points/{id}/relations` | GET | 知识关系 |
| `/api/knowledge/points/{id}/exams` | GET | 关联真题 |
| `/api/knowledge/search` | GET | 搜索知识点 |
| `/api/knowledge/graph` | GET | 知识图谱数据 |

### 文档导入（新增）
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/knowledge/import` | POST | 文档导入 |
| `/api/knowledge/import/history` | GET | 导入历史 |

### 向量搜索（新增）
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/knowledge/vector-search` | GET | 向量搜索 |

### 知识复习（新增）
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/knowledge/reviews/due` | GET | 到期复习 |
| `/api/knowledge/reviews/{id}` | POST | 复习知识点 |
| `/api/knowledge/reviews/stats` | GET | 复习统计 |

### 个性化推荐（新增）
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/recommendations` | GET | 获取推荐 |
| `/api/recommendations/subject/{id}` | GET | 学科推荐 |
| `/api/recommendations/weak-points` | GET | 薄弱知识点 |
| `/api/recommendations/study-plan` | GET | 学习计划 |

### 考试预测（新增）
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/predictions/score` | GET | 预测分数 |
| `/api/predictions/trend` | GET | 学习趋势 |

### 学习时长追踪（新增）
| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/study-sessions/start` | POST | 开始学习会话 |
| `/api/study-sessions/{id}/stop` | POST | 停止学习会话 |
| `/api/study-sessions/stats` | GET | 学习统计 |

---

## 🔧 配置说明

### 环境变量 (.env)

```bash
# AI 模型配置
DEEPSEEK_API_KEY=sk-your-key-here
DEEPSEEK_API_BASE=https://api.deepseek.com

# JWT 认证
SECRET_KEY=your-secret-key-change-in-production

# 服务器
HOST=0.0.0.0
PORT=8000
DEBUG=false

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 数据库结构

系统使用 `backend/exam_os.db`（SQLite），当前初始化 21 张表：

| 表名 | 用途 |
|------|------|
| `users` | 用户信息 |
| `conversations` | AI 对话会话 |
| `messages` | 对话消息 |
| `flashcards` | 闪卡 |
| `flashcard_reviews` | 闪卡复习记录 |
| `wrong_questions` | 错题 |
| `study_plans` | 学习计划 |
| `study_records` | 学习记录 |
| `exams` | 模拟考试 |
| `posts` | 社区帖子 |
| `subjects` | 学科 |
| `chapters` | 章节 |
| `knowledge_points` | 知识点 |
| `knowledge_relations` | 知识点关系 |
| `exam_questions` | 真题 |
| `ai_summaries` | AI 总结缓存 |
| `import_jobs` | 导入任务 |
| `study_sessions` | 学习会话 |
| `vocabulary` | 单词库 |
| `vocabulary_reviews` | 单词复习记录 |
| `knowledge_reviews` | 知识复习记录 |

### 知识库数据

当前知识库包含：

- **学科**：3 个（新传、政治、英语）
- **章节**：44 个
- **知识点**：642 个
  - 新传：24 章，435 点
  - 政治：12 章，125 点
  - 英语二：8 章，82 点
- **空章节**：0 个
- **知识关系**：335 条
- **内容完整度**：642/642 均具备摘要、核心内容、考试要点、答题模板和速记
- **真题**：4 道
- **题库**：85 道选择题

> 说明：本知识库已形成完整的基础复习框架，但政治年度时政、院校自命题范围、参考书目和招生要求会变化，必须以报考年度教育部考试大纲、目标院校招生目录及官方通知为准。

---

## 📈 版本历史

### v4.1.0（当前版本）
- ✅ 修复 100% 浏览器缩放下内容截断和滚轮失效问题
- ✅ 综合知识库扩充至 44 章、642 个知识点、335 条关系
- ✅ 所有知识点补齐摘要、考试要点、答题模板与速记字段
- ✅ 知识库页面增加学科/章节数量、响应式单栏与独立滚动
- ✅ 知识库系统：学科 → 章节 → 知识点三级结构
- ✅ 知识图谱：可视化知识关系网络
- ✅ 文档导入：PDF/Word/MD/TXT 自动解析
- ✅ 向量搜索：TF-IDF + 余弦相似度语义搜索
- ✅ 知识复习：FSRS 知识点级间隔复习
- ✅ 个性化推荐：基于掌握度和错题的智能推荐
- ✅ 考试预测：基于学习数据的分数预测
- ✅ 学习时长追踪：自动计时和统计
- ✅ 前端页面：25 个功能页面
- ✅ API 端点：89 个

### v3.0.0
- ✅ 用户认证系统（JWT）
- ✅ SQLite 数据层与 JWT 用户认证
- ✅ 完整的错误处理
- ✅ Docker 部署支持
- ✅ 生产级架构

### v2.0.0
- ✅ DeepSeek AI 集成
- ✅ FSRS 间隔复习算法
- ✅ 文件管理 API
- ✅ 14个功能页面

### v1.0.0
- ✅ 项目初始化
- ✅ 基础 UI 框架

---

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- [DeepSeek](https://deepseek.com/) - AI 模型支持
- [Next.js](https://nextjs.org/) - 前端框架
- [FastAPI](https://fastapi.tiangolo.com/) - 后端框架
- [Tailwind CSS](https://tailwindcss.com/) - 样式框架

---

## 📝 开发注意事项

### 数据库
- 数据库文件：`backend/exam_os.db`（SQLite）
- 新增表直接追加到 `database.py` 的 `init_db()` 函数
- 知识库种子脚本：`backend/seed_knowledge.py`（会跳过已有数据，可安全重复运行）

### 前端
- 新增页面需要：
  1. 创建组件文件
  2. 在 `page.tsx` 中添加 import 和 case
  3. 在 `Sidebar.tsx` 中添加导航项
- 前端构建：`cd frontend-next && npm run build`
- 前端开发：`cd frontend-next && npm run dev`（默认端口 3000，可指定 `-p 3001`）

### 后端
- 新增 API 端点需要：
  1. 在 `main.py` 中添加路由函数
  2. 使用 `get_current_user()` 获取认证用户
  3. 使用 `get_db()` 获取数据库连接
- 后端启动：`cd backend && python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000`

### 知识库
- 知识库结构：学科 → 章节 → 知识点
- 知识关系类型：contrast（对比）、evolution（发展）、related（相关）、prerequisite（前置）、includes（包含）
- 效果研究理论已拆分为 7 个独立知识点（在 `ch_xc_cbs_effect` 章节）

### 测试
- 测试 API 需要先登录获取 token
- 测试账号：`test@test.com` / `test123`
- 测试命令：`curl -H "Authorization: Bearer <token>" http://localhost:8000/api/...`

### 部署
- 启动顺序：先启动后端，再启动前端
- 环境变量：`backend/.env`（DeepSeek API Key 等）
- CORS 配置：`CORS_ORIGINS=http://localhost:3000,http://localhost:3001`

---

**AI 考研OS** - 让考研更高效，让学习更智能 🎓


## GitHub + Railway 公开部署

本项目已采用单服务 Docker 架构：Next.js 静态导出由 FastAPI 同源托管，公开访问只需要一个域名。

1. 将仓库推送到 GitHub。
2. 在 Railway 中选择 **Deploy from GitHub repo**。
3. 为服务添加持久卷并挂载到 `/data`。
4. 至少设置以下变量：
   - `ENVIRONMENT=production`
   - `JWT_SECRET=<至少32字符的强随机值>`
   - `DATABASE_PATH=/data/exam_os.db`
   - `UPLOAD_DIR=/data/uploads`
5. AI 功能可选设置 `DEEPSEEK_API_KEY` 或 `OPENROUTER_API_KEY`。不设置时，知识库、题库、复习与学习管理功能仍可使用，AI 页面会明确提示尚未配置。
6. 可选设置 `ADMIN_EMAIL`、`ADMIN_PASSWORD`（至少12位）和 `ADMIN_USERNAME` 创建管理员。
7. 在 Railway Networking 中生成公开域名。

> 安全说明：`backend/.env`、任何 `.db`、上传文件、虚拟环境、日志和构建缓存都已排除，不应上传到 GitHub。公开 AI 服务会产生 API 费用，正式推广前建议增加使用配额或限流。
