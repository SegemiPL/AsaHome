import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";

describe("posts", () => {
  it("should return at least one published post", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(1);
  });

  it("should return posts sorted by date descending", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i].date).getTime(),
      );
    }
  });

  it("should find the hello-asahome post by slug", () => {
    const post = getPostBySlug("hello-asahome");
    expect(post).not.toBeNull();
    expect(post!.title).toBe("AsaHome的动机");
    // Content should be raw markdown string, rendered by MarkdownArticle component
    expect(post!.content).toContain("AsaHome");
  });

  it("should have TOC entries for hello-asahome", () => {
    const post = getPostBySlug("hello-asahome");
    expect(post).not.toBeNull();
    expect(post!.toc.length).toBeGreaterThanOrEqual(1);
    // Each TOC entry should have id, text, level
    for (const entry of post!.toc) {
      expect(entry.id).toBeTruthy();
      expect(entry.text).toBeTruthy();
      expect([2, 3]).toContain(entry.level);
    }
  });

  it("should return null for non-existent slug", () => {
    const post = getPostBySlug("nonexistent-post");
    expect(post).toBeNull();
  });

  it("should return all post slugs", () => {
    const slugs = getAllPostSlugs();
    expect(slugs).toContain("hello-asahome");
  });

  it("should render markdown to non-empty escaped HTML", () => {
    const rendered = renderMarkdown("## Heading\n\n<script>alert('x')</script>");

    expect(rendered.html).toContain('<h2 id="heading">Heading</h2>');
    expect(rendered.html).toContain("&lt;script&gt;");
    expect(rendered.toc).toEqual([{ id: "heading", text: "Heading", level: 2 }]);
  });

  it("should not include draft posts in the list", () => {
    const posts = getAllPosts();
    posts.forEach((post) => {
      const detail = getPostBySlug(post.slug);
      expect(detail).not.toBeNull();
    });
  });
});
