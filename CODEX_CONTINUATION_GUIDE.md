# 佳乐考研最终版 · 跨电脑 Codex 开发交接指南

> 文档版本：2026-09-01
> 项目品牌：佳乐考研（Jiale Graduate）
> 产品定位：AI 驱动的新一代考研学习平台

这份文档用于在另一台电脑上解压项目后，快速恢复开发环境、理解系统架构、启动本地项目并继续使用 Codex 开发。压缩包是**安全开发包**：包含完整源代码、配置模板、数据库迁移、产品文档和 Git 历史；不会包含线上密钥、用户数据库、依赖缓存或本机运行产物。

---

## 一、当前最终版状态

- Git 分支：`main`
- GitHub：`https://github.com/renjl130/ai-graduate-exam-os`
- 国内入口（腾讯云 CloudBase）：见 `docs/CHINA_ACCESS_DEPLOY.md`，该文档记录了当前已配置的 CloudBase 默认域名。
- 海外/全球入口（Cloudflare Worker）：`https://ai-graduate-exam-os.renjl130-ai-exam.workers.dev`
- 当前产品名称：佳乐考研 · Jiale Graduate
- 当前产品副标题：AI 驱动的新一代考研学习平台
- 最后打包日期：2026 年 9 月 1 日

> 线上数据库和文件存储仍在云端。压缩包不携带线上用户数据，换电脑后连接线上环境不会因为解压而覆盖或丢失数据。

---

## 二、系统架构总览

```text
用户浏览器
   │
   ├── 腾讯云 CloudBase 静态托管（国内入口）
   │       └── /api/* → CloudBase 云函数代理
   │                         └── Cloudflare Worker
   │                               ├── Hono API
   │                               ├── D1 数据库
   │                               ├── Workers KV 文件存储
   │                               └── Workers AI
   │
   └── Cloudflare Worker 静态资源与 API（全球入口）
```

### 技术栈

- 前端：Next.js 15、React、TypeScript、Tailwind CSS 4、CSS Variables
- 云端 API：Cloudflare Workers、Hono
- 数据库：Cloudflare D1（线上）；SQLite（仅本地旧版/兼容开发用途）
- 文件存储：Workers KV
- AI：Cloudflare Workers AI；项目中保留其他 AI 服务的兼容配置
- 部署：Cloudflare Wrangler、腾讯云 CloudBase、EdgeOne 兼容配置
- PWA：Manifest、图标、响应式布局、主题持久化

---

## 三、解压后第一次启动（Windows）

### 1. 安装基础环境

建议安装以下版本：

- Git
- Node.js 22 LTS
- npm（随 Node.js 安装）
- Python 3.11 或更高版本（仅需要运行旧版 FastAPI 本地后端或 Python 内容脚本时使用）
- Codex 桌面端

检查版本：

```powershell
node --version
npm --version
git --version
python --version
```

### 2. 进入项目目录并安装依赖

```powershell
cd "C:\你的路径\ai-graduate-exam-os"
npm ci
npm ci --prefix frontend-next
```

不要把 `node_modules` 复制到新电脑；它们不在安全压缩包中，使用上面的命令重新安装更稳定。

### 3. 配置本地环境变量（仅在需要本地 FastAPI 时）

```powershell
Copy-Item backend\.env.example backend\.env
```

再编辑 `backend\.env`，至少设置一个随机的本地 `JWT_SECRET`。如果要在本地调用外部 AI，再填写对应的 API Key。真实 Key 只保存在本机 `.env`，禁止提交到 GitHub、禁止写进 README、禁止粘贴到 Codex 对话中。

Cloudflare Worker 的生产绑定由 `wrangler.jsonc` 和 Cloudflare 账号授权管理；腾讯云 CloudBase 的部署凭据由本机 CLI 登录态管理。两者都不应写入压缩包。

### 4. 首次验证

```powershell
npm run check
npm run build
```

这两个命令成功后，说明 Worker 类型检查和 Next.js 静态构建正常。

---

## 四、本地开发方式

### 方式 A：验证生产前端构建（推荐）

```powershell
npm run check
npm run build
```

构建产物位于 `frontend-next/out`。该目录属于生成物，不纳入压缩包，运行构建后会自动生成。

### 方式 B：启动 Cloudflare Worker 本地模拟

```powershell
npm run build
npm run cf:dev
```

