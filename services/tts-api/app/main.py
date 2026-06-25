"""
AsaHome TTS API — FastAPI application (Phase 2 stub).

Browser MUST NOT access this service directly.
All requests go through Next.js BFF.
"""

from fastapi import FastAPI

app = FastAPI(
    title="AsaHome TTS API",
    version="0.1.0",
    docs_url=None,  # Disable public docs in production
)


@app.get("/health/live")
async def health_live():
    return {"status": "ok", "service": "asahome-tts-api"}


@app.get("/health/ready")
async def health_ready():
    return {"status": "ok", "service": "asahome-tts-api"}
