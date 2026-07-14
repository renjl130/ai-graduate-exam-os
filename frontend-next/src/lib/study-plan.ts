export type StudyPriority = "high" | "medium" | "low";

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  duration: number;
  priority: StudyPriority;
  completed: boolean;
  date: string;
}

export interface StudyPlanRecord {
  id: string;
  target_date: string;
  daily_hours: number;
  subjects: unknown;
  daily_plan?: unknown;
}

export const STUDY_PLAN_STORAGE_KEY = "exam_os_study_plan";
export const STUDY_PLAN_UPDATED_EVENT = "exam-os-plan-updated";

export function localDateKey(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function normalizePriority(value: unknown): StudyPriority {
  return value === "high" || value === "low" ? value : "medium";
}

function parseDailyPlan(value: unknown): Record<string, unknown> {
  if (!value) return {};
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
    } catch {
      return {};
    }
  }
  return typeof value === "object" ? value as Record<string, unknown> : {};
}

export function normalizeStudyPlan(record: StudyPlanRecord): StudyTask {
  const detail = parseDailyPlan(record.daily_plan);
  return {
    id: String(record.id),
    title: String(detail.title || "未命名学习任务"),
    subject: String(record.subjects || "440"),
    duration: Math.max(1, Number(record.daily_hours) || 30),
    priority: normalizePriority(detail.priority),
    completed: Boolean(detail.completed),
    date: String(record.target_date || localDateKey()),
  };
}

export function loadCachedStudyTasks(): StudyTask[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STUDY_PLAN_STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((task) => task && typeof task === "object")
      .map((task) => ({
        id: String(task.id || `local_${crypto.randomUUID()}`),
        title: String(task.title || "未命名学习任务"),
        subject: String(task.subject || "440"),
        duration: Math.max(1, Number(task.duration) || 30),
        priority: normalizePriority(task.priority),
        completed: Boolean(task.completed),
        date: String(task.date || localDateKey()),
      }));
  } catch {
    return [];
  }
}

export function cacheStudyTasks(tasks: StudyTask[], notify = true) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STUDY_PLAN_STORAGE_KEY, JSON.stringify(tasks));
  if (notify) window.dispatchEvent(new CustomEvent(STUDY_PLAN_UPDATED_EVENT));
}

export function isLocalStudyTask(task: StudyTask) {
  return task.id.startsWith("local_") || /^\d+(?:_[a-z0-9]+)?$/i.test(task.id);
}

export function studyTaskFingerprint(task: Pick<StudyTask, "title" | "subject" | "date">) {
  return `${task.date}|${task.subject.trim().toLowerCase()}|${task.title.trim().toLowerCase()}`;
}
