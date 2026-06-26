---
title: "Markdown 渲染测试"
slug: "markdown-rendering-test"
date: "2026-06-26"
summary: "用于测试所有 Markdown 元素的视觉回归文章。"
tags:
  - "Development"
  - "Test"
draft: true
---

## 二级标题

普通中文段落，用于测试字号、行高和段落间距。这个段落应该显示为大约 17px 的字号，行高约为 1.85，颜色为灰色调，适合长文阅读。

这是第二个段落。段落之间应有明显的间距。中文、English、日本語の混排测试 — 三种语言应在基线对齐上保持一致。

### 三级标题

这是三级标题下方的内容。三级标题应比二级标题小一些，但视觉上仍然有明显的层级区分。

#### 四级标题

四级标题用于更细粒度的内容划分，字号与正文字号接近，但通过字重和颜色区分。

## 文本样式

**粗体文字** 用于强调关键概念，*斜体文字* 用于术语或引用作品名。~~删除线~~ 表示已废弃或更改的内容。

行内 `inline code` 应具有轻微背景色、细边框和略小的字号，与正文段落中的普通文字明显区分。例如：使用 `getPostBySlug(slug)` 函数获取文章数据。

## 列表

### 无序列表

- 第一项 — 描述网站的主要功能模块
- 第二项 — 包含对性能优化的相关说明
  - 嵌套列表项一：构建时静态生成
  - 嵌套列表项二：图片懒加载
- 第三项

### 有序列表

1. 安装依赖：`pnpm install`
2. 配置环境变量
3. 执行构建：`pnpm build`
4. 部署到 Cloudflare Pages

### 任务列表

- [x] 完成 Markdown 渲染器
- [x] 添加语法高亮
- [ ] 实现目录导航
- [ ] 添加文章搜索功能

## 引用

> 这是一段引用文字。引用块应使用品牌色左边框，带有柔和的浅色背景，字体不应是斜体，以保持可读性。
>
> 引用块可以包含多个段落，每个段落之间保持适当的间距。
>
> — 参考：AsaHome 设计文档

## 链接

这是一个 [外部链接](https://github.com/SegemiPL/AsaHome)，应使用 `target="_blank"` 和 `rel="noopener noreferrer"` 属性在新标签页中打开。

这是一个 [内部链接](/blog)，应保持站内导航行为。

## 表格

| 功能 | 状态 | 说明 |
|---|---|---|
| Blog | 已完成 | 基于 react-markdown 的静态渲染 |
| TTS | 规划中 | 仅提供音频样本 |
| Window Pet | 规划中 | 基于 Sakura 框架 |
| Search | 未开始 | 待评估方案 |

## 代码

### 代码块（带语法高亮）

```ts
// TypeScript 示例
export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractToc(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  // 解析逻辑...
  return entries;
}
```

```python
# Python 示例
def render_markdown(source: str) -> str:
    """将 Markdown 转换为 HTML。"""
    import markdown
    return markdown.markdown(source, extensions=["fenced_code", "tables"])
```

纯文本代码块（无语言标注）：

```
$ pnpm build
$ pnpm test
✓ All tests passed
```

### 行内代码

在段落中使用 `useState` 和 `useEffect` 等 React Hooks，配合 `react-markdown` 组件来渲染内容。

## 分隔线

---

分隔线上方的内容。

---

分隔线下方的内容。

## 图片

![示例图片](/images/blog/example.webp)

---

## 脚注

这是脚注的测试文本[^1]。

[^1]: 这是脚注内容，应在页面底部或文末显示。

## 结尾

这篇文章覆盖了 AsaHome Markdown 渲染器第一版需要支持的所有元素。如果所有内容均正确渲染，则验收通过。
