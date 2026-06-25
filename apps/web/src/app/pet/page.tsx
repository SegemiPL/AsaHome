import type { Metadata } from "next";
import { petProjectInfo, petScreenshots, petDisclaimer } from "@/data";

export const metadata: Metadata = {
  title: "桌面桌宠",
  description: "跨平台桌面桌宠客户端（Tauri 2）— 功能展示与下载",
};

export default function PetPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">桌面桌宠</h1>

        {/* Project Info */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">项目介绍</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {petProjectInfo.description}
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">主要功能</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-4">
            {petProjectInfo.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div className="space-y-2 text-sm text-gray-500">
            <p>
              <strong>技术栈：</strong>
              {petProjectInfo.techStack.join(" / ")}
            </p>
            <p>
              <strong>GitHub：</strong>
              <a
                href={petProjectInfo.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline ml-1"
              >
                {petProjectInfo.githubRepo}
              </a>
            </p>
          </div>
        </section>

        {/* Screenshots */}
        {petScreenshots.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">截图展示</h2>
            <div className="space-y-6">
              {petScreenshots.map((shot) => (
                <figure key={shot.src} className="text-center">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="rounded-lg max-w-full h-auto mx-auto"
                    loading="lazy"
                  />
                  {shot.caption && (
                    <figcaption className="text-sm text-gray-500 mt-2">
                      {shot.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {petScreenshots.length === 0 && (
          <section className="mb-10">
            <div className="placeholder-banner">
              🚧 桌宠截图正在准备中，将在后续更新。
            </div>
          </section>
        )}

        {/* Downloads */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">下载</h2>
          <p className="text-gray-600 text-sm mb-4">
            桌宠客户端通过 GitHub Releases 发布。请前往以下页面下载对应平台版本：
          </p>
          <div className="space-y-3">
            <a
              href={`${petProjectInfo.githubRepo}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors text-sm"
            >
              GitHub Releases
            </a>
            <p className="text-xs text-gray-400 mt-2">
              支持平台：
              {petProjectInfo.platforms.map((p) => p.downloadLabel).join(" / ")}
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <strong>声明：</strong> {petDisclaimer}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            本地部署和安装文档请查看{" "}
            <a
              href={petProjectInfo.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:underline"
            >
              GitHub 仓库
            </a>
            。
          </p>
        </section>
      </div>
    </div>
  );
}
