# 数据库设计 - 佳乐考研

## 一、ER 关系图

```
users ──┬── documents ── document_chunks ── embeddings
        ├── study_plans ── plan_tasks
        ├── exam_sessions ── exam_questions ── question_attempts
        ├── wrong_questions ── wrong_question_reviews
        ├── flashcard_decks ── flashcards ── review_logs (FSRS)
        ├── ai_conversations ── ai_messages
        ├── study_sessions (pomodoro/tracking)
        ├── school_targets ── school_reports
        ├── tags (many-to-many with documents, questions, flashcards)
        └── community_posts ── post_comments
```

## 二、核心表结构

### 2.1 用户表 (users)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    username VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    password_hash VARCHAR(255) NOT NULL,
    
    -- 考研信息
    target_university VARCHAR(200),       -- 目标院校
    target_major VARCHAR(200),            -- 目标专业
    exam_year INTEGER,                    -- 考研年份
    exam_subjects JSONB,                  -- 考试科目 {"politics": true, "english": "英语一", "math": "数学一", "professional": ["408"]}
    current_level VARCHAR(50),            -- 当前水平: beginner/intermediate/advanced
    
    -- 偏好设置
    daily_study_hours DECIMAL(3,1),       -- 每日学习时长
    preferred_ai_model VARCHAR(50),       -- 偏好AI模型
    theme VARCHAR(20) DEFAULT 'dark',     -- 主题
    language VARCHAR(10) DEFAULT 'zh-CN',
    
    -- 订阅信息
    plan VARCHAR(20) DEFAULT 'free',      -- free/pro/enterprise
    plan_expires_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_active_at TIMESTAMP
);

CREATE INDEX idx_users_target ON users(target_university, target_major);
CREATE INDEX idx_users_exam_year ON users(exam_year);
```

### 2.2 文档表 (documents)
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    title VARCHAR(500) NOT NULL,
    description TEXT,
    file_type VARCHAR(50) NOT NULL,       -- pdf/docx/pptx/image/video/audio/url/text
    file_url TEXT,                         -- S3 URL
    file_size BIGINT,                      -- bytes
    mime_type VARCHAR(100),
    original_filename VARCHAR(500),
    
    -- AI 分析结果
    ai_summary TEXT,                       -- AI生成摘要
    ai_chapters JSONB,                    -- 自动识别的章节 [{"title": "第一章", "page": 1}]
    ai_tags JSONB,                        -- 自动标签 ["数据结构", "红黑树", "排序"]
    ai_key_points JSONB,                  -- 重点提取
    ai_difficulty INTEGER,                -- 难度 1-5
    ai_subject VARCHAR(100),              -- 识别科目
    ai_course VARCHAR(200),               -- 识别课程
    
    -- 处理状态
    processing_status VARCHAR(20) DEFAULT 'pending',  -- pending/processing/completed/failed
    ocr_text TEXT,                        -- OCR识别文本
    parsed_text TEXT,                     -- 解析后的纯文本
    error_message TEXT,
    
    -- 来源信息
    source VARCHAR(100),                  -- 来源: upload/link/wechat/web
    source_url TEXT,
    source_author VARCHAR(200),
    
    -- 元数据
    metadata JSONB,                       -- 扩展信息
    is_public BOOLEAN DEFAULT false,
    download_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_user ON documents(user_id);
CREATE INDEX idx_documents_subject ON documents(ai_subject);
CREATE INDEX idx_documents_status ON documents(processing_status);
CREATE INDEX idx_documents_tags ON documents USING GIN(ai_tags);
```

### 2.3 文档分块表 (document_chunks)
```sql
CREATE TABLE document_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
    
    chunk_index INTEGER NOT NULL,
    content TEXT NOT NULL,
    content_length INTEGER,
    
    -- 位置信息
    page_number INTEGER,
    chapter VARCHAR(200),
    section VARCHAR(200),
    
    -- 元数据
    metadata JSONB,
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chunks_document ON document_chunks(document_id);
```

