import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TTS 语音合成",
  description: "中文输入到日文角色语音的在线 TTS 服务（开发中）",
};

/**
 * TTS placeholder page — Phase 1.
 *
 * Constraints per Section 7.4:
 * - Clearly marked "开发中"
 * - Explains planned capabilities
 * - No clickable generate button that does nothing
 * - No fake generated results
 * - No temporary third-party TTS
 * - Final info architecture and API types are reserved
 */
export default function TtsPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">TTS 语音合成</h1>

        <div className="placeholder-banner mb-8">
          🚧 此功能正在开发中，将在后续版本上线。
        </div>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">计划能力</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>输入中文文本，选择角色和模型，生成对应日文角色语音</li>
              <li>异步任务处理：提交后无需等待，可稍后查看结果</li>
              <li>多角色支持：每个角色可有独立的 TTS 模型</li>
              <li>安全的音频下载：生成音频通过短期签名 URL 提供</li>
              <li>AI 生成内容标识：所有生成音频将明确标注为 AI 生成</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">技术架构</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>FastAPI 服务处理 API 请求</li>
              <li>Redis + Celery 管理异步任务队列</li>
              <li>独立 GPU Worker 执行模型推理</li>
              <li>浏览器不直接访问 GPU 服务，所有请求经 Next.js BFF 代理</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">重要声明</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>生成音频仅供技术学习参考，不得冒充游戏官方原始语音</li>
              <li>TTS 模型基于非商业化研究训练</li>
              <li>上线前将完成所有必要的 AI 生成内容标识</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
