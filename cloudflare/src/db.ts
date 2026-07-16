export function id(prefix = "id"): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, "")}`;
}

export function now(): string {
  return new Date().toISOString().replace("T", " ").replace("Z", "");
}

export function dateAfter(days: number): string {
  return new Date(Date.now() + days * 86400_000).toISOString().replace("T", " ").replace("Z", "");
}

export function safeJson<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value !== "string") return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function serializeJson(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  return JSON.stringify(value);
}

export function parseRow<T extends Record<string, any>>(row: T, fields: string[]): T {
  const copy = { ...row };
  for (const field of fields) {
    if (field in copy) copy[field as keyof T] = safeJson(copy[field], []) as T[keyof T];
  }
  return copy;
}

export async function all<T = Record<string, unknown>>(
  db: D1Database,
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await db.prepare(sql).bind(...params).all<T>();
  return result.results || [];
}

export async function first<T = Record<string, unknown>>(
  db: D1Database,
  sql: string,
  params: unknown[] = [],
): Promise<T | null> {
  return await db.prepare(sql).bind(...params).first<T>();
}

export async function run(db: D1Database, sql: string, params: unknown[] = []): Promise<D1Result> {
  return await db.prepare(sql).bind(...params).run();
}

export function asNumber(value: string | undefined | null, fallback: number, min?: number, max?: number): number {
  const parsed = Number(value);
  let result = Number.isFinite(parsed) ? parsed : fallback;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
}

export function publicUser<T extends Record<string, any>>(user: T): Omit<T, "hashed_password"> {
  const { hashed_password: _hidden, ...safe } = user;
  return safe;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function tokens(text: string): string[] {
  return [...new Set(text.toLowerCase().split(/[\s,，。！？、；;:：/\\|（）()\[\]{}<>《》“”"'`~!@#$%^&*+=_-]+/).filter((x) => x.length > 1))];
}

export function likePattern(value: string, maxBytes = 40): string {
  const clean = value.replace(/[\%_]/g, " ").trim();
  let truncated = "";
  const encoder = new TextEncoder();
  for (const character of clean) {
    const candidate = truncated + character;
    if (encoder.encode(candidate).byteLength > maxBytes) break;
    truncated = candidate;
  }
  return `%${truncated}%`;
}
