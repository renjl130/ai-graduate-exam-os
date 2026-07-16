# 项目变更日志（CHANGELOG）

所有重要变更按日期倒序记录。

## [Unreleased]

- 暂无。

## [2026-07-16] 顶部工具栏与知识库可读性修复

### Fixed

- 修复顶部学习状态、积分、倒计时、AI 助手和专注按钮因 flex 压缩产生的竖排、裁切和框架溢出；
- 顶部操作区改为内容宽度，并按断点渐进隐藏低优先级信息；
- 修复 AI 助手按钮缺少水平 flex 布局；
- 修复知识库浅色主题下标题、章节、知识点和详情文字对比度不足；
- 统一知识正文和提示卡片的语义文字颜色与行高。

### Verified

- 760、1022、1180、1280、1366、1440、1536、1700、1920px 顶栏无竖排、裁切和横向滚动；
- 390px 知识库无水平溢出；
- 知识库浅色、深色主题检查通过；
- Cloudflare TypeScript、前端 strict 类型检查和生产构建通过。

### Documentation

- 修复 8 份长期项目文档的 UTF-8 中文编码。

## [2026-07-16] GitHub 与 Cloudflare 生产同步

- 长期治理文档进入 GitHub `main`；
- Cloudflare 从最新主线重新构建和部署；
- 远程 D1 无待应用迁移；
- 健康检查和线上首页构建哈希验证通过。

## [2026-07-16] Project Onboarding

- 完成产品、技术、功能、工程和代码质量分析；
- 建立 PROJECT_MEMORY、ARCHITECTURE、DESIGN_SYSTEM、CODING_RULES、ROADMAP、CHANGELOG、DECISIONS、TODO；
- Cloudflare 确定为 Tier A；
- FastAPI 确定为 Tier B；
- 建立长期工程规范和开发流程。

## 记录模板

```markdown
## [YYYY-MM-DD] 标题

### Added / Changed / Fixed / Removed / Security
- 修改内容：
- 影响范围：
- 修改原因：
- 验证方式：
- 回滚方式：
```
