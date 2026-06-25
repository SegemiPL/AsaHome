# AGENTS.md

> Coding Agent instruction file for the AsaHome project.

## Before You Start

1. Read `docs/STATIC_ARCHITECTURE.md` — this is the authoritative baseline for the static site architecture.
2. The project is currently a **static site** built with Next.js Static Export.

## Quick Reference

- **Tech stack**: Next.js Static Export + React + TypeScript + Tailwind CSS
- **Content**: Markdown (Blog) + TypeScript static data (characters, TTS, pet)
- **Deploy**: Static hosting (OSS, COS, GitHub Pages, Cloudflare Pages)
- **No runtime dependencies**: No Node.js server, no database, no CMS, no Docker

## Key Rules

1. Do NOT reintroduce Directus, PostgreSQL, Docker, or any server-side infrastructure.
2. Do NOT create API routes (`route.ts`), Server Actions, or middleware.
3. Do NOT depend on runtime `cookies()`, `headers()`, or database requests.
4. All pages MUST be compatible with `output: "export"` (static export).
5. Dynamic routes MUST provide `generateStaticParams()`.
6. Blog content goes in `src/content/posts/*.md` with YAML frontmatter.
7. Static data (characters, TTS samples, pet info) goes in `src/data/*.ts`.
8. Do NOT commit unpacked game assets (audio, text, sprites, model weights) to the public repo.
9. Do NOT expose secrets or tokens — static sites have no server-side env.
10. No second state management library, no second API style, no duplicate dependencies without an ADR.

## Directory Map

```
asahome/
├── apps/web/
│   └── src/
│       ├── app/            # Next.js App Router pages
│       ├── components/     # React components
│       ├── content/posts/  # Markdown blog posts
│       ├── data/           # Static data (characters, TTS, pet, site config)
│       ├── lib/            # Utility modules (posts.ts, markdown rendering)
│       └── styles/         # Global CSS
├── packages/               # Shared config packages (config-eslint, config-typescript)
├── docs/                   # Project documentation
│   └── archive/            # Archived dynamic architecture docs
└── .github/workflows/      # CI/CD
```
