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
  tags: string[];
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

// ---------------------------------------------------------------------------
// Reader
// ---------------------------------------------------------------------------

function readPostFile(filePath: string): PostData | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const frontmatter = data as PostFrontmatter;

    if (frontmatter.draft) return null;

    const stat = fs.statSync(filePath);

    return {
      title: frontmatter.title,
      slug: frontmatter.slug,
      date: frontmatter.date,
      summary: frontmatter.summary,
      tags: frontmatter.tags ?? [],
      cover: frontmatter.cover ?? null,
      draft: frontmatter.draft ?? false,
      content,
      toc: extractToc(content),
      createdAt: stat.birthtime.toISOString(),
      updatedAt: stat.mtime.toISOString(),
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Get all published posts, sorted by date descending. */
export function getAllPosts(): PostListItem[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"));

  const posts = files
    .map((f) => readPostFile(path.join(POSTS_DIR, f)))
    .filter((p): p is PostData => p !== null)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    summary: p.summary,
    cover: p.cover,
    tags: p.tags,
  }));
}

/** Get a single published post by slug. */
export function getPostBySlug(slug: string): PostData | null {
  if (!fs.existsSync(POSTS_DIR)) return null;

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const post = readPostFile(path.join(POSTS_DIR, file));
    if (post && post.slug === slug) return post;
  }

  return null;
}

/** Get all unique tags across posts. */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

/** Get all post slugs — used by generateStaticParams. */
export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
