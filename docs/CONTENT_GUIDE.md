# AsaHome Content Guide

How to add and update content on the static AsaHome site.

## Adding a Blog Post

1. Create a new `.md` file in `apps/web/src/content/posts/`.
2. Add YAML frontmatter at the top:

```yaml
---
title: "文章标题"
slug: "article-slug"
date: "2026-06-25"
summary: "文章摘要，显示在列表页。"
tags:
  - "标签1"
  - "标签2"
cover: null
draft: false
---
```

3. Write the article content in Markdown below the `---`.
4. Set `draft: true` to hide the post from publication.
5. Commit and push — the post will appear on the site after the next build.

### Supported Markdown

- Headings: `#`, `##`, `###`
- Bold: `**text**`
- Italic: `*text*`
- Bold + Italic: `***text***`
- Inline code: `` `code` ``
- Links: `[text](url)`
- Images: `![alt](url)`
- Horizontal rules: `---`
- Unordered lists: `- item`

## Adding a Character

Edit `apps/web/src/data/characters.ts`:

```typescript
{
  id: "character-id",
  slug: "character-slug",
  nameZh: "中文名",
  nameJa: "日本語名",
  gameTitle: "所属作品",
  description: "角色描述",
  displayOrder: 1,
  defaultPortrait: "/characters/portrait.png",
  copyrightNotice: "© rights holder",
}
```

Place portrait images in `apps/web/public/characters/`.

## Adding a TTS Sample

Edit `apps/web/src/data/tts-samples.ts`:

```typescript
{
  id: "sample-01",
  characterId: "character-id",
  characterName: "角色名",
  textZh: "中文文本",
  textJa: "日本語テキスト",
  audioPath: "/audio/tts/sample-01.wav",
  modelName: "v1.0",
  description: "模型说明",
}
```

Place audio files in `apps/web/public/audio/tts/`.

## Updating WindowPet Info

Edit `apps/web/src/data/pet.ts` to update:
- `petProjectInfo`: Project description, features, tech stack, GitHub links.
- `petScreenshots`: Screenshot paths and captions.
- `platforms`: Supported platforms and download labels.

Place screenshots in `apps/web/public/images/`.

## Updating Site Config

Edit `apps/web/src/data/site.ts` to change site title, description, social links, etc.

## After Making Changes

```bash
pnpm build   # Rebuild the static site
```

The updated `out/` directory can be deployed.
