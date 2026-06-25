import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/posts";
import { siteConfig } from "@/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.siteUrl;

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

  const postPages = getAllPostSlugs().map((slug) => ({
    url: `/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages].map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
