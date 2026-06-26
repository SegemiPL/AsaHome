# AsaHome Markdown 渲染指导文档

> 状态：当前推荐实现基线  
> 适用项目：AsaHome 静态网站  
> 技术环境：Next.js Static Export + React + TypeScript + Tailwind CSS  
> 推荐存放位置：`docs/MARKDOWN_RENDERING_GUIDE.md`

---

## 1. 文档目的

本文定义 AsaHome Blog 的 Markdown 渲染基线。

目标不只是把 Markdown 转换为 HTML，而是建立一套统一、可维护、适合技术文章并符合 AsaHome 视觉风格的文章系统。最终实现应满足：

- 正确渲染常用 Markdown 语法；
- 适合中文、日文和英文混排；
- 清晰展示代码、表格、引用、图片和技术说明；
- 与 AsaHome 的 Galgame 主题视觉保持一致；
- 兼容 Next.js Static Export 和 Cloudflare Pages；
- 不依赖运行时服务器；
- 所有 Blog 共用同一套渲染组件和样式；
- 后续可以扩展目录、提示框、公式和图表，但不提前过度设计。

---

## 2. 当前项目背景

AsaHome 当前是静态技术展示站：

```text
Markdown 文件
    ↓
Next.js 构建
    ↓
静态 HTML / CSS / JavaScript
    ↓
Cloudflare Pages
```

生产环境不再使用：

- Directus；
- PostgreSQL；
- 动态 Markdown API；
- 常驻 Node.js 服务；
- Docker；
- 请求时语法高亮。

所有文章都应在 `pnpm build` 阶段生成静态页面。

---

## 3. 当前问题的两种可能原因

### 3.1 Markdown 没有经过解析

如果页面直接显示：

```text
# 标题

- 项目一
- 项目二
```

说明正文可能只是作为普通字符串输出，例如：

```tsx
<div>{post.content}</div>
```

这时需要引入 Markdown 解析器。

### 3.2 Markdown 已经转换成 HTML，但没有排版样式

如果 DOM 中已经出现 `<h2>`、`<ul>`、`<blockquote>`，但显示效果仍像普通文字，通常是因为 Tailwind Preflight 重置了浏览器默认样式，包括：

- 标题字号和字重；
- 列表圆点与编号；
- 默认边距；
- 引用样式；
- 表格边框。

因此，正确解析 Markdown 后还必须增加独立的文章排版层。

---

## 4. 推荐技术方案

采用以下组合：

| 职责 | 推荐方案 |
|---|---|
| Markdown 转 React | `react-markdown` |
| GitHub 风格语法 | `remark-gfm` |
| 标题 ID | `rehype-slug` |
| 标题锚点链接 | `rehype-autolink-headings` |
| 代码块处理 | `rehype-pretty-code` |
| 语法高亮引擎 | `shiki` |
| 基础文章排版 | `@tailwindcss/typography` |
| Front Matter | 保留现有 `gray-matter` |

推荐渲染链：

```text
Markdown 文件
    ↓
gray-matter
    ├── Front Matter
    └── 正文
          ↓
react-markdown
          ↓
remark-gfm
          ↓
rehype-slug
          ↓
rehype-autolink-headings
          ↓
rehype-pretty-code / Shiki
          ↓
React 元素
          ↓
Tailwind Typography
          ↓
AsaHome 专属文章样式
          ↓
Next.js Static Export
```

---

## 5. 选择该方案的原因

### 5.1 `react-markdown`

用于把 Markdown 字符串转换为 React 元素，并允许通过插件与自定义组件控制链接、图片、表格和代码块。

它应作为整个项目唯一的 Markdown 渲染入口，不要在不同页面中维护多套实现。

### 5.2 `remark-gfm`

补充技术 Blog 常用语法：

- 表格；
- 删除线；
- 任务列表；
- 自动链接；
- 脚注。

### 5.3 Tailwind Typography

