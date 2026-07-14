// ============================================
// AI 考研OS · 核心类型定义
// ============================================

// ---- 用户 ----
export interface User {
  id: string;
  name: string;
  school: string;
  major: string;
  targetSchool: string;
  targetMajor: string;
  examDate: string; // ISO date
  createdAt: string;
}

// ---- 学科 ----
export interface Subject {
  id: string;
  name: string;
  code: string;
  targetScore: number;
  currentScore: number;
  progress: number; // 0-100
  color: string;
  icon: string;
}

// ---- 学习计划 ----
export interface StudyPlan {
  id: string;
  date: string;
  tasks: StudyTask[];
}

export interface StudyTask {
  id: string;
  subject: string;
  title: string;
  type: "reading" | "practice" | "review" | "exam" | "video";
  duration: number; // minutes
  completed: boolean;
  priority: "high" | "medium" | "low";
}

// ---- 学习记录 ----
export interface StudySession {
  id: string;
  userId: string;
  subject: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  type: string;
}

// ---- 知识库资料 ----
export interface Resource {
  id: string;
  title: string;
  type: "pdf" | "note" | "video" | "exam" | "web" | "image" | "audio";
  subject: string;
  chapters: string[];
  tags: string[];
  difficulty: number; // 1-5 stars
  source: string;
  summary: string;
  uploadDate: string;
  fileSize: string;
  pageCount?: number;
  status: "processed" | "processing" | "pending";
}

// ---- 知识点 ----
export interface KnowledgePoint {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  content: string;
  importance: "high" | "medium" | "low";
  tags: string[];
  relatedPoints: string[];
}

// ---- 复习卡片 ----
export interface Flashcard {
  id: string;
  front: string; // 问题/概念
  back: string;  // 答案/解释
  subject: string;
  type: "concept" | "formula" | "qa" | "term";
  difficulty: number;
  // FSRS fields
  stability: number;
  difficulty_factor: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: "new" | "learning" | "review" | "relearning";
  due: string;
  last_review: string | null;
}

// ---- 错题 ----
export interface WrongQuestion {
  id: string;
  subject: string;
  chapter: string;
  questionType: "choice" | "fill" | "short_answer" | "calculation" | "essay";
  difficulty: number;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  errorReason: string;
  errorCount: number;
  lastWrongDate: string;
  masteryLevel: number; // 0-100
  tags: string[];
  source: string;
}

// ---- 模拟考试 ----
export interface MockExam {
  id: string;
  title: string;
  subject: string;
  totalScore: number;
  duration: number; // minutes
  questions: ExamQuestion[];
  status: "not_started" | "in_progress" | "completed";
  score?: number;
  startTime?: string;
  endTime?: string;
}

export interface ExamQuestion {
  id: string;
  type: "choice" | "fill" | "short_answer" | "calculation" | "essay";
  content: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  score: number;
  earnedScore?: number;
  explanation: string;
}

// ---- AI 对话 ----
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: string[];
}

// ---- 院校情报 ----
export interface SchoolInfo {
  name: string;
  major: string;
  code: string;
  department: string;
  examSubjects: string[];
  scoreLines: ScoreLine[];
  admissionRatio: string;
  referenceBooks: string[];
  difficultyRating: number;
  trend: "rising" | "stable" | "declining";
}

export interface ScoreLine {
  year: number;
  total: number;
  politics: number;
  english: number;
  major1: number;
  major2: number;
  enrolled: number;
  applicants: number;
}

// ---- 仪表盘统计 ----
export interface DashboardStats {
  totalStudyHours: number;
  todayStudyMinutes: number;
  weeklyStudyMinutes: number[];
  completionRate: number;
  mockExamAverage: number;
  predictedScore: number;
  weakPoints: string[];
  strongPoints: string[];
  streakDays: number;
  totalCards: number;
  dueCards: number;
  wrongQuestions: number;
  resourcesCount: number;
}