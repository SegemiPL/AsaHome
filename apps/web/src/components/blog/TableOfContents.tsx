// =============================================================================
// TableOfContents — Desktop sticky sidebar
// =============================================================================

import type { TocEntry } from "@/lib/markdown";

export interface TableOfContentsProps {
  items: TocEntry[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="文章目录" className="sticky top-20">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        目录
      </h2>
      <ul className="space-y-1.5 border-l-2 border-gray-200 pl-3">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 3 ? "1rem" : "0" }}
          >
            <a
              href={`#${item.id}`}
              className={[
                "block text-sm leading-relaxed transition-colors py-0.5",
                "hover:text-brand-600",
                item.level === 3
                  ? "text-gray-500 text-[0.8125rem]"
                  : "text-gray-700",
              ].join(" ")}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
