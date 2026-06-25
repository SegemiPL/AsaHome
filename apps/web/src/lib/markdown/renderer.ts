// =============================================================================
// Markdown Renderer (Phase 1 stub)
// =============================================================================
// Phase 1 provides a basic safe Markdown → HTML renderer.
// It MUST:
//   - Whitelist allowed AST nodes (no raw HTML, no script, no iframe)
//   - Validate URL protocols (http/https only)
//   - Generate a table of contents
// Future: replace with a more full-featured renderer (code highlighting, etc.)
// =============================================================================

export interface TocEntry {
  level: number;
  text: string;
  slug: string;
}

export interface RenderedMarkdown {
  html: string;
  toc: TocEntry[];
}

/**
 * Render Markdown to safe HTML.
 * Phase 1 basic implementation — to be replaced with a proper
 * AST-based renderer with whitelist validation.
 */
export function renderMarkdown(markdown: string): RenderedMarkdown {
  // Phase 1 placeholder — basic rendering
  // In production, this will use a library like unified/remark/rehype
  // with strict whitelist and URL protocol validation.
  const html = escapeAndLinkify(markdown);
  const toc = extractToc(markdown);

  return { html, toc };
}

/**
 * Phase 1 placeholder: naive newline-to-paragraph conversion with link detection.
 * WILL BE REPLACED with proper AST-based rendering before production.
 */
function escapeAndLinkify(text: string): string {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs
    .map((p) => {
      // Escape HTML entities
      const escaped = p
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

      // Detect headings
      if (/^#{1,6}\s/.test(escaped)) {
        const match = escaped.match(/^(#{1,6})\s+(.+)/);
        if (match) {
          const level = match[1].length;
          const content = match[2];
          const slug = slugify(extractHeadingText(match[2]));
          return `<h${level} id="${slug}">${content}</h${level}>`;
        }
      }

      return `<p>${escaped}</p>`;
    })
    .join("\n");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w一-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractHeadingText(heading: string): string {
  // Remove any HTML entities for TOC purposes
  return heading.replace(/&[a-z]+;/g, "");
}

function extractToc(text: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(text)) !== null) {
    const text = extractHeadingText(match[2]);
    entries.push({
      level: match[1].length,
      text,
      slug: slugify(text),
    });
  }

  return entries;
}