提供 `prose` 排版类，为 Markdown 生成的 HTML 恢复合理的标题、列表、引用、代码和表格样式。

它只作为基础层，最终视觉仍由 AsaHome 专属 CSS 覆盖。

### 5.4 Shiki 与 `rehype-pretty-code`

在构建阶段完成接近 VS Code 的代码高亮：

- 浏览器不需要运行高亮库；
- 页面首次加载就能看到完整代码样式；
- 不增加运行时 API；
- 适合 Cloudflare Pages 静态部署。

---

## 6. 第一版支持范围

必须支持：

- 普通段落；
- `h2`～`h4` 标题；
- 粗体与斜体；
- 删除线；
- 无序和有序列表；
- 嵌套列表；
- 任务列表；
- 引用；
- 行内代码；
- 围栏代码块；
- 代码语法高亮；
- 表格；
- 链接；
- 图片；
- 分隔线；
- 脚注；
- 标题锚点；
- 文章目录。

第一版不实现：

- 任意原始 HTML；
- 在线 Markdown 编辑器；
- 评论系统；
- Mermaid；
- 代码执行；
- 用户上传 Markdown；
- 浏览器端实时解析 Markdown；
- 任意 MDX 组件。

---

## 7. 推荐目录结构

```text
apps/web/
├── app/
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── components/
│   └── blog/
│       ├── ArticleHeader.tsx
│       ├── MarkdownArticle.tsx
│       ├── TableOfContents.tsx
│       └── MobileTableOfContents.tsx
├── content/
│   └── posts/
│       ├── example-post.md
│       └── markdown-rendering-test.md
├── lib/
│   └── posts/
│       ├── index.ts
│       ├── parse-post.ts
│       ├── extract-toc.ts
│       └── types.ts
├── styles/
│   └── markdown.css
└── app/
    └── globals.css
```

职责划分：

- `content/posts`：文章源文件；
- `lib/posts`：读取和解析文章；
- `MarkdownArticle`：统一渲染 Markdown；
- `markdown.css`：文章视觉样式；
- Blog 页面：布局、SEO 和文章元数据；
- `TableOfContents`：目录导航。

---

## 8. 内容规范

### 8.1 Front Matter

每篇文章应包含：

```yaml
---
title: "AsaHome 开发记录"
slug: "asahome-development-notes"
date: "2026-06-26"
summary: "记录 AsaHome 的设计和开发过程。"
tags:
  - AsaHome
  - Development
cover: "/images/blog/asahome-cover.webp"
draft: false
---
```

建议类型：

```ts
interface PostMetadata {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  cover?: string;
  draft: boolean;
}
```

### 8.2 标题约定

文章页面头部负责渲染唯一的 `<h1>`。

Markdown 正文应从二级标题开始：

```md
## 背景

### 当前架构
```

不要在正文中再次写：

```md
# AsaHome 开发记录
```

这样可以保证：

- 页面只有一个一级标题；
- SEO 结构更清晰；
- 屏幕阅读器导航正确；
- 目录生成更稳定。

---

## 9. 依赖安装

在 Web 项目目录执行：

```bash
pnpm add \
  react-markdown \
  remark-gfm \
  rehype-slug \
  rehype-autolink-headings \
  rehype-pretty-code \
  shiki
```

安装 Tailwind Typography：

```bash
pnpm add -D @tailwindcss/typography
```

完成后执行：

```bash
pnpm lint
pnpm typecheck
pnpm build
```

依赖变更后必须提交更新后的 lockfile。

---

## 10. Tailwind Typography 配置

### Tailwind CSS 4

在主 CSS 中：

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

### Tailwind CSS 3

在 `tailwind.config.ts` 中：

```ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  plugins: [typography],
};

export default config;
```

Coding Agent 在修改前必须确认项目真实使用的 Tailwind 主版本。

---

## 11. 统一 Markdown 组件

建立：

