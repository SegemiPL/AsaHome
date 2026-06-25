import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "角色 / 作品",
  description: "ASa Project 相关角色与作品介绍",
};

export default function CharactersPage() {
  return (
    <div className="section">
      <div className="section-inner">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">角色 / 作品</h1>
        <p className="text-gray-500 mb-8 max-w-prose">
          ASa Project 相关角色与作品介绍。
        </p>

        {/* Placeholder character cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-6 animate-fade-in">
              <div className="aspect-[3/4] bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-300 text-5xl">?</span>
              </div>
              <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-50 rounded w-full" />
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-sm mt-8 text-center">
          角色数据将随 Directus CMS 部署后动态加载
        </p>
      </div>
    </div>
  );
}
