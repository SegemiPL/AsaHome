# AsaHome Project Specification

> 本文件为当前静态站点项目概览。历史动态架构资料已归档，仅作参考。

## 项目定位

AsaHome 是一个围绕 ASa Project 作品构建的**非商业化个人技术展示网站**。

## 核心能力

1. **Blog** — 站长发布杂谈、逆向工程记录和开发日志
2. **角色展示** — ASa Project 角色与作品介绍
3. **TTS 语音合成** (Phase 2) — 中文→日文角色语音
4. **桌面桌宠** (Phase 3) — Windows/macOS 本地客户端

## 技术栈

| 领域 | 方案 |
|------|------|
| Web | Next.js Static Export + React + TypeScript + Tailwind CSS |
| 内容 | Markdown Blog + TypeScript 静态数据 |
| TTS | 独立仓库，本站只展示说明与预生成样例 |
| Desktop | 独立仓库，本站只展示说明与下载入口 |
| Monorepo | pnpm workspace |
| 部署 | 静态托管（OSS / COS / GitHub Pages / Cloudflare Pages） |

## 阶段计划

| 阶段 | 交付目标 |
|------|---------|
| Phase 1 | 静态网站 + Markdown Blog + 基础页面 + 静态部署 |
| Phase 2 | TTS 项目说明、预生成样例与独立仓库链接 |
| Phase 3 | 桌宠项目说明、截图、平台信息与 Releases 下载入口 |

## 快速开始

```bash
# 前置条件: Node.js >= 20, pnpm >= 9

# 安装依赖
pnpm install

# 启动 Next.js 开发服务器
pnpm dev

# 构建静态站点
pnpm build
```
