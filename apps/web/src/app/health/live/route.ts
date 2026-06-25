/**
 * GET /health/live — Liveness probe.
 * Returns 200 if the process is running.
 */
export async function GET() {
  return Response.json(
    { status: "ok", service: "asahome-web", env: process.env.NODE_ENV ?? "unknown" },
    { status: 200 }
  );
}
