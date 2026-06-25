# AsaHome TTS API (Phase 2)

FastAPI-based TTS service with Redis/Celery job queue and GPU worker.

**Status**: Phase 2 — not yet implemented. Skeleton only.

## Architecture

```
Browser → Next.js BFF → FastAPI → Redis/Celery → GPU Worker → Object Storage
```

## Module Boundaries

See `docs/reference/AsaHome_Coding_Agent_Development_Guide.md` Section 10.3 for the full module layout.

## Quick Start (Phase 2)

```bash
# Install dependencies
pip install -e ".[dev]"

# Run API (dev)
uvicorn app.main:app --reload --port 8000

# Run worker (requires Redis + GPU)
celery -A app.workers.celery_app worker --loglevel=info
```
