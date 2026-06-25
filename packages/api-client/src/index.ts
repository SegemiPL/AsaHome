// =============================================================================
// AsaHome API Client (Phase 1 stub)
// =============================================================================
// Shared API client for web and desktop. Phase 1 only establishes the module
// structure and exports placeholder functions. Real implementation comes as
// each API endpoint is built.
// =============================================================================

export {
  // Blog
  getPostList,
  getPostBySlug,
  getTags,
  // Characters
  getCharacters,
  getCharacterBySlug,
  // Site
  getSiteSettings,
  // Desktop releases
  getDesktopReleases,
  // TTS (Phase 2 stub)
  createTtsJob,
  getTtsJob,
  getTtsModels,
} from "./client";

export { ApiClientError, isApiClientError } from "./errors";

export type { ApiClientConfig } from "./types";
