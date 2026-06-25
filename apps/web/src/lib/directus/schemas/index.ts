// =============================================================================
// Directus Schemas — Raw API response shapes from Directus
// =============================================================================
// These types describe what Directus actually returns (including its
// relational / file wrapper shapes). They are ONLY used inside the data
// layer — NEVER leak to UI components. Mappers in ./mappers/ convert them
// to domain types from @asahome/shared-types.
// =============================================================================

export interface DirectusFile {
  id: string;
  filename_download: string;
  filename_disk?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  filesize?: number;
  type?: string;
}

export interface DirectusPostItem {
  id: string;
  status: string;
  title: string;
  slug: string;
  summary: string;
  cover: string | DirectusFile | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: DirectusTag[] | number[];
}

export interface DirectusPostDetail extends DirectusPostItem {
  content_markdown: string;
  seo_title: string | null;
  seo_description: string | null;
}

export interface DirectusTag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface DirectusSiteSettings {
  id: string;
  site_title: string;
  subtitle: string;
  home_intro: string;
  footer_text: string;
  unofficial_notice: string;
  default_seo_title: string;
  default_seo_description: string;
  social_links: Record<string, string> | null;
  home_background_asset: string | DirectusFile | null;
  tts_enabled: boolean;
  pet_enabled: boolean;
}

export interface DirectusCharacter {
  id: string;
  slug: string;
  name_zh: string;
  name_ja: string;
  game_title: string;
  description: string;
  display_order: number;
  status: string;
  default_portrait: string | DirectusFile | null;
  copyright_notice: string;
}

export interface DirectusDesktopRelease {
  id: string;
  version: string;
  channel: string;
  platform: string;
  arch: string;
  download_file: string | DirectusFile | null;
  download_url: string | null;
  sha256: string;
  release_notes: string;
  published_at: string;
  minimum_os_version: string | null;
}

export interface DirectusPaginatedResponse<T> {
  data: T[];
  meta?: {
    total_count?: number;
    filter_count?: number;
    page?: number;
  };
}
