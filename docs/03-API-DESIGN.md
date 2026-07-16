# API 设计 - 佳乐考研

## 一、API 概览

- Base URL: `/api/v1`
- 认证: Bearer Token (JWT)
- 格式: JSON
- 实时通信: WebSocket `/ws`

## 二、认证模块

```
POST   /api/v1/auth/register          注册
POST   /api/v1/auth/login             登录
POST   /api/v1/auth/refresh           刷新Token
POST   /api/v1/auth/logout            登出
POST   /api/v1/auth/forgot-password   忘记密码
POST   /api/v1/auth/verify-email      邮箱验证
GET    /api/v1/auth/oauth/{provider}  OAuth登录 (wechat/github)
```

## 三、用户模块

```
GET    /api/v1/users/me               获取当前用户信息
PATCH  /api/v1/users/me               更新用户信息
PATCH  /api/v1/users/me/preferences   更新偏好设置
GET    /api/v1/users/me/stats         获取用户学习统计
DELETE /api/v1/users/me               删除账号
```

## 四、智能资料库 (Knowledge Base)

### 文档管理
```
POST   /api/v1/documents              上传文档
GET    /api/v1/documents              获取文档列表(分页/筛选/排序)
GET    /api/v1/documents/:id          获取文档详情
PATCH  /api/v1/documents/:id          更新文档信息
DELETE /api/v1/documents/:id          删除文档
POST   /api/v1/documents/bulk         批量上传
POST   /api/v1/documents/link         通过链接添加
POST   /api/v1/documents/web          通过网页URL添加
```

### 文档处理
```
POST   /api/v1/documents/:id/process  触发文档处理
GET    /api/v1/documents/:id/status   获取处理状态
GET    /api/v1/documents/:id/chunks   获取文档分块
GET    /api/v1/documents/:id/summary  获取AI摘要
GET    /api/v1/documents/:id/tags     获取自动生成的标签
GET    /api/v1/documents/:id/keypoints 获取重点提取
POST   /api/v1/documents/:id/reprocess 重新处理
```

### 文件存储
```
POST   /api/v1/upload/presigned-url   获取预签名上传URL
POST   /api/v1/upload/file            直接上传文件
GET    /api/v1/upload/:id/download    下载文件
```

## 五、AI 搜索引擎

```
POST   /api/v1/search                 统一搜索接口
GET    /api/v1/search/suggest         搜索建议(自动补全)
GET    /api/v1/search/history         搜索历史
POST   /api/v1/search/semantic        语义搜索
POST   /api/v1/search/keyword         关键词搜索(BM25)
POST   /api/v1/search/hybrid          混合搜索
GET    /api/v1/search/trending        热门搜索
```

### 搜索请求体
```json
POST /api/v1/search
{
    "query": "线性代数 特征值 特征向量",
    "search_type": "hybrid",           // semantic/keyword/hybrid
    "filters": {
        "subject": "数学",
        "doc_type": ["pdf", "note"],
        "tags": ["线性代数"],
        "difficulty": [3, 4, 5],
        "date_range": {
            "from": "2024-01-01",
            "to": "2025-12-31"
        }
    },
    "limit": 20,
    "offset": 0
}
```

### 搜索响应
```json
{
    "results": [
        {
            "id": "...",
            "type": "document",         // document/question/flashcard/note
            "title": "线性代数特征值笔记",
            "content": "...",
            "highlights": ["..."],
            "relevance_score": 0.95,
            "source": { "doc_id": "...", "page": 42 },
            "metadata": { "subject": "数学", "tags": ["特征值"] }
        }
    ],
    "total": 156,
    "search_time_ms": 45,
    "suggestions": ["特征多项式", "相似矩阵"]
}
```

## 六、AI 导师系统

### 对话管理
```
POST   /api/v1/tutor/chat             发送消息(流式响应 SSE)
GET    /api/v1/tutor/conversations    获取对话列表
GET    /api/v1/tutor/conversations/:id 获取对话详情
DELETE /api/v1/tutor/conversations/:id 删除对话
PATCH  /api/v1/tutor/conversations/:id 更新对话(标题等)
POST   /api/v1/tutor/conversations    创建新对话
```

