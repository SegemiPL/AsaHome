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
            <ul className="list-disc pl-6 space-y-2">
              <li>AsaHome 是一个供 AsaP 玩耍的网站，以及为有需要的 AsaP 提供了我解包的一些角色语音、立绘、文本和 BGM 数据。</li>
              <li>目前打算将这些数据上传 HuggingFace，以供想自己训 TTS 模型的人使用。</li>
              <li>当然，如果你只是想猛猛听可爱的 emi 的语音也没有问题。</li>
              <li>未来打算提供 TTS 服务，也会利用立绘开发一些桌宠。但是我平时上课啥的也挺忙的，可能效率不会很高，这就请多担待了。</li>
              <li>这个网站我也打算唠唠嗑，会展示一些利用 AI 进行游戏逆向的探索过程，或者训 TTS 的一些经验，有兴趣的可以看看捏。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">主要功能</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Blog：发布站长个人 Blog、杂谈、逆向工程记录和开发日志</li>
              <li>角色展示：介绍 ASa Project 相关角色与作品</li>
              <li>TTS 语音合成（独立项目）：展示预生成语音示例，引导前往 GitHub 仓库本地部署</li>
              <li>本地桌宠（独立项目）：功能展示，通过 GitHub Releases 获取安装包</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">技术栈</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>网站：Next.js + React + TypeScript + Tailwind CSS（静态导出）</li>
              <li>Blog：Markdown + Git 管理</li>
              <li>TTS 项目：独立仓库（FastAPI + VITS / BERT-VITS2）</li>
              <li>桌宠客户端：独立仓库（Tauri 2 + React + TypeScript）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">非官方声明</h2>
            <p>
              本站为非官方、完全非盈利的个人项目，目前主要服务于中国大陆用户，与 ASa Project 及权利方无隶属或授权关系。
              相关作品与角色权利归原权利方所有。本站不提供任何游戏资源下载，TTS 生成音频仅供技术学习参考，
              不得冒充官方原始语音。如有版权问题请联系我。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
