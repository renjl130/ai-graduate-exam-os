import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function safeDisplayName(value?: string | null) {
  const name = String(value || '').trim();
  return name && !/^[?\uFFFD\s]+$/.test(name) ? name : '佳乐同学';
}

export function safeText(value: unknown, fallback: string) {
  const text = String(value || '').trim();
  return text && !/^[?\uFFFD\s]+$/.test(text) ? text : fallback;
}
