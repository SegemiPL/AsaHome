# AsaHome

ASa Project 相关技术展示站 — 基于 Next.js Static Export 构建。

## 内容

- **Blog**：技术研究、逆向工程记录、开发日志、杂谈
- **数据源**：ASa Project 相关作品的解包数据
- **TTS 语音合成**：TTS 与预生成语音示例
- **WindowPet 桌宠**：WindowPet 展示与下载入口

## 技术栈

- **网站**：Next.js Static Export + React + TypeScript + Tailwind CSS
- **Blog**：Markdown + gray-matter
- **部署**：Cloudflare Pages

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

- [AsaHome-Service](https://github.com/SegemiPL/AsaHome-Service) — 目前包含 AsaProject xp3 文件解包脚本，未来计划 TTS 语音模型项目，WindowPet 项目

## 声明

AsaHome 是非官方、非商业化的个人展示项目，与 ASa Project 及权利方无隶属或授权关系。所有角色与作品权利归原权利方所有。
