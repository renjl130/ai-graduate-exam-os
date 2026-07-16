# 工程编码规范（CODING RULES）

> 状态：已批准并生效
> 最近更新：2026-07-16

## 1. 工作模式

每个任务按以下顺序执行：

1. 读取长期文档；
2. 分析需求和验收标准；
3. 评估架构、功能、数据、API、UI 和部署影响；
4. 给出方案、文件范围、风险和回滚；
5. 等待确认；
6. 修改确认范围；
7. 执行验证；
8. 更新 PROJECT_MEMORY、ROADMAP、CHANGELOG、TODO；
9. 重大决策更新 DECISIONS。

## 2. 通用原则

- 小步、可审查、可回滚；
- 不修改无关文件；
- 优先复用，不复制粘贴；
- 修复根因，不掩盖错误；
- 不降低类型、安全、性能和可访问性；
- 注释解释“为什么”；
- 不提交密钥、数据库、上传文件、构建产物和日志。

## 3. 目录规范

前端目标：

```text
src/
├─ app/
├─ components/
│  ├─ ui/
│  ├─ layout/
│  └─ features/
├─ hooks/
├─ lib/api/
├─ lib/utils/
└─ types/
```

现有文件不为目录整洁而一次性移动，只在相关功能有测试保护时渐进迁移。

Cloudflare 目标：

```text
routes → services → repositories → domain
```

FastAPI 若继续维护，不再扩大 `main.py`，逐步拆为 router/service/repository/schema。

## 4. 命名

- 组件、类型、类：PascalCase
- 函数、变量、Hook：camelCase
- Hook：`useXxx`
- 常量：UPPER_SNAKE_CASE
- API JSON、数据库表列：snake_case
- 布尔值使用 is/has/can/should 前缀
- 事件 prop 使用 onXxx，内部处理使用 handleXxx

## 5. TypeScript

- `strict: true` 不得关闭；
- 新代码禁止无理由使用 `any`；
- 优先 `unknown` + 类型守卫；
- 公共函数和组件 props 显式声明；
- DTO 不在多个页面重复声明；
- 日期、ID、分钟、秒和百分比使用清晰命名。

## 6. React

- 一个组件只承担一个主要职责；
- 超过约 350 行或包含多个独立区块时优先拆分；
- Effect 只用于外部同步；
- Effect 清理事件、计时器和订阅；
- 异步请求处理竞态、卸载和重复提交；
- 列表使用稳定 ID；
- 所有交互支持键盘和可访问名称。

## 7. 状态

- 局部状态留在组件；
- 低频全局状态使用 Context；
- 服务端状态进入统一 API/query 层；
- localStorage 仅保存可丢失偏好、草稿和兼容缓存；
- 关键业务数据不得只存在 localStorage；
- 同一数据不得长期双主写。

## 8. API

- 新请求不得散落页面，必须进入 API 层；
- 输入在边界验证；
- 资源访问验证 owner/user；
- SQL 参数化；
- GET 不产生副作用；
- POST 不做无条件自动重试；
- 错误响应逐步统一 `detail`、`code`、`request_id`；
- Cloudflare 是 Tier A；
- FastAPI 只同步明确列入 Tier B 范围的接口。

## 9. 数据库

- 已发布 D1 迁移不可修改；
- 修复使用新迁移、补偿迁移或数据脚本；
- 动态列名来自服务端白名单；
- 多表一致性写入使用事务；
- 查询评估索引和分页；
- 不在应用启动时执行不可控的大规模升级。

## 10. CSS 与 Theme

- 使用 `docs/DESIGN_SYSTEM.md` 和语义 Token；
- 禁止新增第三套 Token；
- 避免无理由 `!important`；
- 避免在 TSX 复制大段 style object；
- 顶部工具栏子项禁止收缩和换行；
- 内容文字不得使用只适配暗色主题的硬编码颜色；
- 同时验证 light/dark 和 390px 移动端；
- 动画遵守 reduced-motion。

## 11. 安全

- 密钥只来自 Secret/环境变量；
- 登录、注册、AI、上传和社区写操作需要限流；
- 不记录密码和 Token；
- Token 不进入日志和长期 URL；
- 用户输入进入 HTML/Markdown 前审查；
- CORS 使用 allowlist；
- 权限在服务端执行。

## 12. 测试

目标测试层级：

1. 算法与工具单元测试；
2. API 集成测试；
3. Cloudflare/FastAPI 契约测试；
4. 关键组件测试；
5. 注册、计划、复习、模考、文件、AI E2E；
6. 登录页、Dashboard、知识库和多断点视觉回归。

Bug 修复应增加可复现测试或明确记录无法自动化的原因。

## 13. 性能

- 页面按需加载；
- 大列表分页或虚拟化；
- 搜索防抖并取消旧请求；
- AI 和文件请求有超时/取消；
- D1 避免 N+1；
- 建立 LCP、INP、CLS、Bundle 和 API p95 预算。

## 14. Git

建议 Conventional Commits：

- `feat:` 功能
- `fix:` Bug
- `refactor:` 重构
- `perf:` 性能
- `test:` 测试
- `docs:` 文档
- `security:` 安全
- `chore:` 维护

一次提交只表达一个主要目的，不混入无关格式化。

## 15. 完成定义

- [ ] 验收标准满足
- [ ] 类型检查和构建通过
- [ ] 相关测试通过
- [ ] 桌面/移动、浅色/深色验证
- [ ] 无无关文件改动
- [ ] 安全和数据隔离未回退
- [ ] 文档已同步
- [ ] 回滚方式明确
