// =============================================================================
// MarkdownArticle — Unified Markdown renderer for AsaHome Blog
// =============================================================================
// All blog posts pass through this single component.
// Rendering chain:
//   Markdown string → react-markdown → remark-gfm →
//   rehype-slug → rehype-autolink-headings → rehype-highlight
// =============================================================================

import type { ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

/* No shared anchor HTML needed — we use a simple text "#" anchor handled by CSS. */

// ---------------------------------------------------------------------------
// Custom component definitions
// ---------------------------------------------------------------------------

/** Link — external links get security attributes, internal links stay normal. */
function ArticleLink({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  const isExternal = href != null && (href.startsWith("http://") || href.startsWith("https://"));
  const isInternal = href != null && href.startsWith("/");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (isInternal) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

/** Image — lazy-loaded, responsive, with rounded corners and shadow. */
function ArticleImage({ alt, ...props }: ComponentPropsWithoutRef<"img">) {
  return (
    <img
      {...props}
      alt={alt ?? ""}
      loading="lazy"
      className="rounded-lg shadow-md max-w-full h-auto my-6"
    />
  );
}

/** Table — wrapped in a horizontal scroll container. */
function ArticleTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
      <table className="min-w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

/** Block-level code (inside <pre>) — styled by rehype-highlight. */
function ArticlePre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className="overflow-x-auto rounded-xl my-6 p-5 text-sm leading-relaxed hljs"
      {...props}
    >
      {children}
    </pre>
  );
}

/** Inline code — subtle background, compact padding. */
function ArticleInlineCode({ children, ...props }: ComponentPropsWithoutRef<"code">) {
  // rehype-highlight adds className to block-level <code>
  const isBlock = (props as Record<string, unknown>).className != null;

  if (isBlock) {
    return <code {...props}>{children}</code>;
  }

  return (
    <code
      className="bg-gray-100 text-brand-700 text-[0.875em] px-1.5 py-0.5 rounded font-mono border border-gray-200"
      {...props}
    >
      {children}
    </code>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface MarkdownArticleProps {
  source: string;
}

/**
 * Render Markdown source into styled React elements.
 *
 * Uses:
 * - remark-gfm for tables, strikethrough, task lists, footnotes
 * - rehype-slug for heading IDs
 * - rehype-autolink-headings for anchor links on headings
 * - rehype-highlight + highlight.js for build-time syntax highlighting
 */
export function MarkdownArticle({ source }: MarkdownArticleProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            properties: {
              ariaHidden: "true" as const,
              tabIndex: -1,
              className: "heading-anchor",
            },
            content: { type: "text" as const, value: " #" },
          },
        ],
        rehypeHighlight,
      ]}
      components={{
        a: ArticleLink,
        img: ArticleImage,
        table: ArticleTable,
        pre: ArticlePre,
        code: ArticleInlineCode,
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
