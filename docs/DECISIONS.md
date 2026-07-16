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
