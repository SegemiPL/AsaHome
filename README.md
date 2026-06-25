# AsaHome

ASa Project 相关技术展示站 — 基于 Next.js Static Export 构建。

## 内容

- **Blog**：技术研究、逆向工程记录、开发日志（Markdown + Git 管理）
- **角色展示**：ASa Project 相关角色与作品介绍
- **TTS 语音合成**：项目介绍与预生成语音示例
- **WindowPet 桌宠**：项目介绍、截图展示与下载入口

## 技术栈

- **网站**：Next.js Static Export + React + TypeScript + Tailwind CSS
- **Blog**：Markdown + gray-matter（构建时解析）
- **部署**：静态托管平台（OSS / COS / GitHub Pages / Cloudflare Pages）

## 开发

```bash
# 安装依赖
pnpm install

# 开发服务器
pnpm dev

# 构建静态站点
pnpm build

# 构建产物在 apps/web/out/
```

## 部署

`apps/web/out/` 目录中的静态文件可直接部署到任何静态托管平台。

## 相关项目

- [AsaHome-TTS](https://github.com/SegemiPL/AsaHome-TTS) — 独立 TTS 推理项目
- [AsaHome-Pet](https://github.com/SegemiPL/AsaHome-Pet) — 独立桌宠客户端

## 声明

AsaHome 是非官方、非商业化的个人技术展示项目，与 ASa Project 及权利方无隶属或授权关系。所有角色与作品权利归原权利方所有。
