# AGENTS.md

> Coding Agent instruction file for the AsaHome project.

## Before You Start

1. Read `docs/reference/AsaHome_Coding_Agent_Development_Guide.md` – this is the authoritative baseline for all development.
2. Follow the 10 Coding Agent rules in Section 0 of that document.
3. The project is currently in **Phase 1** (Website + CMS + Blog + UI).

## Quick Reference

- **Tech stack**: Next.js App Router + React + TypeScript + Tailwind CSS + Directus + PostgreSQL
- **Monorepo**: pnpm workspace (see `pnpm-workspace.yaml`)
- **Phase 1 goal**: Deliver a publicly accessible website with CMS-published blog, complete UI, placeholder TTS/pet pages
- **Phase 2/3**: Only leave interfaces, types, placeholder pages, and extension points – do NOT implement business logic ahead of schedule

## Key Rules

1. Do NOT implement features from future phases beyond stubs/interfaces/placeholders.
2. Do NOT hardcode blog, character, release, or TTS data in frontend source.
3. Do NOT expose Directus admin tokens, GPU inference ports, or object storage keys to the browser.
4. Do NOT commit unpacked game assets (audio, text, sprites, model weights) to the public repo.
5. No second state management library, no second API style, no duplicate dependencies without an ADR.
6. Every feature must include implementation, tests, docs, and config examples.
7. When requirements conflict with the baseline doc, flag it – don't guess.

## Directory Map

```
asahome/
├── apps/web/          # Next.js App Router (Phase 1 active)
├── apps/desktop/      # Tauri desktop pet (Phase 3 stub)
├── packages/          # Shared packages (types, client, character)
├── services/tts-api/  # FastAPI TTS service (Phase 2 stub)
├── directus/          # Schema snapshots, extensions
├── infrastructure/    # Docker Compose, Nginx, scripts
├── docs/              # Project docs, ADRs, architecture
└── .github/workflows/ # CI/CD
```
