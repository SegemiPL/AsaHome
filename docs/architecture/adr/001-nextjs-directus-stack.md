# ADR-001: Next.js + Directus + PostgreSQL Stack

**Status**: accepted
**Date**: 2026-06-25
**Deciders**: @SegemiPL

## Context

AsaHome needs a dynamic content website where the site owner can publish blog posts without modifying source code or rebuilding. The site serves Chinese mainland users and must be deployable on a single CPU cloud server in Phase 1.

## Decision

Use **Next.js App Router** for the web frontend/BFF, **Directus** for content management, and **PostgreSQL** as the database.

## Alternatives Considered

- **Static site generator (Astro/Hugo)**: Rejected — requires rebuild on content changes, does not support dynamic TTS/pet features in later phases.
- **WordPress**: Rejected — PHP stack does not align with the React/TypeScript monorepo, harder to integrate with Tauri shared packages.
- **Strapi**: Rejected — Directus chosen for its simpler permissions model, built-in flows/webhooks, and better fit for a single-admin blog.

## Consequences

- Blog content can be published via Directus admin without rebuilding
- Directus webhooks drive Next.js cache revalidation
- Server-side Directus client keeps admin tokens away from the browser
- Shared TypeScript types between web and future desktop client