### 2.4 题目表 (questions)
```sql
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- 题目内容
    content TEXT NOT NULL,                -- 题干
    question_type VARCHAR(30) NOT NULL,   -- choice/fill/calculation/essay/reading/analysis
    options JSONB,                        -- 选项 [{"label": "A", "content": "..."}]
    correct_answer TEXT NOT NULL,
    explanation TEXT,                     -- 解析
    
    -- 分类
    subject VARCHAR(100) NOT NULL,        -- 科目: 政治/英语/数学/专业课
    chapter VARCHAR(200),
    knowledge_points JSONB,               -- 知识点标签
    tags JSONB,
    
    -- 来源
    source VARCHAR(100),                  -- ai_generated/exam_paper/textbook/user_upload
    source_year INTEGER,                  -- 真题年份
    source_school VARCHAR(200),           -- 来源院校
    source_exam VARCHAR(200),             -- 来源考试
    
    -- 难度
    difficulty INTEGER DEFAULT 3,         -- 1-5
    estimated_time INTEGER,               -- 预计用时(秒)
    score DECIMAL(5,2),                   -- 分值
    
    -- 统计
    attempt_count INTEGER DEFAULT 0,
    correct_rate DECIMAL(5,4),            -- 正确率
    
    -- AI生成标记
    is_ai_generated BOOLEAN DEFAULT false,
    ai_model VARCHAR(50),
    generation_prompt TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_type ON questions(question_type);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_kp ON questions USING GIN(knowledge_points);
CREATE INDEX idx_questions_source ON questions(source_year, source_school);
```

### 2.5 考试/练习会话表 (exam_sessions)
```sql
CREATE TABLE exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    title VARCHAR(300) NOT NULL,
    session_type VARCHAR(30) NOT NULL,    -- mock_exam/practice/topic_drill/adaptive
    subject VARCHAR(100),
    
    -- 配置
    total_questions INTEGER,
    time_limit INTEGER,                   -- 时间限制(秒)
    difficulty_level INTEGER,
    
    -- 结果
    score DECIMAL(6,2),
    total_score DECIMAL(6,2),
    accuracy DECIMAL(5,4),
    time_spent INTEGER,                   -- 实际用时(秒)
    
    -- 状态
    status VARCHAR(20) DEFAULT 'in_progress',  -- in_progress/completed/abandoned
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    
    -- AI分析
    ai_analysis TEXT,                     -- AI试卷分析
    weak_points JSONB,                    -- 薄弱知识点
    suggestions JSONB,                    -- 建议
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON exam_sessions(user_id);
CREATE INDEX idx_sessions_type ON exam_sessions(session_type);
```

### 2.6 答题记录表 (question_attempts)
```sql
CREATE TABLE question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES exam_sessions(id) ON DELETE SET NULL,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    
    user_answer TEXT,
    is_correct BOOLEAN,
    time_spent INTEGER,                   -- 用时(秒)
    
    -- AI评分(主观题)
    ai_score DECIMAL(5,2),
    ai_feedback TEXT,
    
    -- 知识点分析
    knowledge_points JSONB,
    
    attempted_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_attempts_user ON question_attempts(user_id);
CREATE INDEX idx_attempts_question ON question_attempts(question_id);
CREATE INDEX idx_attempts_session ON question_attempts(session_id);
CREATE INDEX idx_attempts_correct ON question_attempts(is_correct);
```

### 2.7 错题表 (wrong_questions)
```sql
CREATE TABLE wrong_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    
    -- 错误分析
    wrong_count INTEGER DEFAULT 1,
    wrong_reasons JSONB,                  -- 错误原因分类 ["概念混淆", "计算错误", "知识盲区"]
    user_notes TEXT,                      -- 用户笔记
    ai_analysis TEXT,                     -- AI错误分析
    
    -- 掌握程度
    mastery_level INTEGER DEFAULT 0,      -- 0-100
    last_wrong_at TIMESTAMP DEFAULT NOW(),
    last_review_at TIMESTAMP,
    next_review_at TIMESTAMP,             -- 下次复习时间
    
    -- 状态
    status VARCHAR(20) DEFAULT 'active',  -- active/mastered/archived
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_wrong_user ON wrong_questions(user_id);
CREATE INDEX idx_wrong_status ON wrong_questions(status);
CREATE INDEX idx_wrong_next_review ON wrong_questions(next_review_at);
CREATE INDEX idx_wrong_mastery ON wrong_questions(mastery_level);
```

