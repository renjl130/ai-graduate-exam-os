# 系统架构（ARCHITECTURE）

> 最近更新：2026-07-16

## 1. 总体架构

```mermaid
flowchart LR
  U["考研学习者"] --> CFA["Cloudflare Worker Assets"]
  U --> EO["EdgeOne Pages 国内镜像"]
  CFA --> CF["Cloudflare Worker / Hono"]
  EO --> EOP["EdgeOne /api 同源代理"]
  EOP --> CF
  CF --> D1["Cloudflare D1"]
  CF --> KV["Cloudflare KV"]
  CF --> AI["Cloudflare Workers AI"]

  U -. "自托管兼容" .-> PY["FastAPI"]
  PY --> SQLITE["SQLite"]
  PY --> FS["文件系统"]
  PY --> PROVIDERS["DeepSeek / OpenRouter / Ollama"]
```

## 2. 运行时定位

### Tier A：Cloudflare

- 唯一商业生产主线；
- 新功能默认实现位置；
- 生产 API、D1 迁移、安全、监控和备份的权威来源；
- 前端静态资源由 Worker Assets 提供。

### 国内访问镜像：EdgeOne Pages

- 托管与 Cloudflare 同一 Git Commit 生成的 Next.js 静态导出；
- `cloud-functions/api/[[default]].js` 将同源 `/api/*` 转发到 Cloudflare Worker；
- 透传 Authorization、请求体、NDJSON 响应流和 PDF Range；
- API 响应强制 `no-store`，避免边缘缓存用户数据；
- 仅改善访问入口，不复制 D1/KV，不改变生产数据权威。

### Tier B：FastAPI

- 本地、自托管和私有部署；
- 保留现有核心功能和关键安全修复；
- 新功能仅在明确批准后同步；
- 不作为 Cloudflare 实时热备；
- 不与 D1/KV 自动同步数据。

## 3. 前端架构

入口：

- `src/app/layout.tsx`：Theme、Auth、ErrorBoundary；
- `src/app/page.tsx`：应用壳、hash 导航、页面动态加载；
- `src/lib/navigation.ts`：导航信息架构；
- `src/lib/api.ts`：API Client；
- `src/components/`：业务页面与全局组件。

状态分层：

- Context：认证、主题；
- 页面 State：查询、表单、考试、复习；
- localStorage：Token、主题、偏好、计时器、兼容缓存；
- 服务端：用户关键业务数据。

当前使用单页壳和 hash 导航；正式 App Router 路由属于后续渐进演进，不进行一次性重写。

## 4. 顶部工具栏

顶部结构：

```text
页面标题 | 全局搜索 | 学习状态 / 积分 / 倒计时 / AI / 专注 / Theme / 消息 / 用户
```

响应式规则：

- 所有 pill/button 保持单行且禁止 flex 收缩；
- 操作区使用内容宽度，不固定为过窄列；
- 小于 1700px 隐藏学习状态和用户文字；
- 小于 1500px 隐藏积分；
- 小于 1320px 隐藏 AI/专注文字，仅保留图标；
- 小于 1180px 隐藏考试倒计时；
- 小于 1023px 隐藏 AI 和专注快捷入口；
- 移动端使用底部快捷导航。

## 5. Cloudflare 模块

- `index.ts`：CORS、认证中间件、健康检查和路由挂载；
- `routes-auth.ts`：注册、登录、用户；
- `routes-ai.ts`：聊天、整理、讲解和 AI 计划；
- `routes-content.ts`：题库、文件、社区、词汇；
- `routes-knowledge.ts`：学科、章节、知识点、图谱、复习和导入；
- `routes-learning.ts`：计划、闪卡、错题、模考、Dashboard、推荐；
- `db.ts`：D1 查询工具；
- `security.ts`：JWT 和密码哈希；
- `file-storage.ts`：KV 文件路径和限制。

## 6. API 边界

- Cloudflare 约 88 个路由；
- FastAPI 约 89 个路由；
- 88 个共享路由需要契约测试；
- FastAPI 独有按学科推荐接口属于 legacy 扩展；
- 新接口先定义请求、响应、权限、错误和幂等；
- 主线完成后再决定是否进入 Tier B。

## 7. 数据领域

- Identity：users
- Conversation：conversations、messages
- Knowledge：subjects、chapters、knowledge_points、relations、exam_questions
- Practice：question_bank、exams、wrong_questions
- Memory：flashcards、knowledge_reviews、vocabulary_reviews
- Planning：study_plans、study_records、study_sessions
- Content：search_index、posts、import_jobs

## 8. 数据规则

- 用户数据以 `user_id` 隔离；
- 公共知识 `owner_id IS NULL`，用户导入使用当前用户 owner；
- 文件 KV key 包含用户 ID；
- SQL 必须参数化；
- 已发布 D1 迁移不可修改；
- 内容种子与 schema migration 后续应逐步分离。

## 9. 部署

### Cloudflare

```text
npm run check
npm run build
wrangler d1 migrations apply DB --remote
wrangler deploy
```

### EdgeOne Pages

```text
GitHub main
  -> edgeone.json（Node 22.11.0）
  -> npm ci + frontend npm ci
  -> npm run check + npm run build
  -> frontend-next/out
  -> cloud-functions/api/[[default]].js
```

- `CLOUDFLARE_UPSTREAM` 只保存 Cloudflare Worker 公网源站；
- 镜像故障不会修改 D1/KV 数据；
- 正式国内自定义域名按适用要求完成 ICP 备案。

### FastAPI

- 根 Dockerfile 构建前端静态资源和 Python 运行时；
- SQLite 与上传目录挂载到 `/data`；
- `/api/health` 用于健康检查。

## 10. 回滚

- Worker 和静态资源回滚到上一版本；
- D1 使用补偿迁移或数据修复脚本；
- 不修改已发布迁移；
- FastAPI 不是无损容灾回退；
- 跨运行时容灾需另行建设数据、文件和密钥复制。

## 11. 当前技术债

- 缺少自动化测试和共享 API 契约；
- Worker 路由和 FastAPI `main.py` 过大；
- 页面中仍有直接 fetch；
- localStorage 与服务端存在部分双数据源；
- 两代 CSS Token 尚未完全收敛；
- 缺少生产监控、告警和备份演练。
