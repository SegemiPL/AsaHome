# ADR-002: pnpm Workspace Monorepo

**Status**: accepted
**Date**: 2026-06-25
**Deciders**: @SegemiPL

## Context

The project is currently a static Next.js export site in a pnpm workspace. The
workspace keeps the web app and shared configuration packages together without
requiring a heavier build orchestrator.

## Decision

Use **pnpm workspace** as the monorepo tool. Introduce Turborepo only when build orchestration complexity warrants it.

## Alternatives Considered

- **Nx**: Rejected — heavier than needed for a 3-app monorepo.
- **Turborepo from start**: Rejected — adds configuration overhead without immediate benefit. Can be adopted later.

## Consequences

- Single `pnpm install` installs all packages.
- Workspace protocol (`workspace:*`) ensures local package references.
- CI caches `pnpm-lock.yaml` for deterministic installs.
- Migration to Turborepo is straightforward if needed.
