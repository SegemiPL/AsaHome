# AsaHome Project Specification

> 本文件为项目概览。完整开发规范请参阅：
> `docs/reference/AsaHome_Coding_Agent_Development_Guide.md`

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
| Web | Next.js App Router + React + TypeScript + Tailwind CSS |
| CMS | Directus + PostgreSQL |
| TTS | FastAPI + Redis + Celery + GPU Worker |
| Desktop | Tauri 2 + Vite + React |
| Monorepo | pnpm workspace |
| 部署 | Docker Compose + Nginx |

## 阶段计划

| 阶段 | 交付目标 |
|------|---------|
| Phase 1 | 网站 + CMS + Blog + 完整 UI + 部署 |
| Phase 2 | 独立 TTS API + 队列 + GPU |
| Phase 3 | 网页角色 + Tauri 桌宠 + 双平台发布 |

## 快速开始

```bash
# 前置条件: Node.js >= 20, pnpm >= 9, Docker

# 安装依赖
pnpm install

# 启动开发数据库和 CMS
docker compose -f infrastructure/compose/docker-compose.dev.yml up -d

# 启动 Next.js 开发服务器
pnpm dev
```
