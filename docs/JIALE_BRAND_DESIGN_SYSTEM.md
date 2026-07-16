# 佳乐考研 · Jiale Graduate 品牌与产品设计系统

## 1. 品牌定位

- 中文品牌：佳乐考研
- 英文品牌：Jiale Graduate
- 品牌副标题：AI驱动的新一代考研学习平台
- 产品承诺：用专业知识体系、可信赖 AI 和可执行学习闭环，陪伴用户持续接近上岸目标。
- 品牌关键词：教育、AI、成长、效率、陪伴、专业、可信赖、现代化、科技感。

## 2. 品牌视觉

### Logo

Logo 由渐变圆角方形、字母 J 的学习路径和右上角成长星光组成：

- J：Jiale 首字母，也代表学习路径；
- 向下再向上收束的笔画：从输入、训练到稳定输出；
- 星光：AI 辅助、目标与成长；
- 圆角方形：可靠、友好、数字化工具属性。

Logo 文件与组件：

```text
frontend-next/src/app/icon.svg
frontend-next/src/components/BrandLogo.tsx
```

### 品牌使用

- 完整标志：图形 + 佳乐考研 + Jiale Graduate；
- 紧凑标志：仅图形，用于折叠导航、PWA 图标和加载状态；
- 禁止拉伸、旋转、改变渐变方向或使用低对比背景；
- Logo 周围最小安全距离为图形宽度的 25%。

## 3. 颜色系统

所有产品颜色必须使用 CSS Variables，不允许在新组件中直接写业务颜色。

### 品牌色

```css
--brand-50 ... --brand-700
--brand-500: 主品牌蓝
--violet-500: AI 紫
--green-500: 知识与完成
--orange-500: 考试与提醒
--cyan-500: 英语与数据
--red-500: 错误与高风险
```

### 业务语义

| 业务 | 色彩 | 用途 |
|---|---|---|
| 学习 | Brand Blue | 计划、专注、主要操作 |
| 知识库 | Green | 知识掌握、完成状态 |
| 考试 | Orange | 模考、倒计时、提醒 |
| AI | Violet | AI 助手、诊断、推荐 |
| 英语/统计 | Cyan | 词汇、数据、增长趋势 |
| 风险/错误 | Red | 错题、失败、危险操作 |

### Light Theme

默认主题。背景使用温暖浅灰白，卡片使用纯白，文字使用深蓝灰而非纯黑。适合阅读、白天学习和长时间使用。

### Dark Theme

深色背景不是纯黑。通过 `#0C1018`、`#151C27`、柔和边框和低透明度色彩建立层次。仅在 AI、选中状态和关键操作中使用轻微 Glow。

## 4. Typography

字体栈以系统字体为主，避免国内网络加载第三方字体失败：

```text
SF Pro / Segoe UI / PingFang SC / Microsoft YaHei
```

| 层级 | 用途 |
|---|---|
| Display | 品牌页、关键欢迎语 |
| H1 | 页面主标题 |
| H2 | 主要业务模块 |
| H3 | 卡片标题 |
| Title | 列表项、弹窗标题 |
| Body | 正文和知识内容 |
| Caption | 状态、辅助说明 |
| Metric | 倒计时、统计数字、分数 |

统计数字必须开启 tabular numbers，并使用负字距提高商业数据产品质感。

## 5. Spacing 与 Grid

- 基础单位：4px；
- 常用间距：8 / 12 / 16 / 20 / 24 / 32 / 40 / 48；
- 页面使用 12 列 Grid；
- 桌面内容最大宽度：1600px；
- 卡片间距：16px；
- 移动端卡片间距：12px；
- 页面边距根据视口在 14px 到 36px 之间自适应。

## 6. Radius 与 Shadow

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
```

- 输入框与小按钮：8–12px；
- 业务卡片：16–20px；
- 大型弹窗与品牌区域：20–24px；
- 默认卡片只使用轻微阴影；
- Hover 时增加 Elevation，不依靠大面积 Glow；
- Dark Theme 的阴影透明度高于 Light Theme。

## 7. Motion

```css
--motion-fast: 150ms;
--motion-base: 200ms;
--motion-slow: 250ms;
--ease-standard: cubic-bezier(.2,.8,.2,1);
```

- 按钮 Hover：150ms；
- 菜单、Tooltip、状态切换：200ms；
- Sidebar、Drawer、Modal：250ms；
- 动画只使用 transform 与 opacity；
- 支持 `prefers-reduced-motion`，减少动画时将持续时间降到 0.01ms。

## 8. Components

统一组件入口：

```text
frontend-next/src/components/ui/ProductUI.tsx
```

提供：

- ProductCard；
- ProductButton；
- ProductBadge；
- ProductProgress；
- ProductSkeleton；
- ProductEmpty。

全局业务组件：

- BrandLogo；
- ThemeSwitcher；
- AppHeader；
- Sidebar；
- CommandPalette；
- FocusTimer。

## 9. 状态规范

所有交互组件应覆盖：

- Default；
- Hover；
- Active；
- Focus Visible；
- Loading；
- Disabled；
- Empty；
- Error；
- Success。

禁止只用颜色表达状态，必须同时提供图标、文字、形状或位置变化。

## 10. Accessibility

- 遵循 WCAG 2.1 AA；
- 所有按钮提供可理解的文本或 `aria-label`；
- 键盘可访问全局命令、导航、主题和弹窗；
- Focus Ring 在浅色和深色主题中均清晰；
- 支持 500% 浏览器字体/页面缩放；
- 正文不使用低于 10px 的关键文本；
- 尊重 `prefers-reduced-motion` 与 `prefers-contrast`。

## 11. Responsive

| 视口 | 结构 |
|---|---|
| 1600–1920 | 展开 Sidebar、完整 Header、12 列驾驶舱 |
| 1280–1440 | 隐藏次要 Header 指标，保持核心操作 |
| 1024 | Sidebar 转 Drawer，Header 简化 |
| Pad | 业务卡片由 12 列自动重排 |
| Mobile | 单列卡片、底部导航、全屏 Popover |

## 12. 技术规范

- Theme Provider：`frontend-next/src/lib/theme-context.tsx`；
- Design Tokens：`frontend-next/src/app/design-system.css`；
- 主题使用 `data-theme="light|dark"`；
- 主题偏好保存在 `localStorage: jiale-graduate-theme`；
- 支持 Light、Dark、Follow System；
- 非关键页面继续使用 Next Dynamic Import；
- Lucide 图标按需引入；
- 动效优先 transform / opacity；
- 禁止在新增组件中复制卡片 Style Object。