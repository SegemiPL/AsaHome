import type { Metadata } from "next";
import { petProjectInfo } from "@/data";

export const metadata: Metadata = {
  title: "下载",
  description: "桌面桌宠客户端下载",
};

export default function DownloadsPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">下载</h1>

        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed mb-4">
            桌宠客户端通过 GitHub Releases 发布。请前往以下页面下载对应平台版本：
          </p>

          <a
            href={`${petProjectInfo.githubRepo}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors text-sm"
          >
            GitHub Releases
          </a>
        </section>

        <section className="space-y-4 text-gray-500">
          <p>支持以下平台：</p>
          <ul className="list-disc pl-6 space-y-2">
            {petProjectInfo.platforms.map((p) => (
              <li key={p.downloadLabel}>{p.downloadLabel}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-400 mt-6">
            每个发布包提供 SHA-256 校验和，支持自动更新签名验证。
          </p>
        </section>

        <div className="mt-8">
          <a
            href={`${petProjectInfo.githubRepo}/releases/latest`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 text-sm hover:underline"
          >
            查看最新版本 →
          </a>
        </div>
      </div>
    </div>
  );
}