Wrangler 会启动本地 Worker，并提供静态前端、API、D1/KV 的本地模拟。若端口被占用，按终端提示使用其他端口。

### 方式 C：使用已有 Windows 启动脚本

项目根目录保留了：

- `start.bat`
- `start-backend.bat`
- `start-frontend.bat`

这些脚本主要服务于早期 FastAPI + Next.js 开发模式。继续维护线上最终架构时，应优先使用 Cloudflare Worker 流程，不要在没有明确需求时把旧后端重新接回生产链路。

---

## 五、目录说明

```text
ai-graduate-exam-os/
├── frontend-next/                 # 当前生产前端（Next.js）
│   ├── src/app/                   # App Router、页面入口、主题样式、PWA
│   ├── src/components/            # 页面和业务组件
│   ├── src/lib/                   # API、导航、主题和工具函数
│   ├── public/                    # 静态资源
│   ├── package.json
│   └── next.config.ts
├── cloudflare/                    # 当前生产 Worker、路由和 D1 迁移
│   ├── src/index.ts               # Hono Worker 入口
│   ├── migrations/                # 0001 起的幂等数据库迁移
│   └── worker-configuration.d.ts
├── cloud-functions/               # 腾讯云/EdgeOne API 代理函数
├── cloudbase/                     # CloudBase 相关配置和部署辅助文件
├── cloudflare-pages-relay/        # 备用中转实现
├── backend/                       # 早期 FastAPI 本地后端与内容脚本
│   ├── .env.example               # 环境变量模板
│   └── *.py                       # 本地工具、知识库和内容升级脚本
├── docs/                          # 架构、API、部署、品牌和设计系统文档
├── scripts/                       # 构建、校验和辅助脚本
├── .github/workflows/             # GitHub Actions 校验/部署工作流
├── wrangler.jsonc                 # Cloudflare Worker 配置
├── edgeone.json                   # EdgeOne 构建配置
├── package.json                   # Worker 根依赖和脚本
└── README.md                      # 项目总览
```

---

## 六、知识库与线上数据说明

- 知识库按“学科 → 章节 → 知识点”组织，覆盖新闻传播、政治、考研英语等内容。
- 知识点内容包含讲义、关键要点、案例/应用、易错辨析、专项训练、自测题、考试提示、答题结构和记忆链等字段。
- 政治与英语内容已进行实质性补充，英语词汇包含音标与词义数据。
- 数据库迁移文件位于 `cloudflare/migrations/`，当前已有迁移应按顺序执行，禁止修改或删除已经应用到线上环境的迁移。
- 新增数据库字段或表时，从 `0029` 及之后创建新的迁移文件，并先在本地验证，再应用到远端。
- 线上用户学习记录、知识掌握度、复习记录、文件和账号数据不在压缩包中；它们属于云端数据，不要用本地旧数据库覆盖线上数据库。

### 知识库修改原则

1. 不写空壳知识点，不只填标题、定义或同一段模板。
2. 政治知识点要区分历史背景、理论逻辑、核心命题、易错点和材料题/选择题训练。
3. 英语词汇要避免只有中文释义；应补齐音标、词性、核心义、熟词僻义、搭配、例句、辨析和考研语境。
4. 语法、阅读、翻译、完形和写作要使用不同的理解框架与训练步骤。
5. 内容升级必须幂等，不得重置用户掌握度、复习日期、复习次数和知识关系。

---

## 七、线上部署注意事项

### Cloudflare Worker 生产部署

在已完成 Wrangler 登录且确认目标账号正确后：

```powershell
npm run build
npm run check
npx wrangler deploy
```

涉及数据库迁移时，先确认迁移内容和目标环境，再执行：

```powershell
npx wrangler d1 migrations apply DB --remote
```

不要把 `wrangler` 登录凭据、API Token、D1/KV 本地状态或 `.dev.vars` 打包、提交或分享。

### 腾讯云 CloudBase 国内入口

国内入口使用 CloudBase 静态托管和云函数代理，详细命令、环境标识、路由关系、限制和回滚说明见：

```text
docs/CHINA_ACCESS_DEPLOY.md
```

部署前必须确认：

