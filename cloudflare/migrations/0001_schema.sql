PRAGMA foreign_keys = ON;

-- users
CREATE TABLE users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            username TEXT UNIQUE NOT NULL,
            hashed_password TEXT NOT NULL,
            avatar TEXT,
            target_school TEXT,
            target_major TEXT,
            exam_date TEXT,
            is_active INTEGER DEFAULT 1,
            is_premium INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            updated_at TEXT DEFAULT (CURRENT_TIMESTAMP)
        );

-- subjects
CREATE TABLE subjects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            code TEXT,
            description TEXT,
            icon TEXT,
            color TEXT,
            sort_order INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP)
        );

-- chapters
CREATE TABLE chapters (
            id TEXT PRIMARY KEY,
            subject_id TEXT NOT NULL,
            parent_id TEXT,
            name TEXT NOT NULL,
            description TEXT,
            sort_order INTEGER DEFAULT 0,
            level INTEGER DEFAULT 1,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (subject_id) REFERENCES subjects(id),
            FOREIGN KEY (parent_id) REFERENCES chapters(id)
        );

-- knowledge_points
CREATE TABLE knowledge_points (
            id TEXT PRIMARY KEY,
            subject_id TEXT NOT NULL,
            chapter_id TEXT NOT NULL,
            parent_id TEXT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            summary TEXT,
            importance TEXT DEFAULT 'medium',
            frequency TEXT DEFAULT 'medium',
            level INTEGER DEFAULT 1,
            tags TEXT,
            exam_tips TEXT,
            answer_template TEXT,
            memory_tips TEXT,
            ai_explanation TEXT,
            source TEXT,
            sort_order INTEGER DEFAULT 0,
            mastery INTEGER DEFAULT 0,
            review_count INTEGER DEFAULT 0,
            last_reviewed TEXT,
            next_review TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            updated_at TEXT DEFAULT (CURRENT_TIMESTAMP), base_content TEXT, key_points TEXT, case_analysis TEXT, common_mistakes TEXT, training_steps TEXT, self_test TEXT, quality_version INTEGER DEFAULT 0,
            owner_id TEXT,
            FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (subject_id) REFERENCES subjects(id),
            FOREIGN KEY (chapter_id) REFERENCES chapters(id),
            FOREIGN KEY (parent_id) REFERENCES knowledge_points(id)
        );

-- knowledge_relations
CREATE TABLE knowledge_relations (
            id TEXT PRIMARY KEY,
            source_id TEXT NOT NULL,
            target_id TEXT NOT NULL,
            relation_type TEXT NOT NULL,
            description TEXT,
            weight REAL DEFAULT 1.0,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (source_id) REFERENCES knowledge_points(id),
            FOREIGN KEY (target_id) REFERENCES knowledge_points(id)
        );

-- exam_questions
CREATE TABLE exam_questions (
            id TEXT PRIMARY KEY,
            knowledge_point_id TEXT,
            subject TEXT NOT NULL,
            year INTEGER,
            school TEXT,
            question_type TEXT NOT NULL,
            content TEXT NOT NULL,
            options TEXT,
            answer TEXT NOT NULL,
            score INTEGER,
            analysis TEXT,
            scoring_points TEXT,
            answer_framework TEXT,
            difficulty INTEGER DEFAULT 3,
            frequency INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (knowledge_point_id) REFERENCES knowledge_points(id)
        );

-- question_bank
CREATE TABLE question_bank (
            id TEXT PRIMARY KEY,
            subject TEXT NOT NULL,
            type TEXT NOT NULL,
            question TEXT NOT NULL,
            options TEXT,
            answer TEXT NOT NULL,
            explanation TEXT,
            score INTEGER DEFAULT 5,
            difficulty TEXT DEFAULT 'medium',
            tags TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP)
        );

