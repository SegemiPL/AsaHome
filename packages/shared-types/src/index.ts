// =============================================================================
// AsaHome Shared Types
// =============================================================================
// Domain model types shared across web, desktop, and services.
// BEWARE: Do NOT import Directus SDK types here. These are pure domain types.
// =============================================================================

// ---------------------------------------------------------------------------
// Blog / Posts
// ---------------------------------------------------------------------------

export type PostStatus = "draft" | "published" | "archived";

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverUrl: string | null;
  publishedAt: string | null;
  tags: Tag[];
}

export interface PostDetail extends PostListItem {
  contentMarkdown: string;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
  prevPost: { title: string; slug: string } | null;
  nextPost: { title: string; slug: string } | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

// ---------------------------------------------------------------------------
// Site Settings (singleton)
// ---------------------------------------------------------------------------

export interface SiteSettings {
  siteTitle: string;
  subtitle: string;
  homeIntro: string;
  footerText: string;
  unofficialNotice: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  socialLinks: Record<string, string>;
  homeBackgroundAsset: string | null;
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

export interface Character {
  id: string;
  slug: string;
  nameZh: string;
  nameJa: string;
  gameTitle: string;
  description: string;
  displayOrder: number;
  status: string;
  defaultPortrait: string | null;
  copyrightNotice: string;
}

// ---------------------------------------------------------------------------
// Desktop Releases (Phase 1: schema only)
// ---------------------------------------------------------------------------

export type ReleaseChannel = "stable" | "beta" | "canary";

export interface DesktopRelease {
  version: string;
  channel: ReleaseChannel;
  platform: "windows" | "macos" | "linux";
  arch: "x86_64" | "aarch64";
  downloadUrl: string;
  sha256: string;
  releaseNotes: string;
  publishedAt: string;
  minimumOsVersion: string | null;
}

// ---------------------------------------------------------------------------
// API Error
// ---------------------------------------------------------------------------

export interface ApiError {
  code: string;
  message: string;
  requestId: string;
  details?: unknown;
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
