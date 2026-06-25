# Changelog

All notable changes to AsaHome will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/zh-CN/).

---

## [Unreleased]

### Added
- **Blog 系统**：基于 Markdown + `gray-matter` 的静态文章管理，通过 Git 提交发布
- **静态数据模块**：`src/data/` 统一管理角色、TTS 示例、桌宠信息和站点配置
- **静态导出**：Next.js `output: "export"` 模式，生产环境无需 Node.js、Docker 或数据库
- **架构文档**：`docs/STATIC_ARCHITECTURE.md`、`docs/CONTENT_GUIDE.md`、`docs/STATIC_DEPLOYMENT.md`
- **示例文章**：`content/posts/hello-asahome.md`
- **LICENSE 文件**：Apache-2.0 + `LICENSE_SCOPE.md` + `NOTICE` + `ASSETS.md`

### Changed
- **架构重构**：从 Next.js + Directus + PostgreSQL 动态架构迁移为纯静态站点
- **首页**：用 `getAllPosts()` 加载真实 Blog 列表，替代骨架占位
- **Blog 详情页**：新增 `generateStaticParams()` 实现静态文章生成
- **角色页**：改用静态数据，替代 CMS 骨架
- **TTS 页**：改为项目介绍 + 预生成音频示例展示页
- **桌宠页**：改为项目介绍 + GitHub Releases 下载引导
- **关于页**：更新架构描述，移除 Directus 引用
- **下载页**：链接到 GitHub Releases
- **AGENTS.md**：重写为静态站点开发规范，禁止重新引入服务端依赖
- **README.md**：更新项目描述和技术栈
- **CI**：移除 Docker Compose 验证，新增 `out/` artifact 上传

### Removed
- **Directus CMS**：整个 `directus/` 目录及 `apps/web/src/lib/directus/` 数据层
- **PostgreSQL**：数据库服务及备份脚本
- **Docker Compose**：`docker-compose.dev.yml`、`docker-compose.prod.yml`
- **Nginx 配置**：`infrastructure/nginx/`
- **Web Dockerfile**：`apps/web/Dockerfile`
- **API Route Handler**：`/api/internal/revalidate`
- **Health Route**：`/health/live`、`/health/ready`
- **TTS 服务**：`services/tts-api/`（移入独立仓库）
- **桌宠客户端**：`apps/desktop/`（移入独立仓库）
- **工作区包**：`api-client`、`shared-types`、`character-core`、`character-ui`
- **动态环境变量**：Directus、PostgreSQL、Redis、TTS API 相关

### Fixed
- 静态导出模式下 `robots.ts` / `sitemap.ts` 缺少 `force-static` 声明
- `lib/posts.ts` 文章目录路径指向错误

---

## [0.1.0] — 2026-06-25

### Added
- **项目骨架**：pnpm monorepo 结构，包含 `apps/web`、`apps/desktop`、`packages/`、`services/`、`directus/`、`infrastructure/`
- **Next.js 网站**：App Router + React + TypeScript + Tailwind CSS
- **基础页面**：首页、Blog、角色、关于、版权、隐私、TTS 占位、桌宠占位、下载
- **Directus 数据层**：schema、query、mapper、client 模块（已预留，未接入页面）
- **共享类型**：`@asahome/shared-types` 包，定义 Blog、角色、TTS、桌宠相关类型
- **API Client 骨架**：`@asahome/api-client` 包
- **桌宠骨架**：Tauri 2 项目壳 + `character-core`、`character-ui` 包
- **TTS 服务骨架**：FastAPI 项目壳 + 空模块结构
- **基础设施**：Docker Compose（开发/生产）、Nginx 配置、数据库备份脚本
- **CI**：lint、typecheck、test、build + Docker Compose 配置验证
- **文档**：AGENTS.md、ADRs、开发规范、运维手册
- **初始提交**：`bc95029`

