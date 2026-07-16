export interface Env {
  DB: D1Database;
  FILES: KVNamespace;
  ASSETS: Fetcher;
  AI: {
    run(model: string, input: Record<string, unknown>, options?: Record<string, unknown>): Promise<any>;
  };
  JWT_SECRET: string;
  APP_NAME: string;
  APP_VERSION: string;
  AI_MODEL: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  avatar?: string | null;
  target_school?: string | null;
  target_major?: string | null;
  exam_date?: string | null;
  is_active: number;
  is_premium: number;
  created_at?: string;
  updated_at?: string;
}

export type Variables = {
  user: AuthUser;
};
