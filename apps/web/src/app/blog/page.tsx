import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "技术研究与开发日志",
};

export default function BlogListPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

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
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  {post.summary}
                </p>
              </article>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">标签</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
