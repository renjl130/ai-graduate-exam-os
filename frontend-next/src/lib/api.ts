/**
 * AI 考研OS · API 客户端 v3.0
 * 生产级：JWT认证 + 错误处理 + 重试机制
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

// Token管理
let accessToken: string | null = null;

export function setToken(token: string | null) {
  accessToken = token;
  if (token) {
    localStorage.setItem("access_token", token);
  } else {
    localStorage.removeItem("access_token");
  }
}

export function getToken(): string | null {
  if (!accessToken) {
    accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  }
  return accessToken;
}

export function clearToken() {
  accessToken = null;
  localStorage.removeItem("access_token");
}

// 通用请求头
function getHeaders(includeAuth: boolean = true): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

// 错误处理
class ApiError extends Error {
  constructor(
    public status: number,
    public detail: string,
    public data?: any
  ) {
    super(detail);
    this.name = "ApiError";
  }
}

// 通用请求方法
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  retries: number = 2
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...getHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorData.detail || `请求失败: ${response.status}`,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (attempt === retries) {
        throw new Error(`网络错误: ${error instanceof Error ? error.message : "未知错误"}`);
      }

      // 等待后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  throw new Error("请求失败");
}

// SSE流式请求
async function* streamRequest(
  endpoint: string,
  body: any
): AsyncGenerator<any, void, unknown> {
  const url = `${API_BASE}${endpoint}`;
  const token = getToken();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.detail || `请求失败: ${response.status}`,
      errorData
    );
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("无法读取响应流");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim();
        if (data === "[DONE]") return;
        try {
          yield JSON.parse(data);
        } catch {
          // 忽略解析错误
        }
      }
    }
  }

  if (buffer.startsWith("data: ")) {
    const data = buffer.slice(6).trim();
    if (data !== "[DONE]") {
      try {
        yield JSON.parse(data);
      } catch {
        // 忽略解析错误
      }
    }
  }
}

// ============ 认证 API ============

export interface UserRegisterData {
  email: string;
  username: string;
  password: string;
  target_school?: string;
  target_major?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    username: string;
    target_school?: string;
    target_major?: string;
  };
}

export const authApi = {
  register: (data: UserRegisterData) =>
    request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }, 0),

  login: (data: UserLoginData) =>
    request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }, 0),

  getMe: () =>
    request<any>("/api/auth/me"),

  updateMe: (data: any) =>
    request<any>("/api/auth/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ============ AI Chat API ============

export interface ChatRequest {
  message: string;
  subject?: string;
  model?: string;
  conversation_id?: string;
}

export interface Conversation {
  id: string;
  title: string;
  subject?: string;
  message_count: number;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  provider?: string;
  created_at: string;
}

export interface StreamCallbacks {
  onStatus?: (status: string) => void;
  onContent?: (content: string) => void;
  onDone?: (data: { model: string; provider: string; conversation_id: string }) => void;
  onError?: (error: string) => void;
}

export async function chatStream(
  request: ChatRequest,
  callbacks: StreamCallbacks
): Promise<string | null> {
  try {
    const token = getToken();
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      callbacks.onError?.(errorData.detail || `HTTP Error: ${response.status}`);
      return null;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let conversationId: string | null = null;
    let buffer = "";

    if (!reader) return null;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          switch (data.type) {
            case "status":
              callbacks.onStatus?.(data.content);
              break;
            case "content":
              callbacks.onContent?.(data.content);
              break;
            case "done":
              conversationId = data.conversation_id;
              callbacks.onDone?.(data);
              break;
            case "error":
              callbacks.onError?.(data.content);
              break;
          }
        } catch { }
      }
    }

    return conversationId;
  } catch (err) {
    callbacks.onError?.(err instanceof Error ? err.message : "网络连接失败，请检查后端服务");
    return null;
  }
}

export const chatApi = {
  stream: (request: ChatRequest) => streamRequest("/api/chat", request),

  listConversations: (page = 1, limit = 50) =>
    request<{ total: number; page: number; conversations: Conversation[] }>(
      `/api/conversations?page=${page}&limit=${limit}`
    ),

  getMessages: (conversationId: string) =>
    request<{ conversation_id: string; messages: Message[] }>(
      `/api/conversations/${conversationId}/messages`
    ),

  deleteConversation: (conversationId: string) =>
    request<{ status: string }>(`/api/conversations/${conversationId}`, {
      method: "DELETE",
    }),
};

// ============ 闪卡 API ============

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject?: string;
  topic?: string;
  card_type: string;
  difficulty: number;
  stability: number;
  due_date?: string;
  review_count: number;
  created_at: string;
}

export interface FlashcardStats {
  total_cards: number;
  due_now: number;
  reviewed_today: number;
}

export const flashcardApi = {
  getDue: (subject?: string, limit = 20) =>
    request<{ total_due: number; cards: Flashcard[] }>(
      `/api/flashcards/due?${subject ? `subject=${subject}&` : ""}limit=${limit}`
    ),

  list: (subject?: string, page = 1, limit = 50) =>
    request<{ total: number; page: number; cards: Flashcard[] }>(
      `/api/flashcards?${subject ? `subject=${subject}&` : ""}page=${page}&limit=${limit}`
    ),

  create: (data: { front: string; back: string; subject?: string; topic?: string }) =>
    request<{ id: string; status: string }>("/api/flashcards", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  generate: (data: { subject: string; count?: number; topic?: string }) =>
    request<{ generated: number; cards: any[] }>("/api/flashcards/generate", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  review: (cardId: string, rating: number) =>
    request<any>(`/api/flashcards/${cardId}/review`, {
      method: "POST",
      body: JSON.stringify({ rating }),
    }),

  stats: () => request<FlashcardStats>("/api/flashcards/stats"),
};

// 保持向后兼容的导出
export const getDueCards = flashcardApi.getDue;
export const createFlashcard = flashcardApi.create;
export const generateFlashcards = flashcardApi.generate;
export const reviewFlashcard = flashcardApi.review;
export const getFlashcardStats = flashcardApi.stats;

// ============ 文件 API ============

export interface FileInfo {
  name: string;
  path: string;
  size: number;
  size_display: string;
  modified: string;
  type: string;
  extension: string;
}

export const fileApi = {
  list: () => request<{ files: FileInfo[]; total: number }>("/api/files"),

  getContent: (path: string) =>
    request<{ content: string; type: string; extension: string }>(
      `/api/files/content/${path}`
    ),

  getPdfUrl: (path: string) => {
    const encoded = path.split("/").map(encodeURIComponent).join("/");
    const token = getToken();
    const query = token ? `?token=${encodeURIComponent(token)}` : "";
    return `${API_BASE}/api/files/pdf/${encoded}${query}`;
  },

  upload: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = getToken();
    const response = await fetch(`${API_BASE}/api/files/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(response.status, errorData.detail || "上传失败");
    }

    return response.json();
  },

  delete: (path: string) =>
    request<{ status: string }>(`/api/files/${path}`, {
      method: "DELETE",
    }),
};

// 保持向后兼容的导出
export const getFileContent = fileApi.getContent;
export const getPdfUrl = fileApi.getPdfUrl;

// ============ AI 功能 API ============

export const aiApi = {
  organize: (content: string, topic?: string) =>
    request<{ result: string }>("/api/ai/organize", {
      method: "POST",
      body: JSON.stringify({ content, topic }),
    }),

  analyzeFile: (filePath: string) =>
    request<{ result: string; filename: string }>("/api/ai/analyze-file", {
      method: "POST",
      body: JSON.stringify({ file_path: filePath }),
    }),

  generateExam: (subject: string, count?: number, difficulty?: string) =>
    request<any>("/api/exam/generate", {
      method: "POST",
      body: JSON.stringify({ subject, count, difficulty }),
    }),

  generateStudyPlan: (subjects?: string[], hoursPerDay?: number, days?: number) =>
    request<any>("/api/study-plan/generate", {
      method: "POST",
      body: JSON.stringify({ subjects, hours_per_day: hoursPerDay, days }),
    }),
};

// 保持向后兼容的导出
export const organizeContent = aiApi.organize;
export const analyzeFile = aiApi.analyzeFile;
export const generateExam = aiApi.generateExam;
export const generateStudyPlan = aiApi.generateStudyPlan;

// 文件整理API（向后兼容）
export async function organizeFile(filePath: string, topic?: string) {
  const res = await fetch(`${API_BASE}/api/ai/organize-file`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ file_path: filePath, topic }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ============ 错题 API ============

export interface WrongQuestion {
  id: string;
  content: string;
  subject: string;
  topic?: string;
  answer?: string;
  user_answer?: string;
  error_type?: string;
  error_analysis?: string;
  wrong_count: number;
  mastery: number;
  last_wrong_at?: string;
  created_at: string;
}

export const wrongQuestionApi = {
  list: (subject?: string) =>
    request<{ questions: WrongQuestion[]; total: number }>(
      `/api/wrong-questions${subject ? `?subject=${subject}` : ""}`
    ),

  create: (data: any) =>
    request<{ id: string; status: string }>("/api/wrong-questions", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    request<{ status: string }>(`/api/wrong-questions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ status: string }>(`/api/wrong-questions/${id}`, {
      method: "DELETE",
    }),

  analysis: () =>
    request<any>("/api/wrong-questions/analysis"),
};

// 保持向后兼容的导出
export const getWrongQuestions = wrongQuestionApi.list;
export const createWrongQuestion = wrongQuestionApi.create;
export const updateWrongQuestion = wrongQuestionApi.update;
export const deleteWrongQuestion = wrongQuestionApi.delete;
export const getWrongQuestionsAnalysis = wrongQuestionApi.analysis;

// ============ 学习计划 API ============

export interface StudyPlan {
  id: string;
  target_date: string;
  daily_hours: number;
  subjects: any;
  phases?: any;
  daily_plan?: any;
  status: string;
  created_at: string;
}

export const studyPlanApi = {
  list: (date?: string) =>
    request<{ plans: StudyPlan[]; total: number }>(
      `/api/study-plans${date ? `?date=${date}` : ""}`
    ),

  create: (data: { title: string; subject: string; duration: number; priority: string; date: string }) =>
    request<{ id: string; status: string }>("/api/study-plans", {
      method: "POST",
      body: JSON.stringify(data),
    }, 0),

  toggle: (id: string) =>
    request<{ status: string; completed: boolean }>(`/api/study-plans/${id}/toggle`, {
      method: "PUT",
    }, 0),

  delete: (id: string) =>
    request<{ status: string }>(`/api/study-plans/${id}`, {
      method: "DELETE",
    }, 0),
};

// 保持向后兼容的导出
export const getStudyPlans = studyPlanApi.list;
export const createStudyPlan = studyPlanApi.create;
export const toggleStudyPlan = studyPlanApi.toggle;
export const deleteStudyPlan = studyPlanApi.delete;

// ============ 考试 API ============

export interface ExamRecord {
  id: string;
  subject: string;
  difficulty: string;
  total_questions: number;
  total_score: number;
  score: number;
  accuracy: number;
  time_used?: number;
  status: string;
  created_at: string;
  completed_at?: string;
}

export const examApi = {
  list: () =>
    request<{ exams: ExamRecord[]; total: number }>("/api/exams"),

  save: (data: any) =>
    request<{ id: string; accuracy: number; status: string }>("/api/exams/save", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getDetail: (id: string) =>
    request<any>(`/api/exams/${id}`),
};

// 保持向后兼容的导出
export const getExamHistory = examApi.list;
export const saveExamResult = examApi.save;

// ============ Dashboard API ============

export interface DashboardStats {
  today: {
    chat_messages: number;
    flashcards_reviewed: number;
    exams_taken: number;
    total_activities: number;
    study_minutes: number;
  };
  totals: {
    conversations: number;
    messages: number;
    flashcards: number;
    wrong_questions: number;
    exams: number;
  };
  due: {
    flashcards: number;
    wrong_questions: number;
  };
  performance: {
    exam_avg_accuracy: number;
    streak_days: number;
  };
  ai: {
    provider: string;
    default_model: string;
    name: string;
  };
}

export const dashboardApi = {
  getStats: () => request<DashboardStats>("/api/dashboard/stats"),
};

// 保持向后兼容的导出
export const getDashboardStats = dashboardApi.getStats;

// ============ 健康检查 API ============

export const healthApi = {
  check: () =>
    request<{
      status: string;
      version: string;
      database: string;
      ai_provider: string;
      ai_model: string;
      timestamp: string;
    }>("/api/health"),

  getModels: () =>
    request<{ provider: string; models: any[] }>("/api/chat/models"),
};

// 保持向后兼容的导出
export const getHealth = healthApi.check;
export const getModels = healthApi.getModels;

// 导出ApiError供组件使用
export { ApiError };
