"use client";

export const SETTINGS_STORAGE_KEY = "exam_os_settings";
export const SETTINGS_UPDATED_EVENT = "exam-os-settings-updated";

export interface ExamSettings {
  name: string;
  school: string;
  major: string;
  targetSchool: string;
  targetMajor: string;
  examDate: string;
  dailyGoalHours: number;
  focusMinutes: number;
  targetScore: {
    politics: number;
    english: number;
    major1: number;
    major2: number;
  };
}

export const DEFAULT_SETTINGS: ExamSettings = {
  name: "用户",
  school: "",
  major: "",
  targetSchool: "深圳大学",
  targetMajor: "新闻与传播（MJC）",
  examDate: "2026-12-20",
  dailyGoalHours: 8,
  focusMinutes: 50,
  targetScore: { politics: 75, english: 80, major1: 120, major2: 120 },
};

export function readSettings(): ExamSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const saved = JSON.parse(raw) as Partial<ExamSettings>;
    return {
      ...DEFAULT_SETTINGS,
      ...saved,
      targetScore: { ...DEFAULT_SETTINGS.targetScore, ...(saved.targetScore ?? {}) },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function writeSettings(settings: ExamSettings) {
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent(SETTINGS_UPDATED_EVENT, { detail: settings }));
}

export function daysUntil(date: string) {
  const target = new Date(`${date}T00:00:00`);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / 86_400_000));
}

export function formatExamDate(date: string) {
  const target = new Date(`${date}T00:00:00`);
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(target);
}
