import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "桌面桌宠",
  description: "Windows / macOS 本地角色桌宠（开发中）",
};

/**
 * Desktop Pet placeholder page — Phase 1.
 *
 * Constraints per Section 7.4:
 * - Clearly marked "开发中"
 * - Explains planned capabilities
 * - No clickable but non-functional buttons
 * - No fake simulation
 */
export default function PetPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">桌面桌宠</h1>

        <div className="placeholder-banner mb-8">
          🚧 此功能正在开发中，将在后续版本上线。
        </div>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">计划能力</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Windows 和 macOS 原生桌面客户端（Tauri 2）</li>
              <li>透明无边框窗口，始终置顶显示角色立绘</li>
              <li>鼠标拖动、点击穿透、系统托盘</li>
              <li>角色状态切换（idle、smile、speaking 等）</li>
              <li>自动更新支持</li>
              <li>可选 TTS 语音播放联动</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">技术实现</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>基于 Tauri 2，复用 React/TypeScript 角色组件</li>
              <li>与 Web 端共享角色协议（Character Manifest）和 UI 逻辑</li>
              <li>第一版角色动画使用图片状态切换和淡入淡出，不引入 Live2D</li>
              <li>角色包支持版本化管理和 SHA-256 校验</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">非官方声明</h2>
            <p>
              桌宠角色素材基于 ASa Project 作品，仅用于个人技术展示。
              不提供完整游戏资源下载，角色包不包含可执行代码。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
