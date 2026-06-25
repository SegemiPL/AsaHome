# ADR-002: pnpm Workspace Monorepo

**Status**: accepted
**Date**: 2026-06-25
**Deciders**: @SegemiPL

## Context

The project spans multiple packages (shared types, API client, character packages), two apps (web, desktop), and a backend service (TTS). These must share types and logic without duplication.

## Decision

Use **pnpm workspace** as the monorepo tool. Introduce Turborepo only when build orchestration complexity warrants it.

## Alternatives Considered

- **Nx**: Rejected — heavier than needed for a 3-app monorepo.
- **Turborepo from start**: Rejected — adds configuration overhead without immediate benefit. Can be adopted later.

## Consequences

- Single `pnpm install` installs all packages
- Workspace protocol (`workspace:*`) ensures local package references
- CI caches `pnpm-lock.yaml` for deterministic installs
- Migration to Turborepo is straightforward if needed
