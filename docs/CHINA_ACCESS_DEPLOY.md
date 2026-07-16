# 中国大陆访问与 EdgeOne 国内镜像方案

## 为什么 workers.dev 在国内不稳定

当前正式站点运行在 Cloudflare Workers。应用本身正常，但 `workers.dev` 系统域名在中国大陆不同运营商、地区和网络环境下可能出现解析失败、连接重置或高延迟，因此不能把它作为面向国内用户的唯一入口。

## 推荐顺序

### 方案 A：自有域名绑定现有 Worker（最快）

适合先解决 `workers.dev` 域名本身的问题：

1. 购买一个域名；
2. 将域名接入 Cloudflare；
3. 在 Worker 的 Custom Domains 中绑定例如 `exam.example.com`；
4. 保留 D1、KV、Workers AI 和现有全部功能。

优点是几乎不改代码、成本最低；缺点是 Cloudflare 不提供中国大陆本地节点，国内访问质量仍取决于运营商线路，不能承诺全国稳定。

### 方案 B：腾讯 EdgeOne Pages 镜像（推荐的过渡方案）

仓库已经加入 `cloud-functions/api/[[default]].js`：

- Next.js 静态前端部署在 EdgeOne Pages；
- `/api/*` 通过 EdgeOne Node Functions 同源转发到现有 Cloudflare Worker；
- 浏览器不再直接访问 `workers.dev`；
- 登录令牌、知识库、文件、学习进度仍保存在现有 D1/KV。

仓库根目录已经提供 `edgeone.json`，EdgeOne Git 部署应直接读取该配置：

```text
仓库：renjl130/ai-graduate-exam-os
安装命令：npm ci && npm ci --prefix frontend-next
构建命令：npm run check && npm run build
输出目录：frontend-next/out
Node.js：22.11.0
Cloud Functions 最大时限：120 秒
环境变量 CLOUDFLARE_UPSTREAM：现有 Worker 或其自有域名
```

注意：EdgeOne 的中国大陆稳定可用项目需要绑定自有域名；选择中国大陆/全球可用区时，自有域名通常需要完成 ICP 备案。平台临时预览域名不适合作为长期公开入口。

### 方案 C：完整腾讯云国内版（长期最稳）

当用户量增加后，将后端也迁移：

```text
EdgeOne Pages        -> 前端与同源入口
云函数 / Edge Functions -> Hono API
TDSQL-C / MySQL      -> 用户、知识库、学习数据
COS                   -> 文件与导入资料
腾讯混元              -> AI 导师
已备案自有域名         -> 中国大陆稳定访问
```

这需要数据库迁移和云资源账户，不再是纯 Cloudflare 免费架构。若必须面向中国大陆长期稳定运营，这是最可靠的方向。


## 当前实施状态（2026-07-16）

已完成：

- `edgeone.json` 可复现构建配置及 `/api/*` 禁止缓存标头；
- `/api/*` Node Functions 同源代理；
- JWT Authorization 透传；
- POST/上传流式请求体转发；
- NDJSON 流式响应、PDF Range 和上游重定向兼容；
- API `no-store` 和结构化 502 降级；
- 本地代理兼容性测试、Cloudflare 类型检查和 Next.js 生产构建；
- EdgeOne Makers 项目 `makers-dxck1pbhtpet` 已创建并连接 GitHub `main`；
- 已配置 `CLOUDFLARE_UPSTREAM`；
- 首次生产部署成功，线上首页与 `/api/health` 已通过验证。

待完成：

- 绑定长期自定义域名并按适用范围完成 ICP 备案；
- 在永久域名下验证国内网络、登录、知识库、AI、上传和 PDF；
- 建立 EdgeOne Functions 用量与错误率监控。

## 安全要求

- 不把 Cloudflare OAuth Token、API Token、JWT_SECRET 写入 EdgeOne 环境变量以外的位置；
- EdgeOne 只保存 `CLOUDFLARE_UPSTREAM`，不保存用户密码；
- API 继续执行 JWT 鉴权和用户数据隔离；
- 正式切换前必须验证注册、登录、文件上传、PDF、知识库导入、AI 流式响应和大请求体限制。