import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于",
  description: "关于 AsaHome 项目",
};

export default function AboutPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">关于 AsaHome</h1>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">项目简介</h2>
            <p>
              AsaHome 是一个围绕 ASa Project 作品构建的个人技术展示网站，目标是展示从逆向数据处理、模型训练、
              Web 服务到桌面客户端的完整技术链路。
            </p>
            <p className="mt-2">
              项目完全非商业化，Blog 仅由站长发布，网站主要服务于中国大陆用户。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">主要功能</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Blog：发布站长个人 Blog、杂谈、逆向工程记录和开发日志</li>
              <li>角色展示：介绍 ASa Project 相关角色与作品</li>
              <li>TTS 语音合成（开发中）：中文输入到日文角色语音的在线服务</li>
              <li>本地桌宠（开发中）：Windows / macOS 可下载角色桌宠</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">技术栈</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>前端：Next.js + React + TypeScript + Tailwind CSS</li>
              <li>内容管理：Directus + PostgreSQL</li>
              <li>TTS 服务：FastAPI + Redis + Celery（开发中）</li>
              <li>桌面客户端：Tauri 2 + Vite + React（开发中）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">非官方声明</h2>
            <p>
              本站为非官方、完全非商业化的个人技术展示项目，与 ASa Project 及权利方无隶属或授权关系。
              相关作品与角色权利归原权利方所有。本站不提供任何游戏资源下载，TTS 生成音频仅供技术学习参考，
              不得冒充官方原始语音。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
