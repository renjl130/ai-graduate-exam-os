# 佳乐考研设计系统（DESIGN SYSTEM）

> 最近更新：2026-07-16

## 1. 设计目标

界面应体现：专业、可信赖、克制、高效、陪伴和成长。

- 首页优先回答“今天应该做什么”；
- AI 必须服务于学习理解和决策；
- 指标必须来自真实学习数据；
- 重要功能必须有加载、空态、错误态和恢复动作；
- 桌面端强调信息效率，移动端强调单手操作。

## 2. 品牌

| 项目 | 规范 |
|---|---|
| 中文名 | 佳乐考研 |
| 英文名 | Jiale Graduate |
| 品牌口号 | 让每一次学习，都更接近上岸。 |
| 主色 | `--brand-500: #3157D5` |
| 暗色主色 | `--brand-500: #7C9AFF` |
| Logo | 使用 `BrandLogo.tsx` / `JialeMark` |

## 3. 颜色

### 品牌与功能色

- `--brand-*`：主操作、当前导航、链接和焦点；
- `--green-500`：完成、正确、成长；
- `--orange-500`：考试、提醒、待处理；
- `--violet-500`：AI、智能建议、图谱；
- `--cyan-500`：搜索、语言和辅助信息；
- `--red-500`：错误、危险、删除。

### 语义色

- 背景：`--app-bg`、`--app-bg-soft`
- 表面：`--surface`、`--surface-subtle`、`--surface-elevated`
- 文字：`--text-primary`、`--text-secondary`、`--text-muted`
- 边框：`--border-subtle`、`--border-default`、`--border-strong`
- 焦点：`--focus-ring`

新增 UI 不得写死只适用于暗色主题的 `text-white`、`text-gray-*` 或过浅半透明彩色文字。

## 4. Typography

字体：

```css
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
--font-display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", "PingFang SC", sans-serif;
--font-metric: "SFMono-Regular", "Cascadia Code", ui-monospace, monospace;
```

字号：

- Display：品牌主标题
- H1：页面主标题
- H2：页面区块标题
- H3：卡片和内容标题
- Body：正文
- Small/Caption：辅助说明
- Metric：数字指标

正文规则：

- 移动端正文不低于 14px；
- 中文知识正文行高建议 1.7–1.8；
- 长知识内容使用 `--text-secondary`，标题使用 `--text-primary`；
- 不使用过细字重表达核心内容。

## 5. Spacing

基础间距：4、8、12、16、20、24、32、40px。

- 组件内部优先 8/12/16/24；
- 页面区块优先 24/32/40；
- 不无规律新增间距值。

## 6. Radius

- 8px：小标签、小按钮
- 12px：输入框、普通按钮
- 16px：标准卡片
- 20px：大卡片、面板
- 24px：Hero、Modal

## 7. Shadow

- XS：边界辅助
- SM：普通卡片
- MD：Popover
- LG：Modal、Drawer
- Brand：核心 CTA，限量使用

## 8. Grid 与响应式

关键断点：520、640、760、1023、1180、1320、1440、1500、1700px。

### 顶部工具栏

- 所有 pill/button 保持单行；
- 子项禁止 `flex-shrink` 造成文字竖排；
- 操作列使用内容宽度；
- 按优先级渐进隐藏学习状态、积分、文字标签和倒计时；
- AI 助手按钮必须使用水平 flex 布局；
- 任何断点不得产生横向滚动或突破 64/72px 顶栏高度。

### 移动端

- 390px 是必测宽度；
- 主要点击区域至少 44×44px；
- 使用底部快捷导航；
- Drawer、Modal 和内容卡片不得超出视口；
- 固定底栏存在时为内容保留安全间距。

## 9. Icon

- 统一使用 Lucide React；
- 常规尺寸 16/18/20/24px；
- 纯图标按钮必须有 `aria-label`；
- 不使用 Emoji 替代正式功能图标，内容标题中的辅助 Emoji 除外。

## 10. 核心组件

### Button

- 每个视区只保留一个主要动作；
- 异步提交必须有 loading 和 disabled；
- Icon Button 必须有可访问名称；
- 危险操作使用明确危险样式。

### Input

- 不只依赖 placeholder；
- 错误信息紧邻字段；
- 深浅主题下文字和 placeholder 均清晰；
- Search 支持键盘提交和清空。

### Card

- 一张卡片只表达一个主题；
- 可点击卡片必须有 hover/focus；
- 指标包含数值、单位、周期和含义；
- 不使用无意义渐变和发光。

### Modal / Drawer

- 管理焦点；
- Esc 关闭；
- 关闭后焦点回到触发器；
- 移动端优先全屏 Drawer 或 Bottom Sheet。

## 11. Animation

- Fast：150ms
- Base：200ms
- Slow：250ms
- 必须支持 `prefers-reduced-motion`
- 禁止影响阅读的循环动画和超过 400ms 的常规过渡

## 12. Theme

- 支持 light / dark / system；
- 新颜色必须同时适配深浅主题；
- 知识库正文统一使用语义文字 Token；
- 图表、Markdown、PDF 和代码块需要单独检查暗色可读性。

## 13. Accessibility

- 标题层级连续；
- 提供 skip link；
- 键盘可达，focus-visible 清晰；
- 目标 WCAG AA；
- 状态不能只依赖颜色；
- 图表需要文字摘要；
- 支持减少动画和高对比度。

## 14. UI 验收清单

- [ ] 浅色桌面
- [ ] 深色桌面
- [ ] 1022px、1180px、1280px、1440px、1536px、1700px
- [ ] 390×844 移动端
- [ ] 键盘 Tab / Enter / Esc
- [ ] loading / empty / error / success
- [ ] 长中文、长英文、0 数据和大数据
- [ ] 无文字竖排、裁切和水平滚动
- [ ] 无新增非 Token 颜色体系