```text
components/blog/MarkdownArticle.tsx
```

所有文章必须通过该组件渲染。页面文件中不得复制另一套插件配置。

组件职责：

```text
remarkPlugins
└── remark-gfm

rehypePlugins
├── rehype-slug
├── rehype-autolink-headings
└── rehype-pretty-code
```

同时定义以下自定义渲染组件：

- 链接；
- 图片；
- 表格；
- 可选的代码标题。

建议接口：

```tsx
interface MarkdownArticleProps {
  source: string;
}
```

`MarkdownArticle` 应保持为服务端构建组件，使 Markdown 和代码高亮在静态构建阶段完成。

---

## 12. 元素渲染要求

### 12.1 链接

外部链接应使用：

```text
target="_blank"
rel="noopener noreferrer"
```

内部链接保持站内导航行为。

### 12.2 图片

图片要求：

- 提供有意义的 `alt`；
- 非首屏图片使用懒加载；
- 尽量声明宽高；
- 优先 WebP 或 AVIF；
- 不得撑破正文宽度；
- 使用适度圆角和阴影；
- 不依赖 Next.js 默认服务端图片优化接口。

### 12.3 表格

表格外层必须有横向滚动容器。

正文页面本身不能因为宽表格产生整体横向滚动。

### 12.4 行内代码

行内代码需要：

- 轻微背景；
- 细边框；
- 紧凑内边距；
- 比正文略小的字号；
- 与代码块明显区分。

### 12.5 代码块

代码块需要：

- 构建时语法高亮；
- 横向滚动；
- 中性深色背景；
- 高对比度；
- 不执行代码；
- 后续可扩展复制按钮。

### 12.6 引用块

引用块应采用：

- 柔和浅色背景；
- 品牌色左边框；
- 正常字体而非整段斜体；
- 清晰的内边距；
- 与普通段落明显区分。

---

## 13. 文章页面布局

桌面端推荐两栏：

```text
┌─────────────────────────────────────────────┐
│ 标题、摘要、日期、标签                      │
├──────────────────────────┬──────────────────┤
│ 正文 720～780 px          │ 目录 210～240 px │
└──────────────────────────┴──────────────────┘
```

建议：

| 项目 | 建议值 |
|---|---|
| 页面最大宽度 | 约 1180 px |
| 正文宽度 | 720～780 px |
| 目录宽度 | 210～240 px |
| 两栏间距 | 48～64 px |
| 正文字号 | 约 17 px |
| 中文行高 | 1.8～1.95 |

移动端：

- 隐藏右侧固定目录；
- 可在标题下显示折叠目录；
- 减少外层大圆角和大阴影；
- 代码块和表格独立滚动；
- 页面不能横向溢出。

---

## 14. 文章目录

第一版目录只收集：

```text
h2
h3
```

推荐类型：

```ts
interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}
```

目录 ID 必须与 `rehype-slug` 生成的标题 ID 完全一致。

目录应支持：

- 锚点跳转；
- 桌面端 sticky；
- `h2` 和 `h3` 的层级区分；
- 后续可增加当前章节高亮；
- 固定导航栏下的正确滚动偏移。

标题建议配置：

```css
scroll-margin-top: 6rem;
```

具体值应与站点导航高度一致。

---

## 15. AsaHome 视觉方向

文章页应同时具备：

- 技术 Blog 的可读性；
- 温和的 Galgame 视觉风格；
- 克制的角色装饰；
- 长文阅读需要的高对比度。

### 品牌色使用范围

品牌粉色适合用于：

- 链接；
- 标题装饰；
- 引用边框；
- 当前目录项；
- 小型装饰元素。

不应用于：

- 大面积正文背景；
- 整个代码块；
- 所有边框；
- 长段正文文字。

### 背景立绘

可以保留背景人物，但必须：

- 不直接位于正文文字下方；
- 使用很低透明度；
- 正文区域使用接近不透明的暖白背景；
- 移动端允许隐藏；
- 不降低文字对比度。