-- conversations
CREATE TABLE conversations (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            title TEXT DEFAULT '新对话',
            subject TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            updated_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            message_count INTEGER DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- messages
CREATE TABLE messages (
            id TEXT PRIMARY KEY,
            conversation_id TEXT NOT NULL,
            role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
            content TEXT NOT NULL,
            model TEXT,
            provider TEXT,
            tokens_used INTEGER,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
        );

-- flashcards
CREATE TABLE flashcards (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            front TEXT NOT NULL,
            back TEXT NOT NULL,
            subject TEXT,
            topic TEXT,
            card_type TEXT DEFAULT 'qa',
            difficulty REAL DEFAULT 0.5,
            stability REAL DEFAULT 2.5,
            retrievability REAL DEFAULT 0.9,
            due_date TEXT DEFAULT (CURRENT_TIMESTAMP),
            last_review TEXT,
            review_count INTEGER DEFAULT 0,
            lapse_count INTEGER DEFAULT 0,
            source_doc TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- flashcard_reviews
CREATE TABLE flashcard_reviews (
            id TEXT PRIMARY KEY,
            card_id TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 4),
            review_duration INTEGER,
            stability_before REAL,
            stability_after REAL,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (card_id) REFERENCES flashcards(id) ON DELETE CASCADE
        );

-- wrong_questions
CREATE TABLE wrong_questions (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            content TEXT NOT NULL,
            subject TEXT NOT NULL,
            topic TEXT,
            answer TEXT,
            user_answer TEXT,
            error_type TEXT,
            error_analysis TEXT,
            wrong_count INTEGER DEFAULT 1,
            mastery INTEGER DEFAULT 0,
            last_wrong_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            next_review TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- study_plans
CREATE TABLE study_plans (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            target_date TEXT NOT NULL,
            daily_hours INTEGER DEFAULT 8,
            subjects TEXT,
            phases TEXT,
            daily_plan TEXT,
            status TEXT DEFAULT 'active',
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- exams
CREATE TABLE exams (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            subject TEXT NOT NULL,
            difficulty TEXT DEFAULT 'medium',
            total_questions INTEGER,
            total_score REAL,
            score REAL,
            accuracy REAL,
            time_limit INTEGER,
            time_used INTEGER,
            status TEXT DEFAULT 'created',
            questions TEXT,
            answers TEXT,
            analysis TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            completed_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- study_records
CREATE TABLE study_records (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            activity_type TEXT NOT NULL,
            subject TEXT,
            duration_minutes INTEGER,
            score REAL,
            details TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- study_sessions
CREATE TABLE study_sessions (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            knowledge_point_id TEXT,
            subject TEXT,
            activity_type TEXT NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT,
            duration_seconds INTEGER,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

-- posts
CREATE TABLE posts (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            tags TEXT,
            likes INTEGER DEFAULT 0,
            comments INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            updated_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- import_jobs
CREATE TABLE import_jobs (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            filename TEXT NOT NULL,
            file_path TEXT NOT NULL,
            file_type TEXT NOT NULL,
            subject TEXT,
            status TEXT DEFAULT 'pending',
            result_summary TEXT,
            knowledge_count INTEGER DEFAULT 0,
            error_message TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            completed_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- vocabulary
CREATE TABLE vocabulary (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            word TEXT NOT NULL,
            phonetic TEXT,
            meaning TEXT NOT NULL,
            example TEXT,
            category TEXT DEFAULT '核心词汇',
            subject TEXT DEFAULT 'english',
            mastery INTEGER DEFAULT 0,
            review_count INTEGER DEFAULT 0,
            last_reviewed TEXT,
            next_review TEXT,
            is_custom INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

-- vocabulary_reviews
CREATE TABLE vocabulary_reviews (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            word_id TEXT NOT NULL,
            rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 4),
            stability REAL DEFAULT 2.5,
            difficulty REAL DEFAULT 0.5,
            due_date TEXT NOT NULL,
            review_count INTEGER DEFAULT 0,
            lapse_count INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (word_id) REFERENCES vocabulary(id) ON DELETE CASCADE,
            UNIQUE(user_id, word_id)
        );

-- knowledge_reviews
CREATE TABLE knowledge_reviews (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            knowledge_point_id TEXT NOT NULL,
            stability REAL DEFAULT 2.5,
            difficulty REAL DEFAULT 0.5,
            review_count INTEGER DEFAULT 0,
            lapse_count INTEGER DEFAULT 0,
            due_date TEXT NOT NULL,
            last_review TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            updated_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (knowledge_point_id) REFERENCES knowledge_points(id),
            UNIQUE(user_id, knowledge_point_id)
        );

-- search_index
CREATE TABLE search_index (
            id TEXT PRIMARY KEY,
            content_type TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            subject TEXT,
            tags TEXT,
            importance INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP)
        );

-- ai_summaries
CREATE TABLE ai_summaries (
            id TEXT PRIMARY KEY,
            knowledge_point_id TEXT NOT NULL,
            summary_type TEXT NOT NULL,
            content TEXT NOT NULL,
            model TEXT,
            created_at TEXT DEFAULT (CURRENT_TIMESTAMP),
            FOREIGN KEY (knowledge_point_id) REFERENCES knowledge_points(id)
        );

CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_eq_kp ON exam_questions(knowledge_point_id);
CREATE INDEX idx_eq_subject ON exam_questions(subject, year);
CREATE INDEX idx_flashcards_due ON flashcards(due_date, subject);
CREATE INDEX idx_flashcards_user ON flashcards(user_id);
CREATE INDEX idx_kp_chapter ON knowledge_points(chapter_id);
CREATE INDEX idx_kp_importance ON knowledge_points(importance, frequency);
CREATE INDEX idx_kp_parent ON knowledge_points(parent_id);
CREATE INDEX idx_kp_subject ON knowledge_points(subject_id);
CREATE INDEX idx_kr_due ON knowledge_reviews(due_date);
CREATE INDEX idx_kr_kp ON knowledge_reviews(knowledge_point_id);
CREATE INDEX idx_kr_source ON knowledge_relations(source_id);
CREATE INDEX idx_kr_target ON knowledge_relations(target_id);
CREATE INDEX idx_kr_user ON knowledge_reviews(user_id);
CREATE INDEX idx_messages_conv ON messages(conversation_id);
CREATE INDEX idx_posts_created ON posts(created_at);
CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_search_subject ON search_index(subject);
CREATE INDEX idx_search_type ON search_index(content_type);
CREATE INDEX idx_study_records_date ON study_records(created_at);
CREATE INDEX idx_study_records_user ON study_records(user_id);
CREATE INDEX idx_vocab_due ON vocabulary(next_review);
CREATE INDEX idx_vocab_user ON vocabulary(user_id);
CREATE INDEX idx_vocab_word ON vocabulary(word);
CREATE INDEX idx_vr_due ON vocabulary_reviews(due_date);
CREATE INDEX idx_vr_user ON vocabulary_reviews(user_id);
CREATE INDEX idx_vr_word ON vocabulary_reviews(word_id);
CREATE INDEX idx_wrong_questions_user ON wrong_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_points_owner ON knowledge_points(owner_id);
CREATE INDEX IF NOT EXISTS idx_import_jobs_user ON import_jobs(user_id, created_at);
