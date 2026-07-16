import { Hono } from "hono";
import type { Env, Variables, AuthUser } from "./env";
import { createToken, hashPassword, verifyPassword } from "./security";
import { first, id, publicUser, run } from "./db";

export const authRoutes = new Hono<{ Bindings: Env; Variables: Variables }>();

authRoutes.post("/register", async (c) => {
  const body = await c.req.json<Record<string, any>>().catch(() => ({} as Record<string, any>));
  const email = String(body.email || "").trim().toLowerCase();
  const username = String(body.username || "").trim();
  const password = String(body.password || "");
  if (!/^\S+@\S+\.\S+$/.test(email)) return c.json({ detail: "请输入有效的邮箱地址" }, 400);
  if (username.length < 2 || username.length > 30) return c.json({ detail: "用户名长度应为 2-30 个字符" }, 400);
  if (password.length < 8) return c.json({ detail: "密码至少需要 8 位" }, 400);

  const existing = await first(c.env.DB, "SELECT id FROM users WHERE email = ? OR username = ?", [email, username]);
  if (existing) return c.json({ detail: "邮箱或用户名已被注册" }, 409);

  const userId = id("usr");
  const passwordHash = await hashPassword(password);
  await run(
    c.env.DB,
    "INSERT INTO users (id,email,username,hashed_password,target_school,target_major,is_active,is_premium) VALUES (?,?,?,?,?,?,1,0)",
    [userId, email, username, passwordHash, body.target_school || null, body.target_major || null],
  );
  const user = await first<AuthUser>(c.env.DB, "SELECT * FROM users WHERE id = ?", [userId]);
  const token = await createToken(userId, c.env.JWT_SECRET);
  return c.json({ access_token: token, token_type: "bearer", user: publicUser(user!) }, 201);
});

authRoutes.post("/login", async (c) => {
  const body = await c.req.json<Record<string, any>>().catch(() => ({} as Record<string, any>));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const user = await first<AuthUser & { hashed_password: string }>(c.env.DB, "SELECT * FROM users WHERE email = ?", [email]);
  if (!user || !user.is_active || !(await verifyPassword(password, user.hashed_password))) {
    return c.json({ detail: "邮箱或密码错误" }, 401);
  }
  const token = await createToken(user.id, c.env.JWT_SECRET);
  return c.json({ access_token: token, token_type: "bearer", user: publicUser(user) });
});

authRoutes.get("/me", (c) => c.json(publicUser(c.get("user"))));

authRoutes.put("/me", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<Record<string, any>>().catch(() => ({} as Record<string, any>));
  const allowed = ["username", "avatar", "target_school", "target_major", "exam_date"];
  const updates = allowed.filter((key) => body[key] !== undefined);
  if (!updates.length) return c.json(publicUser(user));
  if (body.username) {
    const taken = await first(c.env.DB, "SELECT id FROM users WHERE username = ? AND id <> ?", [String(body.username).trim(), user.id]);
    if (taken) return c.json({ detail: "用户名已被使用" }, 409);
  }
  await run(
    c.env.DB,
    `UPDATE users SET ${updates.map((key) => `${key} = ?`).join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    [...updates.map((key) => body[key]), user.id],
  );
  const updated = await first<AuthUser>(c.env.DB, "SELECT * FROM users WHERE id = ?", [user.id]);
  return c.json(publicUser(updated!));
});