### 正文容器

建议使用：

- 暖白色背景；
- 轻微半透明边框；
- 中等圆角；
- 克制阴影；
- 可选轻度毛玻璃。

视觉装饰必须服从阅读体验。

---

## 16. 安全约束

### 不默认启用原始 HTML

不要为了在 Markdown 中写任意 HTML 而直接加入 `rehype-raw`。

### 未来存在非可信内容时

如果未来支持：

- 外部投稿；
- CMS HTML；
- 用户评论；
- 用户上传 Markdown；
- 导入第三方文章；

必须引入明确的 HTML 白名单和 `rehype-sanitize` 或等价方案。

需要重点防范：

- JavaScript URL；
- iframe；
- 事件处理属性；
- 内联脚本；
- `id` / `name` 引发的 DOM clobbering；
- 任意样式注入。

Markdown 不得：

- 执行 JavaScript；
- 读取环境变量；
- 运行 shell；
- 导入任意 React 组件；
- 执行文章中的代码。

---

## 17. 可访问性要求

必须满足：

- 页面只有一个 `<h1>`；
- 标题层级连续且合理；
- 信息图片有 `alt`；
- 纯装饰图片使用空 `alt`；
- 键盘焦点清晰可见；
- 链接不能只靠颜色区分；
- 表格可阅读；
- 支持 reduced motion；
- 锚点跳转后标题不被顶部导航遮挡；
- 代码块可通过键盘横向滚动。

---

## 18. 性能要求

必须保持静态构建特性：

- Markdown 在构建阶段解析；
- Shiki 在构建阶段运行；
- 浏览器不加载 Markdown 解析器；
- 不依赖运行时 API；
- 大图提交前压缩；
- 非首屏图片懒加载；
- 音频不自动预加载；
- 文章页只发送实际需要的交互脚本。

第一版不要引入：

- 完整文档框架；
- 在线编辑器；
- 客户端高亮库；
- 大型动画依赖；
- 大量 IntersectionObserver 逻辑。

---

## 19. Markdown 渲染测试文章

创建：

```text
content/posts/markdown-rendering-test.md
```

至少覆盖：

```md
---
title: "Markdown Rendering Test"
slug: "markdown-rendering-test"
date: "2026-06-26"
summary: "用于测试所有 Markdown 元素的视觉回归文章。"
tags:
  - Development
draft: true
---

## 二级标题

普通中文段落，用于测试字号、行高和段落间距。

### 三级标题

**粗体**、*斜体*、~~删除线~~、`inline code`。

- 无序列表
- 第二项
  - 嵌套列表

1. 有序列表
2. 第二项

- [x] 已完成
- [ ] 未完成

> 引用块测试内容。

[外部链接](https://example.com)

| 功能 | 状态 | 说明 |
|---|---|---|
| Blog | Complete | Static Markdown |
| TTS | Planned | Samples only |

```ts
export function hello(name: string): string {
  return `Hello, ${name}`;
}
```

![示例图片](/images/blog/example.webp)

---

结尾段落。
```

该文章默认不发布，但应在本地或预览部署中可用于回归测试。

---

## 20. 实施顺序

### Phase 1：修复正确性

1. 判断当前是未解析还是仅缺少样式；
2. 安装 `react-markdown`；
3. 添加 `remark-gfm`；
4. 建立统一 `MarkdownArticle`；
5. 验证标题、列表、表格、引用和链接；
6. 建立测试文章。

### Phase 2：建立排版

1. 安装 Tailwind Typography；
2. 应用 `prose`；
3. 创建 `markdown.css`；
4. 定义标题、引用、表格、链接和图片样式；
5. 测试桌面和移动端。

### Phase 3：增强技术内容

1. 加入 `rehype-pretty-code`；
2. 配置 Shiki；
3. 区分行内代码和代码块；
4. 支持横向滚动；
5. 根据需要支持高亮行。

