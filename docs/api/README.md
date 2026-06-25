# API Documentation

> API contracts and specifications.

## Phase 1

- `/api/internal/revalidate` — Directus webhook endpoint for cache revalidation

## Phase 2 (TTS)

See `docs/reference/AsaHome_Coding_Agent_Development_Guide.md` Section 10.4 for the TTS API contract.

## Conventions

- External business APIs: `/api/v1/...`
- Internal management APIs: `/api/internal/...`
- Error format: `{ code, message, request_id, details? }`
- Never expose Python tracebacks, SQL errors, or internal hostnames to clients
