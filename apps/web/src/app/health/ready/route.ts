/**
 * GET /health/ready — Readiness probe.
 * Returns 200 if the service is ready to accept requests.
 * Phase 1: always ready. Future: check Directus connectivity.
 */
export async function GET() {
  return Response.json(
    { status: "ok", service: "asahome-web", env: process.env.NODE_ENV ?? "unknown" },
    { status: 200 }
  );
}
