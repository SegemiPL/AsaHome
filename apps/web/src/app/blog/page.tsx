import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "站长 Blog — 杂谈、逆向工程记录与开发日志",
};

// Phase 1: static placeholder. Will fetch from Directus in P1.4.
export default function BlogListPage() {
  return (
    <div className="section">
      <div className="section-inner">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Blog</h1>

        {/* Placeholder article cards */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <article key={i} className="card p-6 animate-fade-in">
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-50 rounded w-full mb-2" />
              <div className="h-3 bg-gray-50 rounded w-2/3" />
              <div className="flex items-center gap-4 mt-4">
                <div className="h-3 bg-gray-50 rounded w-20" />
                <div className="h-3 bg-gray-50 rounded w-16" />
              </div>
            </article>
          ))}
        </div>

        <p className="text-gray-400 text-sm mt-8 text-center">
          Blog 内容将随 Directus CMS 部署后动态加载
        </p>
      </div>
    </div>
  );
}