### Phase 4：增加目录导航

1. 加入 `rehype-slug`；
2. 加入 `rehype-autolink-headings`；
3. 提取 `h2` / `h3`；
4. 实现桌面目录；
5. 可选实现移动目录；
6. 验证锚点偏移。

### Phase 5：质量检查

1. 测试长中文文章；
2. 测试中日英混排；
3. 测试宽表格；
4. 测试长代码行；
5. 测试缺失图片；
6. 测试内外部链接；
7. 执行静态构建；
8. 检查 Cloudflare Pages Preview。

---

## 21. 验收标准

```text
[ ] Markdown 语法已转换为语义化 HTML
[ ] Tailwind reset 不再破坏标题和列表
[ ] 表格可正确显示并在移动端横向滚动
[ ] 代码块在构建时完成语法高亮
[ ] 行内代码与代码块样式不同
[ ] 外部链接包含安全属性
[ ] 图片不撑破正文
[ ] 页面只有一个 h1
[ ] h2 和 h3 具有稳定 ID
[ ] 标题锚点可用
[ ] 目录 ID 与标题 ID 一致
[ ] 锚点标题不被固定导航遮挡
[ ] 桌面正文宽度适合阅读
[ ] 移动端无整体横向溢出
[ ] 测试文章覆盖全部支持语法
[ ] pnpm lint 通过
[ ] pnpm typecheck 通过
[ ] pnpm build 通过
[ ] apps/web/out 中生成 Blog 页面
[ ] Cloudflare Pages Preview 显示正常
```

---

## 22. 暂缓功能

第一版明确不加入：

- 评论；
- 在线 Markdown 编辑；
- Mermaid；
- KaTeX / MathJax，除非真实文章需要；
- 任意 MDX 组件；
- 第三方脚本嵌入；
- 代码执行；
- 点赞和反应；
- 客户端全文搜索；
- 自动翻译；
- AI 摘要。

---

## 23. 后续扩展方向

| 需求 | 可选扩展 |
|---|---|
| 数学公式 | `remark-math` + KaTeX |
| 图表 | 构建时 Mermaid 渲染 |
| 提示框 | remark directives + 自定义组件 |
| 复制代码 | rehype-pretty-code transformer |
| 深色代码主题 | Shiki 双主题 |
| 搜索 | 构建静态搜索索引 |
| 系列文章 | Front Matter 关系字段 |
| 相关文章 | 构建时标签匹配 |

任何扩展必须继续满足：

- 静态导出；
- 构建时处理；
- 无生产服务器；
- 合理页面体积；
- 内容安全；
- AsaHome 统一视觉。

---

## 24. 最终技术基线

AsaHome Blog 的 Markdown 渲染基线为：

> 使用 `react-markdown` 作为统一 Markdown 渲染器，使用 `remark-gfm` 支持技术 Blog 常用语法，使用 `rehype-slug` 和 `rehype-autolink-headings` 提供稳定的章节导航，使用 `rehype-pretty-code` 与 Shiki 在构建阶段完成代码高亮，使用 Tailwind Typography 提供基础排版，并通过 AsaHome 专属 CSS 定义标题、链接、引用、表格、行内代码、代码块、图片和响应式布局。所有文章在 Next.js 静态构建阶段生成，并通过 Cloudflare Pages 发布。

---

## 25. 主要参考资料

- React Markdown  
  https://github.com/remarkjs/react-markdown

- remark-gfm  
  https://github.com/remarkjs/remark-gfm

- Tailwind CSS Typography  
  https://github.com/tailwindlabs/tailwindcss-typography

- Rehype Pretty Code  
  https://rehype-pretty.pages.dev/

- Shiki  
  https://shiki.style/

- Next.js Static Export  
  https://nextjs.org/docs/app/guides/static-exports

- rehype-sanitize  
  https://github.com/rehypejs/rehype-sanitize
