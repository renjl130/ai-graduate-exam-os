# Cloudflare 全功能免费部署指南

本项目的公网版本使用同一个 Cloudflare Worker 域名同时提供网页和 API：

- **前端**：Next.js 静态导出 + Workers Static Assets
- **API**：Cloudflare Worker + Hono
- **数据库**：Cloudflare D1
- **文件存储**：Cloudflare Workers KV（每个用户的路径彼此隔离）
- **AI 导师**：Cloudflare Workers AI
- **持续部署**：GitHub Actions，推送 `main` 后自动校验；配置 Actions 密钥后可手动一键上线

## 安全原则

以下内容绝不能提交到 GitHub：

- `backend/.env`、`.dev.vars`
- `backend/exam_os.db` 或任何 SQLite 数据库/备份
- JWT 密钥、Cloudflare API Token、私人 AI Key
- `.wrangler/` 本地状态

远端 D1 迁移只包含公共学习资料；本机已有用户、对话和学习记录不会上传。

## 首次创建 Cloudflare 资源

在仓库根目录执行：

```powershell
npx wrangler login
npx wrangler d1 create ai-graduate-exam-os
npx wrangler kv namespace create FILES
```

把 D1 命令返回的 `database_id` 写入根目录 `wrangler.jsonc`。

生成并上传 JWT 密钥（不要打印或保存到仓库）：

```powershell
$bytes = New-Object byte[] 48
$rng = New-Object System.Security.Cryptography.RNGCryptoServiceProvider
$rng.GetBytes($bytes)
$rng.Dispose()
$secret = [Convert]::ToBase64String($bytes)
$secret | npx wrangler secret put JWT_SECRET
Remove-Variable secret,bytes,rng
```

应用数据库迁移并部署：

```powershell
npm ci
npm ci --prefix frontend-next
npm run check
npm run build
npx wrangler d1 migrations apply DB --remote
npx wrangler deploy
```

## GitHub 自动部署

仓库已包含 `.github/workflows/deploy-cloudflare.yml`。在 GitHub 仓库的
`Settings → Secrets and variables → Actions` 中添加：

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

API Token 至少需要对目标账户拥有 Workers Scripts、D1、Workers KV 和 Workers AI 所需的编辑权限。密钥只放在 GitHub Actions Secrets，不写进代码。

每次推送 `main` 会自动执行类型检查和前端构建；需要发布时，在 GitHub Actions 中手动运行该工作流，随后会执行 D1 迁移和 Worker 部署。

## 本地完整验证

```powershell
npm run cf:migrate:local
npm run build
npm run cf:dev
```

本地地址默认为 `http://127.0.0.1:8787`。Workers AI 需要远端绑定，本地模式主要验证网页、注册登录、D1、Workers KV 和业务 API。

## 免费额度保护

- AI 请求使用 Cloudflare Workers AI，不内置或公开任何个人 DeepSeek/OpenAI Key。
- 文档在浏览器中提取文字后导入，远端只保存用户自己的私有知识点与原始文本。
- 单文件限制为 25MB；单次知识导入限制为 150 万字符和最多 40 个分段，防止滥用免费资源。
- AI 不可用或达到平台额度时，知识库、计划、错题、闪卡、考试等非 AI 功能仍可正常使用。
