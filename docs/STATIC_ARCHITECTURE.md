# AsaHome Static Architecture

## Overview

AsaHome is a **static technology showcase site** built with Next.js Static Export.

The site is built entirely at build time. No server, database, or CMS runs in production.

## Architecture

```
Git Repository
  → GitHub Actions (lint → typecheck → test → build)
  → Next.js Static Export (generates out/)
  → Static Hosting (OSS / COS / GitHub Pages / Cloudflare Pages)
  → Browser
```

## Build Process

1. **Markdown Parsing**: `src/content/posts/*.md` files are parsed with `gray-matter` to extract frontmatter and convert Markdown to HTML.
2. **Static Data Loading**: TypeScript files in `src/data/` provide characters, TTS samples, pet project info, and site configuration.
3. **Static Generation**: Next.js generates all pages as static HTML, including dynamic blog routes via `generateStaticParams()`.
4. **Output**: Static files in `apps/web/out/` — pure HTML, CSS, and JavaScript.

## Module Boundaries

### `src/app/` — Pages
- All pages are React Server Components compatible with static export.
- Dynamic routes (`[slug]`) provide `generateStaticParams()`.
- No `route.ts` API route handlers.
- No Server Actions.
- No `cookies()` or `headers()` from `next/headers`.

### `src/content/posts/` — Blog Content
- Markdown files with YAML frontmatter.
- Each file represents one blog post.
- `draft: true` hides a post from publication.
- Parsed at build time by `src/lib/posts.ts`.

### `src/data/` — Static Data
- TypeScript files exporting typed arrays and objects.
- `site.ts`: Site-wide configuration (title, description, URLs).
- `characters.ts`: Character data and portraits.
- `tts-samples.ts`: TTS sample metadata and audio paths.
- `pet.ts`: WindowPet project info and download links.

### `src/lib/` — Utilities
- `posts.ts`: Blog post reader — file scanning, frontmatter parsing, Markdown→HTML conversion.
- `markdown/`: Markdown rendering utilities (if applicable).

### `src/components/` — UI Components
- React components shared across pages.
- Client Components for interactive features (portrait switching, animations).
- No server-side data fetching.

### `public/` — Static Assets
- Images, audio files, and other static resources.
- Served directly by the hosting platform.

## Data Flow

```
content/posts/*.md  ──→ lib/posts.ts  ──→ Blog pages
data/*.ts            ──→ Pages import  ──→ Static pages
public/*             ──→ Direct URL     ──→ Browser
```

## What Was Removed

The original dynamic architecture (Directus CMS + PostgreSQL + Docker + Nginx + Redis + Celery) has been archived. See `docs/archive/` for reference.

Reasons for static migration:
1. Blog update frequency is low — Git-based publishing is sufficient.
2. Server costs should be minimized for a student maintainer.
3. TTS is handled in a separate repository, not as an online service.
4. WindowPet is distributed via GitHub Releases, not dynamic downloads.
5. No user accounts, comments, or dynamic permissions are needed.

## Future Extension Points

If online features become necessary in the future, add them as **independent services** in separate repositories:

```
Static AsaHome → HTTPS API → Independent TTS Service
Static AsaHome → GitHub Releases → WindowPet downloads
```

The core AsaHome site remains static. Any new backend must be justified by concrete requirements and documented with a new ADR.
