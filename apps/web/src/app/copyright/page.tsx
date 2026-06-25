import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "版权与非官方声明",
  description: "AsaHome 版权声明与非官方项目说明",
};

export default function CopyrightPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">版权与非官方声明</h1>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section className="card p-6 border-red-200">
            <h2 className="text-lg font-semibold text-red-700 mb-3">非官方声明</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>本站为非官方、完全非商业化的个人技术展示项目。</li>
              <li>本站与 ASa Project 及权利方无隶属或授权关系。</li>
              <li>所有相关作品与角色权利归原权利方所有。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">ASa Project 官方指引</h2>
            <p>
              ASa Project 官方指南允许一定范围的非商业介绍、引用和二次创作，
              但也明确禁止素材分发，并对网站图片/数据的转载和复制设有条件。
              本站严格遵守官方指引，不提供游戏资源下载，不分发解包素材。
            </p>
            <p className="mt-2">
              官方指引：
              <a href="https://www.asa-pro.com/top/guide/guide.html" className="text-brand-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                ASa Project ガイドライン
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">素材使用说明</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>自写 Blog、技术说明和不含原资源的代码为原创内容。</li>
              <li>官方公开素材的使用将保留来源、权利声明和禁止转载提示。</li>
              <li>解包得到的音频、文本、立绘等原始资源不默认公开。</li>
              <li>TTS 模型权重和训练数据的公开范围由维护者人工确认。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">AI 生成内容</h2>
            <p>
              本站 TTS 服务生成的音频明确标识为「AI 生成语音」，
              包括模型名称、版本和生成时间。下载音频文件将包含可识别的文件名和元数据。
              所有 AI 生成音频不得冒充游戏官方原始语音。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">内容下架</h2>
            <p>
              如权利方认为本站内容涉及侵权，请通过项目页面提供的联系方式联系站长，
              我们将及时处理。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">禁止事项</h2>
            <ul className="list-disc pl-6 space-y-2 text-red-700">
              <li>禁止将本站生成音频冒充官方原始音频使用。</li>
              <li>禁止未经许可将本站内容用于商业用途。</li>
              <li>禁止将本站技术用于侵犯 ASa Project 或任何第三方权利的活动。</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
