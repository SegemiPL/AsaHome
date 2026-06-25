// =============================================================================
// API Client — Placeholder stubs (Phase 1)
// =============================================================================
// Real implementations will replace these stubs as each API is built.
// =============================================================================

// Phase 1 API client placeholder
// Real implementations deferred to Phase 2/3

import type {
  PostListItem,
  PostDetail,
  Tag,
  Character,
  SiteSettings,
  DesktopRelease,
  PaginatedResult,
} from "@asahome/shared-types";

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export async function getPostList(
  _params?: { page?: number; pageSize?: number; tagSlug?: string }
): Promise<PaginatedResult<PostListItem>> {
  throw new Error("Not implemented — Phase 1 placeholder");
}

export async function getPostBySlug(_slug: string): Promise<PostDetail | null> {
  throw new Error("Not implemented — Phase 1 placeholder");
}

export async function getTags(): Promise<Tag[]> {
  throw new Error("Not implemented — Phase 1 placeholder");
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

export async function getCharacters(): Promise<Character[]> {
  throw new Error("Not implemented — Phase 1 placeholder");
}

export async function getCharacterBySlug(
  _slug: string
): Promise<Character | null> {
  throw new Error("Not implemented — Phase 1 placeholder");
}

// ---------------------------------------------------------------------------
// Site Settings
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  throw new Error("Not implemented — Phase 1 placeholder");
}

// ---------------------------------------------------------------------------
// Desktop Releases
// ---------------------------------------------------------------------------

export async function getDesktopReleases(
  _params?: { platform?: string; channel?: string }
): Promise<DesktopRelease[]> {
  throw new Error("Not implemented — Phase 1 placeholder");
}

