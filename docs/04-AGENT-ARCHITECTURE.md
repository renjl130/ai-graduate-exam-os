# Agent 架构设计 - 佳乐考研

## 一、Agent 系统总览

```
                         ┌─────────────────────┐
                         │     User Input       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │      Intent Classifier         │
                    │  (Quick LLM - Small Model)     │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │     Coordinator Agent          │
                    │     (LangGraph Router)         │
                    │                               │
                    │  ┌───────────────────────┐    │
                    │  │  State Machine         │    │
                    │  │  - Route Decision      │    │
                    │  │  - Context Management   │    │
                    │  │  - Result Aggregation   │    │
                    │  │  - Error Handling       │    │
                    │  └───────────────────────┘    │
                    └───────────────┬───────────────┘
                                    │
          ┌─────────┬──────────┬────┴────┬──────────┬──────────┐
          ▼         ▼          ▼         ▼          ▼          ▼
    ┌──────────┐ ┌──────┐ ┌──────┐ ┌────────┐ ┌──────┐ ┌────────┐
    │Knowledge │ │Search│ │Tutor │ │Exam    │ │Plan  │ │School  │
    │Agent    │ │Agent │ │Agent │ │Agent   │ │Agent │ │Agent   │
    └────┬─────┘ └──┬───┘ └──┬───┘ └───┬────┘ └──┬───┘ └───┬────┘
         │          │        │         │         │         │
         ▼          ▼        ▼         ▼         ▼         ▼
    ┌──────────┐ ┌──────┐ ┌──────┐ ┌────────┐ ┌──────┐ ┌────────┐
    │Wrong Q   │ │Review│ │OCR   │ │Adaptive│ │School│ │Crawler │
    │Agent    │ │Agent │ │Agent │ │Agent   │ │Data  │ │Agent   │
    └──────────┘ └──────┘ └──────┘ └────────┘ └──────┘ └────────┘
```

## 二、Agent 详细设计

### 2.1 Coordinator Agent (协调者)

```python
# LangGraph State Machine
class CoordinatorState(TypedDict):
    user_input: str
    intent: str                    # classified intent
    context: dict                  # user context, history
    sub_agents_results: list       # results from sub-agents
    final_response: str           # aggregated response
    metadata: dict                # tokens used, latency, etc.

# Intent Types
INTENTS = {
    "knowledge_query": "KnowledgeAgent",      # 知识点查询
    "document_upload": "KnowledgeAgent",      # 上传资料
    "ai_search": "SearchAgent",              # 搜索
    "ask_question": "TutorAgent",            # 问问题
    "generate_exam": "ExamAgent",            # 生成考试
    "take_exam": "ExamAgent",               # 参加考试
    "review_wrong": "WrongQuestionAgent",    # 复习错题
    "create_plan": "PlannerAgent",           # 创建计划
    "school_info": "SchoolAgent",            # 院校信息
    "flashcard_review": "ReviewAgent",       # 闪卡复习
    "study_stats": "DashboardAgent",         # 学习统计
    "general_chat": "TutorAgent",            # 闲聊
}
```

### 2.2 Knowledge Agent (资料管理)

```
职责: 文档上传、解析、知识抽取、向量化
工具链:
├── File Parser (PDF/DOCX/PPT/Image/Video/Audio)
├── PaddleOCR (图片/扫描件文字识别)
├── Text Chunker (智能分块, 512 tokens, 64 overlap)
├── bge-m3 Embedding (向量化)
├── Milvus Client (存储向量)
├── LLM (摘要生成、标签提取、章节识别)
└── PostgreSQL Client (结构化存储)
```

### 2.3 Search Agent (搜索引擎)

```
职责: 混合搜索、结果排序、相关推荐
工具链:
├── BM25 Index (关键词搜索)
├── Milvus Client (语义搜索)
├── bge-reranker (结果重排序)
├── PostgreSQL Full-text (全文搜索)
├── Tag Search (标签搜索)
└── LLM (查询理解、结果摘要)
```

### 2.4 Tutor Agent (AI导师 - 核心)

```
职责: 解答问题、解释知识、辅导学习
工具链:
├── Model Router (智能路由到不同模型)
│   ├── Simple → DeepSeek-V3 (低成本)
│   ├── Complex → Qwen-Max / DeepSeek-R1 (高质量)
│   └── Local → Ollama (离线/隐私)
├── RAG Pipeline (知识检索增强)
│   ├── Search Agent (检索相关资料)
│   ├── Context Builder (构建上下文)
│   └── Prompt Template (提示模板)
├── Response Generator (生成回答)
│   ├── Explanation (解释)
│   ├── Examples (例题)
│   ├── Diagrams (图示 - Mermaid/ASCII)
│   ├── Extensions (扩展知识)
│   └── Suggestions (学习建议)
└── Feedback Collector (收集反馈)
```

### 2.5 Exam Agent (考试系统)

