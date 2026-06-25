"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="section">
      <div className="section-inner text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">出错了</h1>
        <p className="text-gray-500 mb-8">
          页面加载时发生了错误。请稍后重试。
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors text-sm"
        >
          重试
        </button>
      </div>
    </div>
  );
}
