import type { MetadataRoute } from "next";

/**
 * Phase 1: static sitemap with known pages.
 * Will be made dynamic when Directus data is available.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticPages = [
    { url: "/", changeFrequency: "weekly" as const, priority: 1 },
    { url: "/blog", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/characters", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
    { url: "/tts", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "/pet", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "/downloads", changeFrequency: "monthly" as const, priority: 0.5 },
    { url: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { url: "/copyright", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return staticPages.map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