### 对话请求
```json
POST /api/v1/tutor/chat
{
    "conversation_id": "...",           // 可选，不传则新建
    "message": "为什么快速排序的平均时间复杂度是O(nlogn)？",
    "context": {                        // 可选的上下文
        "subject": "数据结构",
        "current_topic": "排序算法",
        "related_doc_ids": ["..."]
    },
    "preferences": {
        "explanation_level": "detailed", // brief/normal/detailed
        "include_examples": true,
        "include_visuals": true,
        "language": "zh-CN"
    }
}
```

### 流式响应 (SSE)
```
event: thinking
data: {"step": "searching_knowledge_base", "status": "in_progress"}

event: reference
data: {"type": "document", "title": "数据结构教材P156", "relevance": 0.92}

event: content
data: {"text": "快速排序的平均时间复杂度分析..."}

event: content
data: {"text": "需要从递归树的角度理解..."}

event: done
data: {"total_tokens": 856, "model": "deepseek-v3", "latency_ms": 2340}
```

### AI功能接口
```
POST   /api/v1/tutor/explain          知识点解释
POST   /api/v1/tutor/analyze-image    图片分析(OCR+理解)
POST   /api/v1/tutor/solve            解题
POST   /api/v1/tutor/mind-map         生成思维导图(返回JSON结构)
POST   /api/v1/tutor/summary          内容总结
POST   /api/v1/tutor/compare          知识点对比
```

## 七、模拟考试系统

### 考试管理
```
POST   /api/v1/exams                  创建考试
GET    /api/v1/exams                  获取考试列表
GET    /api/v1/exams/:id              获取考试详情
PATCH  /api/v1/exams/:id              更新考试
DELETE /api/v1/exams/:id              删除考试
POST   /api/v1/exams/:id/start        开始考试
POST   /api/v1/exams/:id/submit       提交考试
POST   /api/v1/exams/:id/abandon      放弃考试
```

### 题目管理
```
GET    /api/v1/exams/:id/questions    获取考试题目
POST   /api/v1/exams/:id/questions/:qid/answer  提交答案
GET    /api/v1/exams/:id/result       获取考试结果
GET    /api/v1/exams/:id/analysis     获取AI分析报告
```

### AI出题
```
POST   /api/v1/exams/generate         AI自动生成考试
{
    "subject": "数据结构",
    "topics": ["二叉树", "图", "排序"],
    "question_count": 20,
    "difficulty": "medium",             // easy/medium/hard/hell
    "time_limit": 120,                  // 分钟
    "question_types": ["choice", "fill", "calculation"],
    "target_school": "清华计算机"       // 可选，按院校出题
}
```

### 题目库
```
GET    /api/v1/questions              题目列表(筛选/分页)
GET    /api/v1/questions/:id          题目详情
POST   /api/v1/questions              添加题目
POST   /api/v1/questions/import       批量导入
GET    /api/v1/questions/random       随机获取题目
GET    /api/v1/questions/daily        每日推荐题目
```

## 八、错题系统

```
GET    /api/v1/wrong-questions        获取错题列表
GET    /api/v1/wrong-questions/:id    错题详情
PATCH  /api/v1/wrong-questions/:id    更新错题(笔记/标签)
DELETE /api/v1/wrong-questions/:id    移除错题
POST   /api/v1/wrong-questions/:id/master  标记已掌握
GET    /api/v1/wrong-questions/stats  错题统计
GET    /api/v1/wrong-questions/weak-points 薄弱知识点分析
POST   /api/v1/wrong-questions/:id/retry   重新做题
POST   /api/v1/wrong-questions/generate-drill  生成专项训练
```

