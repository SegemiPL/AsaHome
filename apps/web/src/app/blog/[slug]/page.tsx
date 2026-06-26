import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/posts";
import { MarkdownArticle } from "@/components/blog/MarkdownArticle";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { MobileTableOfContents } from "@/components/blog/MobileTableOfContents";

// ---------------------------------------------------------------------------
// Static path generation
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "文章未找到" };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find prev/next for navigation
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="section">
      <div className="max-w-content mx-auto">
        {/* ----------------------------------------------------------
            Two-column layout: main article + sticky TOC sidebar
            ---------------------------------------------------------- */}
        <div className="flex gap-16 lg:gap-20 xl:gap-24">
          {/* Main column — capped at 720px for comfortable CJK reading */}
          <div className="min-w-0 flex-1 max-w-[720px]">
            <article>
              {/* Header */}
              <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {post.title}
                </h1>
                <p className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </header>

              {/* Inline TOC (mobile only) */}
              <MobileTableOfContents items={post.toc} />

              {/* Article body */}
              <div className="article-content mb-12">
                <MarkdownArticle source={post.content} />
              </div>
            </article>

            {/* Post navigation */}
            <nav className="pt-6 border-t border-gray-200 flex justify-between items-start gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="text-sm text-brand-600 hover:underline max-w-[45%]"
                >
                  ← {prevPost.title}
                </Link>
              ) : (
                <span />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="text-sm text-brand-600 hover:underline max-w-[45%] text-right"
                >
                  {nextPost.title} →
                </Link>
              ) : (
                <span />
              )}
            </nav>

            <div className="mt-6">
              <Link href="/blog" className="text-sm text-brand-600 hover:underline">
                ← 返回 Blog 列表
              </Link>
            </div>
          </div>

          {/* Sidebar — desktop TOC */}
          <aside className="hidden lg:block w-[210px] xl:w-[240px] flex-shrink-0">
            <TableOfContents items={post.toc} />
          </aside>
        </div>
      </div>
    </div>
  );
}
