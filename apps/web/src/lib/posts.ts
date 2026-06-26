// =============================================================================
// AsaHome Blog — Post reader (static Markdown)
// =============================================================================
// Reads content/posts/*.md at build time.
// Uses gray-matter for frontmatter parsing.
// Markdown → React rendering is handled by <MarkdownArticle /> at the page level.
// =============================================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { extractToc } from "./markdown";
import type { TocEntry } from "./markdown";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PostFrontmatter {
  title: string;
  slug: string;
  date: string;
  summary: string;
  tags: string[];
  cover: string | null;
  draft: boolean;
}

export interface PostData extends PostFrontmatter {
  /** Raw Markdown body — rendered by <MarkdownArticle> at the page level. */
  content: string;
  /** Table of contents extracted from h2/h3 headings. */
  toc: TocEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface PostListItem {
  title: string;
  slug: string;
  date: string;
  summary: string;
  cover: string | null;
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

// ---------------------------------------------------------------------------
// Reader
// ---------------------------------------------------------------------------

function assertString(value: unknown, field: string, filePath: string): string {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  throw new Error(`${path.basename(filePath)}: frontmatter.${field} must be a non-empty string`);
}

function assertDate(value: string, filePath: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(new Date(value).getTime())) {
    return value;
  }

  throw new Error(`${path.basename(filePath)}: frontmatter.date must use YYYY-MM-DD`);
}

function assertSlug(value: string, filePath: string): string {
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    return value;
  }

  throw new Error(
    `${path.basename(filePath)}: frontmatter.slug must use lowercase letters, numbers, and hyphens`,
  );
}

function normalizeTags(value: unknown, filePath: string): string[] {
  if (value == null) return [];

  if (Array.isArray(value) && value.every((tag) => typeof tag === "string")) {
    return value;
  }

  throw new Error(`${path.basename(filePath)}: frontmatter.tags must be a string array`);
}

function normalizeCover(value: unknown, filePath: string): string | null {
  if (value == null) return null;

  if (typeof value === "string") {
    return value;
  }

  throw new Error(`${path.basename(filePath)}: frontmatter.cover must be a string or null`);
}

function parsePostFile(filePath: string): PostData | null {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (data.draft === true) {
    return null;
  }

  const title = assertString(data.title, "title", filePath);
  const slug = assertSlug(assertString(data.slug, "slug", filePath), filePath);
  const date = assertDate(assertString(data.date, "date", filePath), filePath);
  const summary = assertString(data.summary, "summary", filePath);
  const stat = fs.statSync(filePath);

  return {
    title,
    slug,
    date,
    summary,
    tags: normalizeTags(data.tags, filePath),
    cover: normalizeCover(data.cover, filePath),
    draft: false,
    content,
    toc: extractToc(content),
    createdAt: stat.birthtime.toISOString(),
    updatedAt: stat.mtime.toISOString(),
  };
}

function readAllPublishedPosts(): PostData[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parsePostFile(path.join(POSTS_DIR, f)))
    .filter((p): p is PostData => p !== null);

  const seenSlugs = new Set<string>();
  for (const post of posts) {
    if (seenSlugs.has(post.slug)) {
      throw new Error(`Duplicate blog slug: ${post.slug}`);
    }
    seenSlugs.add(post.slug);
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Get all published posts, sorted by date descending. */
export function getAllPosts(): PostListItem[] {
  const posts = readAllPublishedPosts();

  return posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    summary: p.summary,
    cover: p.cover,
  }));
}

/** Get a single published post by slug. */
export function getPostBySlug(slug: string): PostData | null {
  return readAllPublishedPosts().find((post) => post.slug === slug) ?? null;
}

/** Get all post slugs — used by generateStaticParams. */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
