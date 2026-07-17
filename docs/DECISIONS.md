# 架构与产品决策记录（DECISIONS / ADR）

> 批准日期：2026-07-16

## ADR-001：长期文档作为项目上下文

- 状态：Accepted
- 决策：开发优先读取 `docs/PROJECT_MEMORY.md` 及关联文档，不依赖聊天历史。
- 原因：历史审计、交接和计划存在时间差与结论漂移。

## ADR-002：Cloudflare 是唯一商业生产主线

- 状态：Accepted
- 决策：Next.js Static + Hono Worker + D1/KV/Workers AI 是商业生产主线和新功能默认落点。
- 原因：公开部署、数据库迁移和静态资源链路已经完整。
- 影响：生产 API、安全、监控、备份和迁移以 Cloudflare 为权威。

## ADR-003：FastAPI 是 Tier B 自托管兼容

- 状态：Accepted
- 决策：保留 FastAPI + SQLite + 文件系统 + 外部 AI Provider。
- 用途：本地、自托管和私有部署。
- 非目标：不作为 Cloudflare 实时热备，不默认同步全部新功能。

## ADR-004：先分析、确认后开发

- 状态：Accepted
- 决策：每项任务先分析需求、影响、方案、风险和回滚，确认后修改。

## ADR-005：API 契约定义共享边界

- 状态：Accepted
- 决策：88 个共享路由由请求、响应、权限、错误和幂等契约约束。
- 特例：FastAPI 独有按学科推荐接口属于 legacy，不要求立即补齐 Cloudflare。

## ADR-006：Design Token 单一来源

- 状态：Accepted
- 决策：新 UI 只使用 `design-system.css` 语义 Token，不新增第三套样式体系。
- 迁移：建立视觉回归后逐页收敛旧样式。

## ADR-007：数据库迁移不可回写

- 状态：Accepted
- 决策：已发布 D1 迁移不可修改，修复使用新迁移、补偿迁移或数据脚本。

## ADR-008：认证安全专项升级

- 状态：Accepted
- 当前：7 天 JWT、PBKDF2、localStorage Token、PDF query token。
- 方向：限流、会话撤销、短期 Token/refresh 或 HttpOnly Cookie、PDF 短期签名。
- 约束：必须兼容现有用户并可回滚。

## ADR-009：质量门禁优先于重构

- 状态：Accepted
- 决策：拆分 Worker、FastAPI 和 CSS 前，先建立契约、E2E 和视觉回归。

## ADR-010：AI 能力准确命名

- 状态：Accepted
- 决策：规则排序、词法相似度和启发式预测不得暗示为高级向量模型或统计预测。

## ADR-011：FastAPI 不是生产容灾回退

- 状态：Accepted
- 决策：Cloudflare 使用 Worker/静态版本回滚和向前数据库修复；跨运行时容灾需要独立建设。

## ADR-012：顶部工具栏渐进式响应

- 状态：Accepted
- 决策：工具栏控件禁止收缩和换行，按可用宽度隐藏低优先级信息。
- 原因：viewport 断点与侧栏占用叠加会使操作列小于内容自然宽度，造成竖排和裁切。

## ADR-013：EdgeOne 仅作为国内访问镜像

- 状态：Accepted
- 决策：EdgeOne Pages 托管相同静态前端，并通过同源 `/api/*` 代理 Cloudflare Worker。
- 原因：改善中国大陆用户对 `workers.dev` 入口的可达性，同时避免数据库迁移和双写。
- 数据权威：Cloudflare Worker、D1、KV 和 Workers AI 仍是唯一商业生产数据面。
- 约束：镜像不得保存用户密码、JWT 密钥、D1 或 KV 凭据；只配置公开上游 Origin。
- 回滚：停止或删除 EdgeOne 项目即可，Cloudflare 主站不受影响。
## ADR-014：CloudBase 作为无自有域名的免费国内入口

- 状态：Accepted
- 背景：用户不希望购买域名，EdgeOne 永久公开入口需要自定义域名；CloudBase 提供 6 个月免费环境和默认国内域名。
- 决策：CloudBase 静态托管承载前端，HTTP 网关以 `/` 和 `/api` 提供统一地址，`api` 云函数经固定 Cloudflare Pages Relay 转发到现有 Worker。
- 数据权威：Cloudflare Worker、D1、KV 和 Workers AI 仍是唯一商业生产数据/API 平面；CloudBase 不保存或复制业务数据库。
- 安全：Relay 目标固定，不接收用户指定上游；CloudBase 仅保存公开 Relay Origin，不保存 Cloudflare OAuth/API Token、JWT Secret 或用户密码。
- 限制：免费环境至 2027-01-16；约 6MB 网关限制导致现有 25MB 上传无法完整兼容；当前部署为人工 CLI 流程。
- 回滚：删除 CloudBase 根路由或停用环境即可，Cloudflare 主站和数据不受影响。

## ADR 模板

```markdown
## ADR-XXX：标题
- 状态：Proposed / Accepted / Superseded / Rejected
- 背景：
- 决策：
- 原因：
- 影响：
- 回滚：
```
