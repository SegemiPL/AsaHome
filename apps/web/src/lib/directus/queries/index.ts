// =============================================================================
// Directus Queries — Typed data-fetching functions
// =============================================================================
// Each query function:
//   1. Calls the Directus REST API via the server-only client
//   2. Validates the response shape (basic check in Phase 1)
//   3. Maps to domain types via mappers
// =============================================================================

import { directusFetch, DirectusError } from "../client.server";
import {
  DirectusPostItem,
  DirectusPostDetail,
  DirectusTag,
  DirectusSiteSettings,
  DirectusCharacter,
  DirectusDesktopRelease,
  DirectusPaginatedResponse,
} from "../schemas";
import {
  mapPostListItem,
  mapPostDetail,
  mapTag,
  mapSiteSettings,
  mapCharacter,
  mapDesktopRelease,
} from "../mappers";
import { Errors } from "../errors";
import type {
  PostListItem,
  PostDetail,
  Tag,
  SiteSettings,
  Character,
  DesktopRelease,
} from "@asahome/shared-types";

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

const POST_FIELDS =
  "id,status,title,slug,summary,cover, published_at,created_at,updated_at,tags.id,tags.name,tags.slug,tags.description";
const POST_DETAIL_FIELDS =
  POST_FIELDS + ",content_markdown,seo_title,seo_description";

export async function getPostList(params: {
  page?: number;
  pageSize?: number;
  tagSlug?: string;
}): Promise<{ items: PostListItem[]; total: number; page: number; pageSize: number }> {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;

  let filter = "[status][_eq]=published";
  if (params.tagSlug) {
    filter += `&filter[tags][slug][_eq]=${encodeURIComponent(params.tagSlug)}`;
  }

  const path = `/items/posts?fields=${POST_FIELDS}&filter${filter}&sort=-published_at&page=${page}&limit=${pageSize}`;

  try {
    const res = await directusFetch<DirectusPaginatedResponse<DirectusPostItem>>(path);
    return {
      items: (res.data ?? []).map(mapPostListItem),
      total: res.meta?.total_count ?? 0,
      page,
      pageSize,
    };
  } catch (e) {
    if (e instanceof DirectusError && e.status === 403) {
      throw Errors.unauthorized();
    }
    throw Errors.cmsUnavailable(e instanceof Error ? e.message : "Unknown");
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const path = `/items/posts?fields=${POST_DETAIL_FIELDS}&filter[slug][_eq]=${encodeURIComponent(slug)}&filter[status][_eq]=published&limit=1`;

  try {
    const res = await directusFetch<DirectusPaginatedResponse<DirectusPostDetail>>(path);
    if (!res.data || res.data.length === 0) return null;

    const post = res.data[0];
    // TODO: fetch prev/next posts in a real implementation
    return mapPostDetail(post, null, null);
  } catch (e) {
    if (e instanceof DirectusError && e.status === 404) return null;
    throw Errors.cmsUnavailable(e instanceof Error ? e.message : "Unknown");
  }
}

// ---------------------------------------------------------------------------
// Tags
// ---------------------------------------------------------------------------

export async function getTags(): Promise<Tag[]> {
  const path = "/items/tags?fields=id,name,slug,description&sort=name";

  try {
    const res = await directusFetch<DirectusPaginatedResponse<DirectusTag>>(path);
    return (res.data ?? []).map(mapTag);
  } catch (e) {
    throw Errors.cmsUnavailable(e instanceof Error ? e.message : "Unknown");
  }
}

// ---------------------------------------------------------------------------
// Site Settings (singleton)
// ---------------------------------------------------------------------------

let _siteSettingsCache: SiteSettings | null = null;
let _siteSettingsCacheTime = 0;
const CACHE_TTL_MS = 60_000; // 1 minute

export async function getSiteSettings(): Promise<SiteSettings> {
  const now = Date.now();
  if (_siteSettingsCache && now - _siteSettingsCacheTime < CACHE_TTL_MS) {
    return _siteSettingsCache;
  }

  const path = "/items/site_settings?limit=1";

  try {
    const res = await directusFetch<DirectusPaginatedResponse<DirectusSiteSettings>>(path);
    if (!res.data || res.data.length === 0) {
      throw Errors.notFound("site_settings", "singleton");
    }
    _siteSettingsCache = mapSiteSettings(res.data[0]);
    _siteSettingsCacheTime = now;
    return _siteSettingsCache;
  } catch (e) {
    if (e instanceof DirectusError && e.status === 404) {
      throw Errors.notFound("site_settings", "singleton");
    }
    throw Errors.cmsUnavailable(e instanceof Error ? e.message : "Unknown");
  }
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

const CHARACTER_FIELDS =
  "id,slug,name_zh,name_ja,game_title,description,display_order,status,default_portrait,copyright_notice";

export async function getCharacters(): Promise<Character[]> {
  const path = `/items/characters?fields=${CHARACTER_FIELDS}&sort=display_order`;

  try {
    const res = await directusFetch<DirectusPaginatedResponse<DirectusCharacter>>(path);
    return (res.data ?? []).map(mapCharacter);
  } catch (e) {
    throw Errors.cmsUnavailable(e instanceof Error ? e.message : "Unknown");
  }
}

export async function getCharacterBySlug(slug: string): Promise<Character | null> {
  const path = `/items/characters?fields=${CHARACTER_FIELDS}&filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`;

  try {
    const res = await directusFetch<DirectusPaginatedResponse<DirectusCharacter>>(path);
    if (!res.data || res.data.length === 0) return null;
    return mapCharacter(res.data[0]);
  } catch (e) {
    if (e instanceof DirectusError && e.status === 404) return null;
    throw Errors.cmsUnavailable(e instanceof Error ? e.message : "Unknown");
  }
}

// ---------------------------------------------------------------------------
// Desktop Releases (Phase 1: schema only, no real data expected)
// ---------------------------------------------------------------------------

const RELEASE_FIELDS =
  "version,channel,platform,arch,download_file,download_url,sha256,release_notes,published_at,minimum_os_version";

export async function getDesktopReleases(params?: {
  platform?: string;
  channel?: string;
}): Promise<DesktopRelease[]> {
  let filter = "[status][_eq]=published";
  if (params?.platform) {
    filter += `&filter[platform][_eq]=${encodeURIComponent(params.platform)}`;
  }
  if (params?.channel) {
    filter += `&filter[channel][_eq]=${encodeURIComponent(params.channel)}`;
  }

  const path = `/items/desktop_releases?fields=${RELEASE_FIELDS}&filter${filter}&sort=-published_at`;

  try {
    const res = await directusFetch<DirectusPaginatedResponse<DirectusDesktopRelease>>(path);
    return (res.data ?? []).map(mapDesktopRelease);
  } catch (e) {
    throw Errors.cmsUnavailable(e instanceof Error ? e.message : "Unknown");
  }
}