### 错题统计响应
```json
{
    "total_wrong": 234,
    "active": 156,
    "mastered": 78,
    "by_subject": {
        "数学": { "total": 89, "active": 45, "mastery_rate": 0.49 },
        "英语": { "total": 67, "active": 52, "mastery_rate": 0.22 },
        "408": { "total": 78, "active": 59, "mastery_rate": 0.24 }
    },
    "top_weak_points": [
        { "topic": "概率论-条件概率", "wrong_count": 23, "mastery": 15 },
        { "topic": "数据结构-红黑树", "wrong_count": 18, "mastery": 10 }
    ],
    "trend": {
        "weekly_new": [12, 15, 8, 10, 6],
        "weekly_mastered": [5, 8, 12, 10, 15]
    }
}
```

## 九、间隔复习系统 (FSRS)

### 闪卡组
```
POST   /api/v1/flashcards/decks       创建卡组
GET    /api/v1/flashcards/decks       获取卡组列表
GET    /api/v1/flashcards/decks/:id   卡组详情
PATCH  /api/v1/flashcards/decks/:id   更新卡组
DELETE /api/v1/flashcards/decks/:id   删除卡组
POST   /api/v1/flashcards/decks/:id/generate  AI自动生成卡片
```

### 闪卡
```
POST   /api/v1/flashcards/cards       创建卡片
GET    /api/v1/flashcards/cards       获取卡片列表
GET    /api/v1/flashcards/cards/:id   卡片详情
PATCH  /api/v1/flashcards/cards/:id   更新卡片
DELETE /api/v1/flashcards/cards/:id   删除卡片
GET    /api/v1/flashcards/due         获取今日待复习卡片
```

### 复习
```
POST   /api/v1/flashcards/review      提交复习结果
{
    "card_id": "...",
    "rating": 3,                        // 1=Again, 2=Hard, 3=Good, 4=Easy
    "review_time_ms": 5000
}
GET    /api/v1/flashcards/review/stats 复习统计
GET    /api/v1/flashcards/review/calendar 复习日历
```

## 十、学习计划系统

```
POST   /api/v1/plans                  创建计划
GET    /api/v1/plans                  获取计划列表
GET    /api/v1/plans/:id              计划详情
PATCH  /api/v1/plans/:id              更新计划
DELETE /api/v1/plans/:id              删除计划
POST   /api/v1/plans/generate         AI自动生成计划
POST   /api/v1/plans/:id/adjust       AI调整计划
GET    /api/v1/plans/:id/tasks        获取计划任务
PATCH  /api/v1/plans/:id/tasks/:tid   更新任务状态
GET    /api/v1/plans/today            获取今日任务
GET    /api/v1/plans/overview         计划总览
```

### AI生成计划请求
```json
POST /api/v1/plans/generate
{
    "exam_date": "2026-12-20",
    "target_scores": {
        "politics": 75,
        "english": 80,
        "math": 130,
        "professional": 120
    },
    "current_level": {
        "politics": "beginner",
        "english": "intermediate",
        "math": "intermediate",
        "professional": "beginner"
    },
    "available_hours_per_day": 8,
    "rest_days": ["sunday_afternoon"],
    "weak_areas": ["概率论", "英语阅读", "数据结构-图"],
    "preferred_schedule": "intensive"    // relaxed/balanced/intensive
}
```

## 十一、院校情报系统

```
GET    /api/v1/schools/search         搜索院校
GET    /api/v1/schools/:id            院校详情
GET    /api/v1/schools/:id/majors     专业列表
GET    /api/v1/schools/:id/score-lines 分数线
GET    /api/v1/schools/:id/ratio      报录比
GET    /api/v1/schools/:id/books      参考书目
GET    /api/v1/schools/:id/advisors   导师信息
GET    /api/v1/schools/:id/experience-papers 经验帖
POST   /api/v1/schools/:id/analyze    AI分析院校
GET    /api/v1/schools/compare        院校对比
POST   /api/v1/schools/target         设置目标院校
GET    /api/v1/schools/target         获取我的目标院校
GET    /api/v1/schools/target/report  生成院校分析报告
```

## 十二、学习仪表盘

