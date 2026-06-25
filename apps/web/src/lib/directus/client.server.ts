// =============================================================================
// Directus Client — Server-only instance
// =============================================================================
// This module MUST only be imported from server components, Route Handlers,
// or server actions. It carries the Directus admin token which MUST NEVER
// be exposed to the browser.
// =============================================================================

import "server-only";

interface DirectusClientConfig {
  baseUrl: string;
  adminToken: string;
}

let _config: DirectusClientConfig | null = null;

function getConfig(): DirectusClientConfig {
  if (_config) return _config;

  const baseUrl = process.env.DIRECTUS_URL;
  const adminToken = process.env.DIRECTUS_ADMIN_TOKEN;

  if (!baseUrl) {
    throw new Error("DIRECTUS_URL environment variable is not set");
  }
  if (!adminToken) {
    throw new Error("DIRECTUS_ADMIN_TOKEN environment variable is not set");
  }

  _config = { baseUrl, adminToken };
  return _config;
}

/**
 * Low-level fetch wrapper for Directus REST API.
 * Automatically attaches Authorization header (server-side only).
 */
export async function directusFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const config = getConfig();
  const url = `${config.baseUrl}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.adminToken}`,
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new DirectusError(
      `Directus API error: ${res.status} ${res.statusText}`,
      res.status,
      errorBody
    );
  }

  // 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export class DirectusError extends Error {
  public readonly status: number;
  public readonly body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = "DirectusError";
    this.status = status;
    this.body = body;
  }
}
