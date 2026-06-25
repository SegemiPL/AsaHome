import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug, getAllPostSlugs, getAllTags } from "@/lib/posts";

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
    expect(post!.title).toBe("AsaHome 项目启动");
    expect(post!.contentHtml).toContain("AsaHome");
  });

  it("should return null for non-existent slug", () => {
    const post = getPostBySlug("nonexistent-post");
    expect(post).toBeNull();
  });

  it("should return all post slugs", () => {
    const slugs = getAllPostSlugs();
    expect(slugs).toContain("hello-asahome");
  });

  it("should return tags from posts", () => {
    const tags = getAllTags();
    expect(tags.length).toBeGreaterThanOrEqual(1);
  });

  it("should not include draft posts in the list", () => {
    const posts = getAllPosts();
    posts.forEach((post) => {
      // All posts returned should be published (draft: false)
      // This is verified indirectly since getPostBySlug returns null for drafts
      const detail = getPostBySlug(post.slug);
      expect(detail).not.toBeNull();
    });
  });
});
