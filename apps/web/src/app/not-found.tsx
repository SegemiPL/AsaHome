import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="section">
      <div className="section-inner text-center">
        <h1 className="text-6xl font-bold text-brand-300 mb-4">404</h1>
        <p className="text-lg text-gray-500 mb-8">页面未找到</p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors text-sm"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
