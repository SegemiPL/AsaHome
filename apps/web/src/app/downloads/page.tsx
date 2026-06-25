import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "下载",
  description: "桌面桌宠客户端下载（即将上线）",
};

/**
 * Downloads placeholder page — Phase 1.
 * Will display DesktopRelease data from Directus in Phase 3.
 */
export default function DownloadsPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">下载</h1>

        <div className="placeholder-banner mb-8">
          🚧 桌宠客户端正在开发中，下载将在后续版本开放。
        </div>

        <div className="space-y-4 text-gray-500">
          <p>计划提供以下平台的安装包：</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Windows（x86_64）</li>
            <li>macOS（Apple Silicon / Intel）</li>
            <li>Linux（实验性，不作为发布阻断项）</li>
          </ul>
          <p className="mt-6">
            每个发布包将提供 SHA-256 校验和，支持自动更新签名验证。
          </p>
        </div>
      </div>
    </div>
  );
}
