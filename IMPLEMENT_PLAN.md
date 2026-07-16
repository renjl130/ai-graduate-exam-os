# 实施计划 — Personal Study OS 升级

> 更新时间：2026-06-09
> 目标：从"聊天驱动"升级为"知识库驱动的佳乐考研学习平台"

---

## 实施阶段

### 阶段一：知识库基础架构（当前任务）

**目标：** 建立知识库数据库结构，创建 API，构建新传知识库

**任务清单：**

1. ✅ 完成项目审计（PROJECT_AUDIT.md）
2. ✅ 设计知识库架构（KNOWLEDGE_ARCHITECTURE.md）
3. 🔲 新增数据库表（knowledge_points, chapters, subjects, knowledge_relations, exam_questions, ai_summaries, import_jobs, study_sessions）
4. 🔲 创建知识库 API 端点（14个端点）
5. 🔲 构建新传知识库（从 data/*.md 提取→结构化存储）
6. 🔲 构建知识关系（议程设置→框架理论→沉默的螺旋等）
7. 🔲 前端：知识库浏览器页面
8. 🔲 前端：知识点详情页面

### 阶段二：政治 + 英语知识库

**目标：** 完成三大学科知识库

**任务清单：**

1. 🔲 构建政治知识库（马原/毛中特/史纲/思修法基）
2. 🔲 构建英语知识库（词汇/语法/长难句/阅读/翻译/作文）
3. 🔲 前端：政治知识浏览器
4. 🔲 前端：英语知识浏览器

### 阶段三：AI 学习辅助

**目标：** AI 与知识库深度集成

**任务清单：**

1. 🔲 AI 知识点讲解（点击→概念/背景/案例/真题/答题方式）
2. 🔲 AI 答题助手（输入题目→标准答案/得分点/框架）
3. 🔲 AI 错题分析（错误原因/知识漏洞/推荐复习）
4. 🔲 AI 学习规划（考研日期→每日/每周/阶段计划）

### 阶段四：知识图谱 + 导入系统

**目标：** 可视化知识关系 + 文档导入

**任务清单：**

1. 🔲 知识图谱可视化（D3.js/vis.js）
2. 🔲 文档导入系统（PDF/Word/MD/TXT→自动解析→知识点）
3. 🔲 向量搜索（Embedding + 语义检索）

### 阶段五：界面重构

**目标：** Study OS 界面

**任务清单：**

1. 🔲 首页重构（今日任务/学习时长/待复习/知识图谱/AI导师/最近错题/真题）
2. 🔲 左侧导航重构（仪表盘/新传/政治/英语/知识图谱/错题本/真题库/学习计划/AI导师/设置）
3. 🔲 学习时长自动追踪
4. 🔲 复习调度系统

---

## 当前任务：阶段一

### 第一步：新增数据库表 ✅

在 `backend/database.py` 中新增 8 张表：
- `subjects` — 学科表
- `chapters` — 章节表
- `knowledge_points` — 知识点表（核心）
- `knowledge_relations` — 知识点关系表
- `exam_questions` — 真题关联表
- `ai_summaries` — AI总结缓存表
- `import_jobs` — 导入任务表
- `study_sessions` — 学习会话表

### 第二步：创建知识库 API ✅

在 `backend/main.py` 中新增 20+ 个端点：
- `GET /api/knowledge/subjects` — 获取所有学科
- `POST /api/knowledge/subjects` — 创建学科
- `GET /api/knowledge/subjects/{id}/chapters` — 获取章节
- `POST /api/knowledge/chapters` — 创建章节
- `GET /api/knowledge/chapters/{id}/points` — 获取知识点
- `GET /api/knowledge/points/{id}` — 知识点详情（含关系、真题）
- `GET /api/knowledge/points/{id}/children` — 子知识点
- `GET /api/knowledge/points/{id}/relations` — 知识关系
- `GET /api/knowledge/points/{id}/exams` — 关联真题
- `POST /api/knowledge/points` — 创建知识点
- `PUT /api/knowledge/points/{id}` — 更新知识点
- `POST /api/knowledge/relations` — 创建关系
- `GET /api/knowledge/search` — 搜索知识点
- `GET /api/knowledge/graph` — 知识图谱数据
- `POST /api/ai/knowledge-explain` — AI讲解知识点
- `POST /api/ai/answer-helper` — AI答题助手
- `POST /api/ai/wrong-analysis` — AI错题分析
- `POST /api/ai/study-plan` — AI学习规划
- `POST /api/knowledge/exam-questions` — 创建真题
- `GET /api/knowledge/exam-questions` — 真题列表

### 第三步：构建新传知识库 ✅

从 `data/*.md` 文件中提取知识点，结构化存入数据库：
- 传播学教程（40KB）→ 32 个知识点
- 新闻学概论（19KB）→ 24 个知识点
- 新闻采访与写作 → 25 个知识点
- 新闻编辑学 → 18 个知识点
- 新闻评论 → 25 个知识点
- 网络传播与新媒体 → 23 个知识点
- 新媒体热点专题 → 28 个知识点
- 广告学概论 → 28 个知识点
- 公共关系学 → 10 个知识点
- 中国新闻传播史 → 24 个知识点
- 外国新闻传播史 → 20 个知识点
- 其他 → 6 个知识点
- **新传合计：263 个知识点**

### 第四步：构建政治知识库 ✅

创建 17 个核心知识点：
- 马克思主义哲学（唯物论 3 个、辩证法 4 个、认识论 2 个）
- 毛泽东思想（2 个）
- 习近平新时代（3 个）
- 史纲（2 个）
- 思修法基（1 个）

### 第五步：构建英语知识库 ✅

创建 9 个核心知识点：
- 语法（4 个：五大句型、定语从句、名词性从句、非谓语动词）
- 阅读（2 个：主旨题、态度题）
- 作文（2 个：书信模板、图表模板）
- 词汇（1 个：高频词组）

### 第六步：知识关系 ✅ 已完成

知识关系创建函数已修复，使用模糊匹配创建了 4 条关系：
- 议程设置 ↔ 沉默的螺旋（对比关系）
- 使用与满足 ↔ 议程设置（对比关系）
- 新闻价值 ↔ 新闻专业主义（对比关系）
- 媒介融合 → 县级融媒体中心建设（发展关系）

**注意**：效果研究理论（议程设置、沉默的螺旋等）集中在"二、主要的传播效果理论"知识点中，而非分散在各章节。

### 第七步：前端知识库页面 ✅

创建新组件：
- `KnowledgeBrowserPage.tsx` — 知识库浏览器（三栏布局：学科→章节→知识点列表→详情）
- `KnowledgeGraphPage.tsx` — 知识图谱可视化（Canvas 绘制、节点交互、学科筛选）

**额外完成**：
- `CoreTheoriesPage.tsx` — 已改为从知识库读取（效果研究章节）
- `HotTopicsPage.tsx` — 已改为从知识库读取（新媒体热点专题章节）
- `EnglishPage.tsx` — 已改为从知识库读取（英语各章节）
- `PoliticsPage.tsx` — 已改为从知识库读取（政治各章节）

### 第八步：侧边栏导航更新 ✅

更新 `Sidebar.tsx`：
- 新增"📚 知识库"入口（位置第2）
- 新增"🕸️ 知识图谱"入口（位置第3）
- 保留所有现有功能入口

### 第九步：主页面集成 ✅

更新 `page.tsx`：
- 新增 `KnowledgeBrowserPage` 路由
- 新增 `KnowledgeGraphPage` 路由
- 前端构建验证通过

---

## 当前数据库状态

| 类型 | 数量 |
|------|------|
| 学科 | 3（新传、政治、英语） |
| 章节 | 39（新传 21 + 政治 11 + 英语 7） |
| 知识点 | 289（新传 263 + 政治 17 + 英语 9） |
| 真题 | 4 |
| 知识关系 | 0（待修复） |
