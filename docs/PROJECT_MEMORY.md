# 佳乐考研长期项目上下文（PROJECT MEMORY）

> 状态：已批准并正式生效
> 最近更新：2026-07-16
> 项目路径：`C:\Users\jd-liverr\Desktop\ai-graduate-exam-os`
> 生产主线：Cloudflare
> 自托管兼容：FastAPI

## 1. 文档读取顺序

每次开发前依次读取：

1. `docs/PROJECT_MEMORY.md`
2. `docs/ARCHITECTURE.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/CODING_RULES.md`
5. `docs/ROADMAP.md`
6. `docs/DECISIONS.md`
7. `docs/TODO.md`
8. `docs/CHANGELOG.md`

根目录历史审计、交接和任务文档只作为历史证据；与当前代码或本组文档冲突时，以当前代码和本组文档为准。

## 2. 项目介绍

**产品名称：** 佳乐考研（Jiale Graduate）
**产品形态：** AI 驱动的一站式考研学习操作系统
**核心学科：** 新闻与传播 334/440、政治 101、英语 204
**目标用户：** 需要计划、学习、复习、模考、错题诊断和 AI 辅导的考研学习者。

产品闭环：

```text
计划 → 专注 → 理解 → 复习 → 测试 → 诊断 → 再规划
```

核心价值：

- 将分散的资料、知识、任务、复习和考试统一管理；
- 使用结构化知识库降低学习组织成本；
- 使用 AI 辅助讲解、计划和学习决策；
- 用真实学习记录驱动 Dashboard、推荐和复盘。

## 3. 当前阶段

项目处于**可部署功能型 Beta / 商业化前工程治理阶段**：

- 登录后产品壳和主要功能页面已完成；
- Cloudflare 商业生产链路已上线；
- FastAPI 自托管链路保留；
- 知识库、词汇、题库和学习数据已具备真实结构；
- 自动化测试、安全防滥用、监控、备份和管理后台仍需建设。

## 4. 品牌

- 中文名：佳乐考研
- 英文名：Jiale Graduate
- 品牌主张：让每一次学习，都更接近上岸。
- 关键词：专业、可信赖、现代、克制、高效、陪伴、成长
- 主色：`#3157D5`
- 暗色主题主色：`#7C9AFF`

## 5. 技术栈

### Tier A 商业生产主线

- Next.js 15、React 19、TypeScript strict
- Next.js 静态导出
- Tailwind CSS 4 + CSS Design Token
- Hono + Cloudflare Workers
- Cloudflare D1、KV、Workers AI
- Wrangler + GitHub Actions

### Tier B 自托管兼容

- FastAPI + Uvicorn
- SQLite + 本地文件系统
- DeepSeek / OpenRouter / 可选 Ollama
- Docker、Docker Compose、Railway

## 6. 目录结构

```text
frontend-next/     当前生产前端
cloudflare/        Cloudflare Worker 与 D1 迁移
backend/           FastAPI 自托管兼容后端
data/              知识原始资料
docs/              长期项目文档
scripts/           数据与部署辅助脚本
wrangler.jsonc     Cloudflare 绑定
Dockerfile         FastAPI 兼容部署镜像
```

`frontend/` 是废弃原型，不是生产 UI。

## 7. 数据基线

D1 迁移验证后的基线：

- 23 张表
- 31 个显式索引
- 3 个学科
- 44 个章节
- 721 个知识点
- 335 条知识关系
- 85 道题库题目
- 4,856 个考研词汇

## 8. 当前功能

已具备：

- 注册、登录、用户资料和 JWT 鉴权
- 学习驾驶舱、计划、专注计时和学习统计
- AI 学习助手、会话和内容整理
- 知识库、知识图谱、搜索和知识复习
- 闪卡、词汇、错题、题库和模拟考试
- 文件上传、PDF 阅读和文档导入
- 学习建议、薄弱点和成绩趋势估算
- 社区基础发帖点赞、设置和双主题

能力边界：

- “AI 语义检索”当前生产实现主要是词法相似度；
- 成绩预测是启发式估算，不是统计学预测；
- 部分学习建议来自规则排序；
- 院校信息主要为静态内容；
- 社区缺少完整审核、举报和反滥用。

## 9. 已批准架构决策

- Cloudflare 是唯一商业生产主线和新功能默认落点；
- FastAPI 是本地、自托管和私有部署兼容实现；
- FastAPI 不是 Cloudflare 的无损实时热备；
- 新功能是否同步 FastAPI 必须在任务分析中明确；
- D1 已发布迁移不可回写，只能追加补偿迁移或修复脚本；
- 大规模重构前必须先建立测试和契约保护。

## 10. Design System 摘要

- 新 UI 只使用语义 Theme Token，不新增第三套颜色体系；
- 同时验证浅色、深色、桌面和 390px 移动端；
- 主要点击区域至少 44×44px；
- 支持键盘、焦点、高对比度和减少动画；
- 顶部工具栏控件必须保持单行，禁止 flex 压缩造成文字竖排；
- 知识内容使用 `--text-primary`、`--text-secondary`、`--text-muted`。

## 11. 开发原则

1. 先分析影响、方案和风险，确认后修改。
2. 不破坏已有功能，不修改无关文件。
3. 优先复用现有组件和语义 Token。
4. 新前端请求必须进入统一 API 层。
5. TypeScript strict 不得关闭。
6. SQL 必须参数化，权限必须服务端验证。
7. 用户功能必须包含 loading、empty、error、success。
8. 完成后更新 PROJECT_MEMORY、ROADMAP、CHANGELOG、TODO。

## 12. 禁止未经确认修改

- D1/KV/AI 绑定、数据库 ID 和已发布迁移
- JWT 密钥策略、认证协议和用户隔离规则
- 现有 API 路径和稳定响应字段
- 知识点、词汇及其稳定 ID
- 品牌名称、Logo、主色和导航架构
- Cloudflare、Docker、Railway 任一部署链路的删除
- 大规模目录移动、框架升级和数据库重构

## 13. 生产记录

- 2026-07-16：长期治理文档获批准；
- 2026-07-16：Cloudflare 确认为 Tier A，FastAPI 确认为 Tier B；
- 2026-07-16：GitHub `main` 与 Cloudflare 生产环境完成同步；
- 2026-07-16：修复顶部工具栏竖排/溢出和知识库文字可读性，已部署到 Cloudflare 生产环境。

## 14. 验证基线

已验证：

- Cloudflare Worker TypeScript 检查；
- Next.js TypeScript strict 检查；
- Next.js 生产构建；
- D1 迁移顺序执行；
- 桌面多断点和 390px 移动端；
- 登录页、Dashboard、知识库深浅主题。
