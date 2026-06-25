// =============================================================================
// Directus Mappers — Transform raw Directus responses into domain models.
// =============================================================================
// Every mapper converts a Directus-raw shape (from ./schemas/) into a
// domain type (from @asahome/shared-types). This isolates the UI from
// Directus's response format and makes it possible to swap CMS backends.
// =============================================================================

import type {
  PostListItem,
  PostDetail,
  Tag,
  SiteSettings,
  Character,
  DesktopRelease,
} from "@asahome/shared-types";

import type {
  DirectusPostItem,
  DirectusPostDetail,
  DirectusTag,
  DirectusSiteSettings,
  DirectusCharacter,
  DirectusDesktopRelease,
  DirectusFile,
} from "../schemas";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fileToUrl(file: string | DirectusFile | null | undefined): string | null {
  if (!file) return null;
  if (typeof file === "string") return file;
  // Directus file object — construct URL from the file id
  return `/assets/${file.id}`;
}

// ---------------------------------------------------------------------------
// Tags
// ---------------------------------------------------------------------------

export function mapTag(raw: DirectusTag): Tag {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description ?? null,
  };
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export function mapPostListItem(raw: DirectusPostItem): PostListItem {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    summary: raw.summary,
    coverUrl: fileToUrl(raw.cover),
    publishedAt: raw.published_at,
    tags: Array.isArray(raw.tags)
      ? raw.tags.map((t: DirectusTag | number) =>
          typeof t === "number" ? { id: String(t), name: "", slug: "", description: null } : mapTag(t)
        )
      : [],
  };
}

export function mapPostDetail(
  raw: DirectusPostDetail,
  prevPost: PostListItem | null,
  nextPost: PostListItem | null
): PostDetail {
  return {
    ...mapPostListItem(raw),
    contentMarkdown: raw.content_markdown,
    seoTitle: raw.seo_title ?? null,
    seoDescription: raw.seo_description ?? null,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    prevPost: prevPost ? { title: prevPost.title, slug: prevPost.slug } : null,
    nextPost: nextPost ? { title: nextPost.title, slug: nextPost.slug } : null,
  };
}

// ---------------------------------------------------------------------------
// Site Settings
// ---------------------------------------------------------------------------

export function mapSiteSettings(raw: DirectusSiteSettings): SiteSettings {
  return {
    siteTitle: raw.site_title,
    subtitle: raw.subtitle,
    homeIntro: raw.home_intro,
    footerText: raw.footer_text,
    unofficialNotice: raw.unofficial_notice,
    defaultSeoTitle: raw.default_seo_title,
    defaultSeoDescription: raw.default_seo_description,
    socialLinks: raw.social_links ?? {},
    homeBackgroundAsset: fileToUrl(raw.home_background_asset),
    ttsEnabled: raw.tts_enabled,
    petEnabled: raw.pet_enabled,
  };
}

// ---------------------------------------------------------------------------
// Characters
// ---------------------------------------------------------------------------

export function mapCharacter(raw: DirectusCharacter): Character {
  return {
    id: raw.id,
    slug: raw.slug,
    nameZh: raw.name_zh,
    nameJa: raw.name_ja,
    gameTitle: raw.game_title,
    description: raw.description,
    displayOrder: raw.display_order,
    status: raw.status,
    defaultPortrait: fileToUrl(raw.default_portrait),
    copyrightNotice: raw.copyright_notice,
  };
}

// ---------------------------------------------------------------------------
// Desktop Releases
// ---------------------------------------------------------------------------

export function mapDesktopRelease(raw: DirectusDesktopRelease): DesktopRelease {
  return {
    version: raw.version,
    channel: raw.channel as DesktopRelease["channel"],
    platform: raw.platform as DesktopRelease["platform"],
    arch: raw.arch as DesktopRelease["arch"],
    downloadUrl: raw.download_url ?? fileToUrl(raw.download_file) ?? "",
    sha256: raw.sha256,
    releaseNotes: raw.release_notes,
    publishedAt: raw.published_at,
    minimumOsVersion: raw.minimum_os_version ?? null,
  };
}