- CloudBase CLI 已登录正确的腾讯云账号；
- 静态文件来自最新的 `frontend-next/out`；
- 云函数上游地址仍指向受控的生产 Worker/Relay；
- `/api/health`、登录、知识库、AI、模考和文件接口均完成验证；
- 不将 Cloudflare 凭据写入 CloudBase 环境变量或源码；
- 大文件上传、AI 流式响应和登录 Cookie 要单独做链路测试。

---

## 八、继续使用 Codex 的推荐流程

1. 用 Codex 打开解压后的项目根目录，而不是只打开 `frontend-next` 子目录。
2. 先让 Codex 阅读以下文件：
   - `README.md`
   - `CODEX_CONTINUATION_GUIDE.md`
   - `docs/CHINA_ACCESS_DEPLOY.md`
   - `docs/JIALE_BRAND_DESIGN_SYSTEM.md`
   - `wrangler.jsonc`
   - `cloudflare/src/index.ts`
3. 开始修改前执行：

```powershell
git status --short
npm run check
```

4. 修改后至少执行：

```powershell
npm run check
npm run build
git diff --check
```

5. 涉及 UI 时，检查 Light/Dark/System、桌面 100% 缩放滚动、移动端抽屉、键盘焦点和窄屏布局。
6. 涉及 API 或数据库时，先阅读现有路由和迁移，保持既有字段、权限隔离和业务流程不变。

### 可直接粘贴给 Codex 的启动提示词

```text
这是“佳乐考研（Jiale Graduate）”最终版项目。请先阅读 README.md、CODEX_CONTINUATION_GUIDE.md、docs/CHINA_ACCESS_DEPLOY.md、docs/JIALE_BRAND_DESIGN_SYSTEM.md、wrangler.jsonc 和 cloudflare/src/index.ts，再开始工作。

除非我明确要求，不要修改线上数据、不要删除已有数据库迁移、不要提交 .env/.dev.vars/数据库/Token/用户文件，不要把 CloudBase 或 Cloudflare 凭据写入代码。优先保持业务逻辑、API、数据库字段、权限和功能流程不变；UI 任务只改 UI/UX/组件/样式。每次修改后运行 npm run check、npm run build 和 git diff --check，并汇报实际改动文件、验证结果和潜在风险。
```

---

## 九、安全清单

压缩包明确排除以下内容：

- `.env`、`.dev.vars`、Cloudflare/Wrangler 登录态
- `backend/exam_os.db` 及所有 SQLite 数据库和备份
- `.wrangler/` 本地模拟状态
- `node_modules/`、`backend/venv/`
- `.next/`、`frontend-next/out/`
- `data/uploads/` 用户上传文件
- 日志、PID、缓存和临时文件

如果发现密钥曾经出现在 Git 历史、日志或聊天内容中，应立即在对应平台撤销并重新生成；不要仅依靠删除当前文件来认为密钥已安全。

---

## 十、变更与发布检查表

- [ ] `git status` 只包含预期文件
- [ ] 未改动不应改动的 API、数据库结构、权限和业务流程
- [ ] 通过 `npm run check`
- [ ] 通过 `npm run build`
- [ ] 通过 `git diff --check`
- [ ] 已验证桌面 100% 缩放下可滚动
- [ ] 已验证 Light / Dark / Follow System
- [ ] 已验证登录、知识库、英语词汇、政治、AI、错题、模考和文件功能
- [ ] 已检查响应式布局和键盘可操作性
- [ ] 未提交任何密钥、数据库、用户文件或本机缓存
- [ ] 线上发布后检查 `/api/health`
- [ ] 记录版本号、提交号、部署入口和回滚方式

---

## 十一、相关文档索引

- 产品总览：`README.md`
- 国内访问与 CloudBase：`docs/CHINA_ACCESS_DEPLOY.md`
- Cloudflare 免费部署：`docs/CLOUDFLARE_FREE_DEPLOY.md`
- 品牌与设计系统：`docs/JIALE_BRAND_DESIGN_SYSTEM.md`
- 技术架构：`docs/ARCHITECTURE.md`
- API 设计：`docs/03-API-DESIGN.md`
- 数据库结构：`docs/02-DATABASE-SCHEMA.md`
- 编码规则：`docs/CODING_RULES.md`
- 产品路线图：`docs/ROADMAP.md`
- 变更记录：`docs/CHANGELOG.md`
- ECDICT 词库授权说明：`docs/ECDICT_LICENSE.md`

---

**佳乐考研（Jiale Graduate）**
**AI 驱动的新一代考研学习平台**