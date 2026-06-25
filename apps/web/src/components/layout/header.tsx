import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-content mx-auto px-6 h-14 flex items-center justify-between" aria-label="主导航">
        <Link href="/" className="text-lg font-bold text-brand-700">
          AsaHome
        </Link>

        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link href="/" className="text-gray-600 hover:text-brand-600 transition-colors">
              首页
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-gray-600 hover:text-brand-600 transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/characters" className="text-gray-600 hover:text-brand-600 transition-colors">
              角色
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-600 hover:text-brand-600 transition-colors">
              关于
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
