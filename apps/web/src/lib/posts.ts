// =============================================================================
// AsaHome Blog — Post reader (static Markdown)
// =============================================================================
// Reads content/posts/*.md at build time.
// Uses gray-matter for frontmatter parsing.
// =============================================================================

import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
  contentHtml: string;
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
// Simple Markdown → HTML conversion (no external deps beyond gray-matter)
// ---------------------------------------------------------------------------

function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Headings
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Images
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" loading="lazy" />'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists (simple — lines starting with - )
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

  // Paragraphs: wrap remaining non-tag lines in <p>
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}

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
      contentHtml: markdownToHtml(content),
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