```
GET    /api/v1/dashboard/overview     总览数据
GET    /api/v1/dashboard/daily        今日数据
GET    /api/v1/dashboard/weekly       本周数据
GET    /api/v1/dashboard/monthly      本月数据
GET    /api/v1/dashboard/subject-stats 科目统计
GET    /api/v1/dashboard/trends       趋势数据
GET    /api/v1/dashboard/predictions  AI预测分数
GET    /api/v1/dashboard/achievements 成就系统
GET    /api/v1/dashboard/leaderboard  排行榜
GET    /api/v1/dashboard/calendar     学习日历
POST   /api/v1/dashboard/log          记录学习时长
```

### 仪表盘响应
```json
GET /api/v1/dashboard/overview
{
    "today": {
        "study_minutes": 245,
        "questions_attempted": 35,
        "questions_correct": 28,
        "accuracy": 0.80,
        "cards_reviewed": 42,
        "streak_days": 15
    },
    "overall": {
        "total_study_hours": 456,
        "total_questions": 3420,
        "overall_accuracy": 0.72,
        "documents_uploaded": 45,
        "flashcards_count": 890
    },
    "subject_progress": {
        "数学": { "progress": 0.65, "accuracy": 0.68, "predicted_score": 118 },
        "英语": { "progress": 0.72, "accuracy": 0.75, "predicted_score": 76 },
        "政治": { "progress": 0.45, "accuracy": 0.62, "predicted_score": 68 },
        "408": { "progress": 0.58, "accuracy": 0.70, "predicted_score": 105 }
    },
    "weak_points": ["概率论-大数定律", "英语-翻译", "408-计算机网络"],
    "next_review": {
        "flashcards_due": 23,
        "wrong_questions_due": 12
    },
    "predictions": {
        "predicted_total": 367,
        "confidence": 0.78,
        "trend": "improving"
    }
}
```

## 十三、学习社区

```
GET    /api/v1/community/posts        获取帖子列表
POST   /api/v1/community/posts        发帖
GET    /api/v1/community/posts/:id    帖子详情
PATCH  /api/v1/community/posts/:id    编辑帖子
DELETE /api/v1/community/posts/:id    删除帖子
POST   /api/v1/community/posts/:id/like 点赞
POST   /api/v1/community/posts/:id/comments 评论
GET    /api/v1/community/posts/:id/comments 获取评论
GET    /api/v1/community/tags         热门标签
GET    /api/v1/community/schools      院校圈子
```

## 十四、WebSocket 实时通信

```
WS /ws/notifications                  通知推送
WS /ws/study-timer                    学习计时器同步
WS /ws/ai-stream                      AI流式响应(备选方案)
WS /ws/exam-timer                     考试计时器
```

## 十五、管理后台 API

```
GET    /api/v1/admin/users            用户管理
GET    /api/v1/admin/stats            系统统计
GET    /api/v1/admin/documents        文档管理
GET    /api/v1/admin/questions         题目管理
POST   /api/v1/admin/questions/import  批量导入题目
GET    /api/v1/admin/schools           院校数据管理
POST   /api/v1/admin/schools/crawl     触发院校数据爬取
GET    /api/v1/admin/ai-usage          AI使用统计
```

## 十六、通用响应格式

### 成功响应
```json
{
    "code": 0,
    "message": "success",
    "data": { ... },
    "meta": {
        "page": 1,
        "page_size": 20,
        "total": 156,
        "total_pages": 8
    }
}
```

### 错误响应
```json
{
    "code": 40001,
    "message": "Invalid credentials",
    "errors": [
        { "field": "email", "message": "邮箱格式不正确" }
    ]
}
```

### 错误码体系
| 范围 | 类型 |
|------|------|
| 0 | 成功 |
| 40000-40099 | 认证错误 |
| 40100-40199 | 授权错误 |
| 40300-40399 | 参数错误 |
| 40400-40499 | 资源不存在 |
| 42900-42999 | 频率限制 |
| 50000-50099 | 服务器内部错误 |
| 50100-50199 | AI服务错误 |

## 十七、认证与安全

- JWT Token: Access Token (15min) + Refresh Token (7d)
- Rate Limiting: 100 req/min (普通), 20 req/min (AI)
- API Key: 用于服务间通信
- CORS: 允许指定域名
- Input Validation: Pydantic模型校验
- File Upload: 最大100MB, 类型白名单
</parameter>
</write_to_file>