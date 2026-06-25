import Link from "next/link";

// Phase 1: static placeholder. Will be made dynamic with Directus data in P1.4/P1.5.
export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="section">
        <div className="section-inner text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-700 mb-4">
            AsaHome
          </h1>
          <p className="text-lg text-gray-500 max-w-prose mx-auto mb-8">
            ASa Project Home — Blog · 角色 · TTS · 桌宠
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
          <p className="text-gray-500 text-sm">
            Blog 内容将由 Directus CMS 动态加载。当前为骨架页面。
          </p>
        </div>
      </section>

      {/* Character Entry */}
      <section className="section">
        <div className="section-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">角色 / 作品</h2>
          <p className="text-gray-500 text-sm">
            角色信息将由 Directus CMS 动态加载。当前为骨架页面。
          </p>
        </div>
      </section>

      {/* TTS Preview */}
      <section className="section bg-surface-muted">
        <div className="section-inner">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">TTS 语音合成</h2>
          <p className="text-gray-500 mb-4 text-sm max-w-prose">
            计划提供中文输入到日文角色语音的在线 TTS 服务。基于独立 GPU 推理，异步任务队列。
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
            计划提供 Windows 和 macOS 本地桌宠客户端，支持角色立绘切换、系统托盘和自动更新。
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
            <strong>非官方声明：</strong> 本站为非官方、完全非商业化的个人技术展示项目，与 ASa Project 及权利方无隶属或授权关系。所有角色与作品权利归原权利方所有。
          </div>
        </div>
      </section>
    </div>
  );
}
