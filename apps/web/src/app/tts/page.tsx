import type { Metadata } from "next";
import { ttsProjectInfo, ttsSamples } from "@/data";

export const metadata: Metadata = {
  title: "TTS 语音合成",
  description: "AI 角色语音合成项目介绍与示例音频",
};

export default function TtsPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">TTS 语音合成</h1>

        {/* Project Info */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">项目介绍</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {ttsProjectInfo.description}
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>
              <strong>技术栈：</strong>
              {ttsProjectInfo.techStack.join(" / ")}
            </p>
            <p>
              <strong>GitHub：</strong>
              <a
                href={ttsProjectInfo.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline ml-1"
              >
                {ttsProjectInfo.githubRepo}
              </a>
            </p>
            <p>
              <strong>本地部署：</strong>
              <a
                href={ttsProjectInfo.localDeployDoc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline ml-1"
              >
                查看文档
              </a>
            </p>
          </div>
        </section>

        {/* Audio Samples */}
        {ttsSamples.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">语音示例</h2>
            <div className="space-y-6">
              {ttsSamples.map((sample) => (
                <div key={sample.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      {sample.characterName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {sample.modelName}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    中文：{sample.textZh}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    日文：{sample.textJa}
                  </p>
                  <audio controls className="w-full" preload="none">
                    <source src={sample.audioPath} type="audio/wav" />
                    您的浏览器不支持音频播放。
                  </audio>
                </div>
              ))}
            </div>
          </section>
        )}

        {ttsSamples.length === 0 && (
          <section className="mb-10">
            <div className="placeholder-banner">
              🚧 语音示例正在准备中，将在后续更新。
            </div>
          </section>
        )}

        {/* Notice */}
        <section>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <strong>AI 生成声明：</strong> {ttsProjectInfo.aiGeneratedNotice}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            在线 TTS 推理服务暂不提供。如需本地部署 TTS 模型，请前往{" "}
            <a
              href={ttsProjectInfo.githubRepo}
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
