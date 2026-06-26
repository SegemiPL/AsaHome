import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "技术研究与开发日志",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-gray-500">暂无文章。</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-6 last:border-0">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(post.date).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  {post.summary}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