### 2.8 闪卡组表 (flashcard_decks)
```sql
CREATE TABLE flashcard_decks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    title VARCHAR(300) NOT NULL,
    description TEXT,
    subject VARCHAR(100),
    is_ai_generated BOOLEAN DEFAULT false,
    card_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_decks_user ON flashcard_decks(user_id);
```

### 2.9 闪卡表 (flashcards)
```sql
CREATE TABLE flashcards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deck_id UUID REFERENCES flashcard_decks(id) ON DELETE CASCADE,
    
    front TEXT NOT NULL,                  -- 正面(问题)
    back TEXT NOT NULL,                   -- 背面(答案)
    card_type VARCHAR(20) DEFAULT 'basic', -- basic/cloze/image/formula
    
    -- FSRS 参数
    stability REAL DEFAULT 0,
    difficulty REAL DEFAULT 0,
    elapsed_days INTEGER DEFAULT 0,
    scheduled_days INTEGER DEFAULT 0,
    reps INTEGER DEFAULT 0,
    lapses INTEGER DEFAULT 0,
    state INTEGER DEFAULT 0,              -- 0=new, 1=learning, 2=review, 3=relearning
    due TIMESTAMP DEFAULT NOW(),
    last_review TIMESTAMP,
    
    -- 元数据
    source_document_id UUID REFERENCES documents(id),
    knowledge_point VARCHAR(200),
    tags JSONB,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cards_deck ON flashcards(deck_id);
CREATE INDEX idx_cards_due ON flashcards(due);
CREATE INDEX idx_cards_state ON flashcards(state);
```

### 2.10 复习日志表 (review_logs)
```sql
CREATE TABLE review_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
    
    rating INTEGER NOT NULL,              -- FSRS rating: 1=Again, 2=Hard, 3=Good, 4=Easy
    review_time INTEGER,                  -- 复习耗时(ms)
    
    -- FSRS状态快照
    stability_before REAL,
    stability_after REAL,
    difficulty_before REAL,
    difficulty_after REAL,
    
    reviewed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_review_logs_user ON review_logs(user_id);
CREATE INDEX idx_review_logs_card ON review_logs(flashcard_id);
```

### 2.11 学习计划表 (study_plans)
```sql
CREATE TABLE study_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    title VARCHAR(300) NOT NULL,
    plan_type VARCHAR(30) NOT NULL,       -- daily/weekly/phase/sprint
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    
    -- 目标
    target_score JSONB,                   -- {"politics": 75, "english": 80, "math": 130, "professional": 120}
    
    -- AI生成配置
    ai_generated BOOLEAN DEFAULT false,
    ai_config JSONB,                      -- 生成配置
    
    -- 状态
    status VARCHAR(20) DEFAULT 'active',  -- active/completed/paused/abandoned
    progress DECIMAL(5,2) DEFAULT 0,      -- 完成百分比
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_plans_user ON study_plans(user_id);
CREATE INDEX idx_plans_status ON study_plans(status);
```

### 2.12 计划任务表 (plan_tasks)
```sql
CREATE TABLE plan_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID REFERENCES study_plans(id) ON DELETE CASCADE,
    
    title VARCHAR(300) NOT NULL,
    description TEXT,
    task_type VARCHAR(30),                -- study/review/practice/exam/rest
    subject VARCHAR(100),
    
    -- 时间
    scheduled_date DATE NOT NULL,
    scheduled_start TIME,
    scheduled_end TIME,
    estimated_minutes INTEGER,
    
    -- 状态
    status VARCHAR(20) DEFAULT 'pending', -- pending/in_progress/completed/skipped
    actual_minutes INTEGER,
    completed_at TIMESTAMP,
    
    -- 关联
    related_document_id UUID,
    related_session_id UUID,
    
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tasks_plan ON plan_tasks(plan_id);
CREATE INDEX idx_tasks_date ON plan_tasks(scheduled_date);
CREATE INDEX idx_tasks_status ON plan_tasks(status);
```

