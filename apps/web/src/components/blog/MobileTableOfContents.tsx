// =============================================================================
// MobileTableOfContents — Collapsible TOC for narrow viewports
// =============================================================================

"use client";

import { useState, useCallback } from "react";
import type { TocEntry } from "@/lib/markdown";

export interface MobileTableOfContentsProps {
  items: TocEntry[];
}

export function MobileTableOfContents({ items }: MobileTableOfContentsProps) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  if (items.length === 0) return null;

  return (
    <div className="lg:hidden mb-8">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors"
        aria-expanded={open}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        目录
      </button>

      {open && (
        <nav aria-label="文章目录" className="mt-3 ml-1">
          <ul className="space-y-1 border-l-2 border-gray-200 pl-3">
            {items.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: item.level === 3 ? "0.75rem" : "0" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={[
                    "block text-sm leading-relaxed py-0.5 hover:text-brand-600 transition-colors",
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
      )}
    </div>
  );
}
