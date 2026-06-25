import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/data";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="section">
        <div className="section-inner text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-700 mb-4">
            AsaHome
          </h1>
          <p className="text-lg text-gray-500 max-w-prose mx-auto mb-8">
            {siteConfig.subtitle}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/blog" className="px-6 py-2.5 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors text-sm">
              阅读 Blog
            </Link>
            <Link href="/characters" className="px-6 py-2.5 border border-brand-300 text-brand-700 rounded-full hover:bg-brand-50 transition-colors text-sm">
              角色一览
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blog */}
      <section className="section bg-surface-muted">
        <div className="section-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">最近更新</h2>
          {recentPosts.length > 0 ? (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 pb-4 last:border-0">
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(post.date).toLocaleDateString("zh-CN")}
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">{post.summary}</p>
                  </Link>
                </article>
              ))}
              <Link href="/blog" className="text-brand-600 text-sm hover:underline mt-4 inline-block">
                查看全部 →
              </Link>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">暂无文章。</p>
          )}
        </div>
      </section>

      {/* Character Entry */}
      <section className="section">
        <div className="section-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">角色 / 作品</h2>
          <p className="text-gray-500 text-sm mb-4">
            介绍 ASa Project 相关角色与作品信息。
          </p>
          <Link href="/characters" className="text-brand-600 text-sm hover:underline">
            了解更多 →
          </Link>
        </div>
      </section>

      {/* TTS Preview */}
      <section className="section bg-surface-muted">
        <div className="section-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">TTS 语音合成</h2>
          <p className="text-gray-500 mb-4 text-sm max-w-prose">
            基于 AI 的角色语音合成项目。展示预生成语音示例，提供独立 GitHub 仓库供本地部署。
          </p>
          <Link href="/tts" className="text-brand-600 text-sm hover:underline">
            了解更多 →
          </Link>
        </div>
      </section>

      {/* Desktop Pet Preview */}
      <section className="section">
        <div className="section-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">本地桌宠</h2>
          <p className="text-gray-500 mb-4 text-sm max-w-prose">
            跨平台桌面桌宠客户端（Tauri 2）。提供角色立绘切换、动画效果和系统托盘。通过 GitHub Releases 获取安装包。
          </p>
          <Link href="/pet" className="text-brand-600 text-sm hover:underline">
            了解更多 →
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section bg-surface-muted">
        <div className="section-inner">
          <div className="placeholder-banner">
            <strong>非官方声明：</strong> {siteConfig.unofficialNotice}
          </div>
        </div>
      </section>
    </div>
  );
}
