import type { Metadata } from "next";
import Link from "next/link";
import { characters } from "@/data";

export const metadata: Metadata = {
  title: "角色 / 作品",
  description: "ASa Project 相关角色与作品介绍",
};

export default function CharactersPage() {
  return (
    <div className="section">
      <div className="section-inner">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">角色 / 作品</h1>

        {characters.length === 0 ? (
          <div className="placeholder-banner">
            🚧 角色数据正在整理中，将在后续更新。
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters
              .sort((a, b) => a.displayOrder - b.displayOrder)
              .map((char) => (
                <Link
                  key={char.id}
                  href={`/characters/${char.slug}`}
                  className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      src={char.defaultPortrait}
                      alt={char.nameZh}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-semibold text-gray-800 group-hover:text-brand-600 transition-colors">
                      {char.nameZh}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">{char.nameJa}</p>
                    <p className="text-xs text-gray-400 mt-1">{char.gameTitle}</p>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