### 2.13 学习追踪表 (study_sessions)
```sql
CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    session_type VARCHAR(30),             -- pomodoro/reading/practice/exam/flashcard
    subject VARCHAR(100),
    
    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP,
    duration_minutes INTEGER,
    
    -- 产出
    pages_read INTEGER,
    questions_attempted INTEGER,
    questions_correct INTEGER,
    cards_reviewed INTEGER,
    
    notes TEXT,
    mood VARCHAR(20),                     -- 学习状态
    focus_score INTEGER                   -- 专注度 1-10
);

CREATE INDEX idx_study_user ON study_sessions(user_id);
CREATE INDEX idx_study_started ON study_sessions(started_at);
```

### 2.14 AI对话表 (ai_conversations)
```sql
CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    title VARCHAR(300),
    conversation_type VARCHAR(30),        -- tutor/search/planning/exam_review
    subject VARCHAR(100),
    
    model_used VARCHAR(50),
    total_messages INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conv_user ON ai_conversations(user_id);
```

### 2.15 AI消息表 (ai_messages)
```sql
CREATE TABLE ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
    
    role VARCHAR(20) NOT NULL,            -- user/assistant/system
    content TEXT NOT NULL,
    
    -- AI元数据
    model VARCHAR(50),
    tokens_used INTEGER,
    latency_ms INTEGER,
    
    -- RAG引用
    references JSONB,                     -- [{"doc_id": "...", "chunk_id": "...", "relevance": 0.95}]
    
    -- 反馈
    user_rating INTEGER,                  -- 1-5
    user_feedback TEXT,
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_conv ON ai_messages(conversation_id);
```

### 2.16 院校目标表 (school_targets)
```sql
CREATE TABLE school_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    university VARCHAR(200) NOT NULL,
    major VARCHAR(200) NOT NULL,
    department VARCHAR(200),
    degree_type VARCHAR(20),              -- academic/professional
    
    -- 院校数据(缓存)
    exam_subjects JSONB,
    reference_books JSONB,
    score_lines JSONB,                    -- 历年分数线
    admission_ratio JSONB,               -- 报录比
    advisor_info JSONB,
    
    -- AI分析
    difficulty_rating INTEGER,            -- 1-10
    competition_level VARCHAR(20),
    ai_analysis TEXT,
    trend_prediction TEXT,
    
    data_updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_school_user ON school_targets(user_id);
```

### 2.17 标签表 (tags)
```sql
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    color VARCHAR(7),                     -- hex color
    category VARCHAR(50),                 -- subject/chapter/topic/custom
    usage_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, name)
);

CREATE INDEX idx_tags_user ON tags(user_id);
```

### 2.18 标签关联表 (tag_relations)
```sql
CREATE TABLE tag_relations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    entity_type VARCHAR(20) NOT NULL,     -- document/question/flashcard
    entity_id UUID NOT NULL,
    
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(tag_id, entity_type, entity_id)
);

CREATE INDEX idx_tag_rel_entity ON tag_relations(entity_type, entity_id);
```

## 三、索引策略

| 表 | 索引类型 | 用途 |
|---|---------|------|
| documents | GIN | 全文搜索 + JSON标签搜索 |
| questions | GIN | 知识点数组搜索 |
| wrong_questions | B-tree | 复习时间排序 |
| flashcards | B-tree | 到期时间排序 |
| study_sessions | BRIN | 时间范围查询(大数据量) |
| document_chunks | HNSW (向量索引) | 语义搜索 |

## 四、数据量预估

| 表 | 预估记录/用户 | 10万用户总量 |
|---|------------|------------|
| documents | 50-200 | 500万-2000万 |
| document_chunks | 500-5000 | 5000万-5亿 |
| questions | 100-500 | 1000万-5000万 |
| question_attempts | 500-3000 | 5000万-3亿 |
| flashcards | 100-1000 | 1000万-1亿 |
| study_sessions | 200-1000 | 2000万-1亿 |
</parameter>
</write_to_file>