```
职责: AI出题、考试管理、自动评分
工具链:
├── Question Generator (题目生成)
│   ├── Choice Question Gen
│   ├── Fill-in-the-blank Gen
│   ├── Calculation Gen
│   ├── Essay Gen
│   └── Reading Comprehension Gen
├── Difficulty Controller (难度控制)
├── Answer Checker (答案校验)
│   ├── Objective Auto-grade
│   └── Subjective AI-grade
├── Explanation Generator (解析生成)
├── Performance Analyzer (成绩分析)
└── Weak Point Detector (薄弱点检测)
```

### 2.6 Planner Agent (学习规划)

```
职责: 生成学习计划、自适应调整
工具链:
├── Profile Analyzer (分析用户水平)
├── Goal Decomposer (目标分解)
├── Schedule Generator (排课生成)
│   ├── Daily Planner
│   ├── Weekly Planner
│   ├── Phase Planner (基础/强化/冲刺)
│   └── Sprint Planner
├── Adaptive Adjuster (自适应调整)
│   ├── Performance Monitor
│   ├── Gap Detector
│   └── Re-planner
└── Milestone Tracker (里程碑追踪)
```

### 2.7 School Agent (院校情报)

```
职责: 院校信息收集、分析、报告
工具链:
├── School Database (院校数据库)
├── Web Crawler (网络爬虫)
│   ├── 研招网
│   ├── 院校官网
│   ├── 考研论坛
│   └── 经验帖
├── Data Aggregator (数据聚合)
├── Trend Analyzer (趋势分析)
├── Report Generator (报告生成)
└── Comparison Engine (院校对比)
```

### 2.8 Review Agent (间隔复习)

```
职责: FSRS调度、卡片管理、复习提醒
工具链:
├── FSRS Scheduler (FSRS算法)
│   ├── Card State Machine
│   ├── Interval Calculator
│   └── Optimal Review Time
├── Card Generator (AI生成卡片)
│   ├── QA Card
│   ├── Cloze Card
│   ├── Formula Card
│   └── Concept Card
├── Review Session Manager
└── Performance Tracker
```

## 三、Agent 通信协议

### 3.1 Agent Message Format
```python
class AgentMessage:
    id: str
    source_agent: str
    target_agent: str
    message_type: str          # request/response/error
    payload: dict
    timestamp: datetime
    trace_id: str              # 用于追踪完整调用链
```

### 3.2 共享状态 (LangGraph)
```python
class SharedState:
    # 用户上下文
    user_id: str
    user_profile: dict
    current_subject: str
    
    # 对话上下文
    conversation_history: list
    current_topic: str
    
    # 执行状态
    agents_invoked: list
    intermediate_results: dict
    
    # 全局配置
    model_config: dict
    feature_flags: dict
```

## 四、Model Router 策略

```python
class ModelRouter:
    """智能模型路由，平衡成本与质量"""
    
    ROUTING_RULES = {
        # 简单任务 → 小模型
        "greeting": "deepseek-v3",
        "simple_question": "deepseek-v3",
        "translation": "deepseek-v3",
        "formatting": "deepseek-v3",
        
        # 中等任务 → 中等模型
        "explanation": "deepseek-v3",
        "summary": "deepseek-v3",
        "question_generation": "deepseek-v3",
        
        # 复杂任务 → 大模型
        "complex_reasoning": "deepseek-r1",
        "essay_grading": "qwen-max",
        "math_proof": "deepseek-r1",
        "code_analysis": "deepseek-r1",
        
        # 批量任务 → 本地模型
        "embedding": "bge-m3",
        "classification": "local-classifier",
        "keyword_extraction": "local-ner",
    }
    
    def route(self, task_type: str, complexity: float) -> str:
        if complexity < 0.3:
            return self.ROUTING_RULES.get(task_type, "deepseek-v3")
        elif complexity < 0.7:
            return self.ROUTING_RULES.get(task_type, "deepseek-v3")
        else:
            return self.ROUTING_RULES.get(task_type, "deepseek-r1")
```

## 五、RAG Pipeline

```
Query
  │
  ▼
┌─────────────────┐
│ Query Expansion  │  ← 同义词扩展、关键词提取
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Hybrid Retrieval │  ← BM25 + Vector + Tag
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Reranking      │  ← bge-reranker
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Context Building │  ← Top-K 结果构建上下文
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Prompt Template │  ← 系统提示 + 上下文 + 用户问题
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  LLM Generation  │  ← 生成回答
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Post-processing  │  ← 格式化、引用标注、安全检查
└─────────────────┘
```

## 六、错误处理与容错

```python
class AgentErrorHandler:
    STRATEGIES = {
        "model_timeout": "retry_with_fallback_model",
        "model_rate_limit": "queue_and_wait",
        "search_no_results": "expand_query_and_retry",
        "ocr_failed": "return_partial_result",
        "vector_db_down": "fallback_to_keyword_search",
        "unknown_error": "log_and_return_generic_response"
    }
```
</parameter>
</write_to_file>