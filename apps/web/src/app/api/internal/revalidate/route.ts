import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * POST /api/internal/revalidate
 *
 * Called by Directus Flow webhook when content is published/updated.
 * Secured by HMAC signature + timestamp + replay protection.
 *
 * Constraints (Section 6.2):
 * - POST only
 * - Must have signature, timestamp, and anti-replay check
 * - Failure must not roll back Directus transaction (non-blocking)
 * - Webhook failures must produce structured logs
 */

function verifySignature(body: string, signature: string, timestamp: string): boolean {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error("WEBHOOK_SECRET is not configured");
    return false;
  }

  // Replay protection: reject timestamps older than 5 minutes
  const ts = parseInt(timestamp, 10);
  if (isNaN(ts) || Date.now() - ts > 5 * 60 * 1000) {
    return false;
  }

  const payload = `${timestamp}.${body}`;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");

  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expected, "hex");
    return sigBuf.length === expBuf.length && timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-asahome-signature");
  const timestamp = request.headers.get("x-asahome-timestamp");
  const body = await request.text();

  // Require signature and timestamp
  if (!signature || !timestamp) {
    return NextResponse.json(
      { code: "UNAUTHORIZED", message: "Missing signature or timestamp", requestId: "" },
      { status: 401 }
    );
  }

  // Verify signature
  if (!verifySignature(body, signature, timestamp)) {
    return NextResponse.json(
      { code: "FORBIDDEN", message: "Invalid signature", requestId: "" },
      { status: 403 }
    );
  }

  // Parse the collection and action from the webhook payload
  let collection: string | undefined;
  let action: string | undefined;
  try {
    const payload = JSON.parse(body);
    collection = payload.collection;
    action = payload.action; // "create" | "update" | "delete"
  } catch {
    return NextResponse.json(
      { code: "BAD_REQUEST", message: "Invalid JSON body", requestId: "" },
      { status: 400 }
    );
  }

  // Revalidate appropriate cache tags based on the collection
  const tagsToRevalidate: string[] = [];

  switch (collection) {
    case "posts":
      tagsToRevalidate.push("posts");
      break;
    case "tags":
      tagsToRevalidate.push("posts", "tags");
      break;
    case "site_settings":
      tagsToRevalidate.push("site_settings");
      break;
    case "characters":
      tagsToRevalidate.push("characters");
      break;
    case "desktop_releases":
      tagsToRevalidate.push("desktop_releases");
      break;
    default:
      // Unknown collection — still acknowledge to avoid blocking the webhook
      console.warn(`Revalidation requested for unknown collection: ${collection}`);
      return NextResponse.json({ revalidated: [] }, { status: 200 });
  }

  for (const tag of tagsToRevalidate) {
    revalidateTag(tag);
  }

  console.log(`Revalidated tags: [${tagsToRevalidate.join(", ")}] via webhook (collection: ${collection}, action: ${action})`);

  return NextResponse.json({ revalidated: tagsToRevalidate }, { status: 200 });
}

// Only POST is allowed
export async function GET() {
  return NextResponse.json(
    { code: "METHOD_NOT_ALLOWED", message: "Only POST is allowed", requestId: "" },
    { status: 405 }
  );
}
