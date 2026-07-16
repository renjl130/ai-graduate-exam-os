import { Hono } from "hono";
import { cors } from "hono/cors";
import type { AuthUser, Env, Variables } from "./env";
import { first, publicUser } from "./db";
import { verifyToken } from "./security";
import { authRoutes } from "./routes-auth";
import { knowledgeRoutes } from "./routes-knowledge";
import { learningRoutes } from "./routes-learning";
import { contentRoutes } from "./routes-content";
import { aiRoutes } from "./routes-ai";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use(
  "/api/*",
  cors({
    origin: (origin) => origin || "*",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Authorization", "Content-Type"],
    exposeHeaders: ["Content-Length", "Content-Range", "Accept-Ranges"],
    maxAge: 86400,
  }),
);

app.get("/api", (c) =>
  c.json({
    name: c.env.APP_NAME,
    version: c.env.APP_VERSION,
    status: "ok",
    platform: "cloudflare-workers",
  }),
);

app.get("/api/health", async (c) => {
  const database = await first<{ ok: number }>(c.env.DB, "SELECT 1 AS ok").catch(() => null);
  return c.json(
    {
      status: database?.ok === 1 ? "healthy" : "degraded",
      database: database?.ok === 1 ? "connected" : "unavailable",
      ai: "cloudflare-workers-ai",
      storage: "cloudflare-kv",
      version: c.env.APP_VERSION,
      timestamp: new Date().toISOString(),
    },
    database?.ok === 1 ? 200 : 503,
  );
});

const publicApiPaths = new Set([
  "/api",
  "/api/health",
  "/api/auth/register",
  "/api/auth/login",
]);

app.use("/api/*", async (c, next) => {
  if (c.req.method === "OPTIONS" || publicApiPaths.has(c.req.path)) {
    await next();
    return;
  }

  const authorization = c.req.header("Authorization") || "";
  let token = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";

  // react-pdf/browser PDF requests cannot reliably attach Authorization headers.
  // Restrict query-token authentication to the authenticated PDF streaming route.
  if (!token && c.req.method === "GET" && c.req.path.startsWith("/api/files/pdf/")) {
    token = c.req.query("token") || "";
  }

  if (!token) {
    return c.json({ detail: "请先登录" }, 401);
  }

  const payload = await verifyToken(token, c.env.JWT_SECRET);
  if (!payload) {
    return c.json({ detail: "登录状态已失效，请重新登录" }, 401);
  }

  const user = await first<AuthUser>(
    c.env.DB,
    "SELECT id,email,username,avatar,target_school,target_major,exam_date,is_active,is_premium,created_at,updated_at FROM users WHERE id = ?",
    [payload.sub],
  );
  if (!user || !user.is_active) {
    return c.json({ detail: "用户不存在或已停用" }, 401);
  }

  c.set("user", user);
  await next();
});

app.route("/api/auth", authRoutes);
app.route("/api/knowledge", knowledgeRoutes);
app.route("/api", learningRoutes);
app.route("/api", contentRoutes);
app.route("/api", aiRoutes);

app.notFound(async (c) => {
  if (c.req.path.startsWith("/api/")) {
    return c.json({ detail: "接口不存在", path: c.req.path }, 404);
  }
  return c.env.ASSETS.fetch(c.req.raw);
});

app.onError((error, c) => {
  console.error("Unhandled worker error", error);
  return c.json(
    {
      detail: "服务器暂时无法处理该请求",
      request_id: crypto.randomUUID(),
    },
    500,
  );
});

export default app;
