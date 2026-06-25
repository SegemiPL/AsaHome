import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-surface-muted mt-16">
      <div className="max-w-content mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AsaHome. 本站为非官方、完全非商业化的个人技术展示站。</p>
          <nav className="flex items-center gap-4" aria-label="页脚导航">
            <Link href="/privacy" className="hover:text-brand-600 transition-colors">
              隐私说明
            </Link>
            <Link href="/copyright" className="hover:text-brand-600 transition-colors">
              版权声明
            </Link>
            <Link href="/about" className="hover:text-brand-600 transition-colors">
              关于本站
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
