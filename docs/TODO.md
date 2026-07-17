# 当前待办（TODO）

> 最近更新：2026-07-17

## P0 — 立即治理

- [x] 确认 Project Onboarding 文档
- [x] 确认 Cloudflare/FastAPI 长期关系
- [x] 同步 GitHub `main` 与 Cloudflare 生产基线
- [x] 修复顶部工具栏竖排和溢出
- [x] 修复知识库深浅主题文字可读性
- [x] 修复长期项目文档 UTF-8 中文编码
- [x] 建立 EdgeOne 国内镜像可复现构建配置
- [x] 加固并测试 EdgeOne `/api/*` 同源代理
- [x] 创建 EdgeOne Pages 线上项目并连接 GitHub `main`
- [x] 验证国内镜像首页、健康检查和 `/api` 代理
- [x] 创建 CloudBase 免费环境并完成静态站点与 API 部署
- [x] 配置 CloudBase 统一网关 `/` 与 `/api` 路由
- [x] 建立 Cloudflare Pages Relay 并验证 D1、鉴权和 POST 转发
- [x] 删除临时 `network-test` 诊断云函数
- [ ] 在国内不同运营商网络验证登录、知识库、AI、小文件上传和 PDF
- [ ] 为大于 CloudBase 网关限制的上传/下载设计降级方案
- [ ] 在 2027-01-16 前完成免费环境续期或迁移
- [ ] 统一 README、package、Worker 和后端版本号
- [ ] 建立 88 个共享 API 契约
- [ ] 建立最小测试和 CI 门禁
- [ ] 完成认证、CORS、限流和配额安全评审
- [ ] 建立日志、错误追踪、备份和告警

## P0 — 技术债

- [ ] 拆分 `backend/main.py`
- [ ] 拆分和格式化 Cloudflare route
- [ ] 收敛页面直接 fetch
- [ ] 收敛 `globals.css` 和 `design-system.css`
- [ ] 清理确认无用代码和依赖
- [ ] 将知识升级迁出 FastAPI lifespan
- [ ] 统一错误、超时、取消和重试策略
- [ ] 消除无说明的空 catch

## P1 — 核心产品

- [ ] 统一学习任务模型
- [ ] 统一知识、闪卡、词汇和错题复习队列
- [ ] 模考草稿、恢复、评分和错题联动
- [ ] AI 会话历史、引用、配额和降级
- [ ] 邮箱验证、找回密码、注销和数据导出
- [ ] 正式路由和可分享深链接
- [ ] Design System 组件化和可访问性审计

## P2 — 平台能力

- [ ] 真正向量检索和 RAG
- [ ] 内容管理后台
- [ ] 社区评论、举报、审核和反滥用
- [ ] 通知和运营配置
- [ ] PWA、弱网和离线只读

## P3 — 商业化

- [ ] 多院校、多专业
- [ ] 订阅、权益、配额和支付
- [ ] 移动客户端
- [ ] 教师、机构和班级协作
- [ ] 多 Agent 学习教练

## 本次 UI 修复验收

- [x] 760–1920px 顶部工具栏无竖排、裁切和横向滚动
- [x] 390px 知识库无水平溢出
- [x] 知识库浅色主题文字清晰
- [x] 知识库深色主题文字清晰
- [x] TypeScript 和生产构建通过
- [x] EdgeOne 代理 GET/POST、响应流、压缩、重定向和 Range 测试通过
- [x] EdgeOne 线上健康检查、未认证保护和登录 POST 转发通过
- [x] CloudBase 统一首页无横向溢出，`/api/health`、鉴权保护和登录 POST 转发通过
- [ ] CloudBase 国内核心业务与 4–5.5MB 边界文件验收
