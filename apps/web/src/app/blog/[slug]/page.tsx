import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/posts";

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
      <div className="section-inner max-w-prose mx-auto">
        <article>
          {/* Header */}
          <header className="mb-8">
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
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div
            className="prose prose-gray max-w-none
              prose-headings:text-gray-800
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline
              prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-img:rounded-lg
              prose-li:text-gray-600
              prose-hr:border-gray-200"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Navigation */}
          <nav className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-start gap-4">
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
        </article>

        <div className="mt-8">
          <Link href="/blog" className="text-sm text-brand-600 hover:underline">
            ← 返回 Blog 列表
          </Link>
        </div>
      </div>
    </div>
  );
}
