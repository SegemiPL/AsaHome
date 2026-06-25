import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug,
    description: `Blog 文章: ${slug}`,
  };
}

// Phase 1: static placeholder. Will fetch from Directus in P1.4.
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <article className="section">
      <div className="section-inner max-w-prose mx-auto">
        {/* Placeholder header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            文章：{slug}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>发布日期加载中…</span>
            <span>·</span>
            <span>标签加载中…</span>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="prose-container space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-gray-50 rounded" style={{ width: `${80 - i * 10}%` }} />
          ))}
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200 text-sm">
          <span className="text-gray-400">上一篇</span>
          <span className="text-gray-400">下一篇</span>
        </nav>

        <p className="text-gray-400 text-sm mt-8 text-center">
          Blog 详情将在 Directus CMS 集成后动态渲染
        </p>
      </div>
    </article>
  );
}
