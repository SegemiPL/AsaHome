import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私说明",
  description: "AsaHome 隐私说明",
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="section-inner max-w-prose mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">隐私说明</h1>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">信息收集</h2>
            <p>
              AsaHome 为非商业化的个人技术展示站。本站不设用户注册、不设评论功能、
              不使用第三方分析追踪脚本。服务器日志仅用于技术运维和故障排查，
              不用于用户行为分析或广告投放。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">TTS 服务</h2>
            <p>
              TTS 服务上线后，用户输入的中文文本将仅用于生成对应语音，
              默认不长期保存，或仅保存不可逆哈希用于缓存去重。
              具体数据保留策略将在服务上线前由维护者确认并公示。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">桌面客户端</h2>
            <p>
              桌宠客户端仅在本地运行，不会自动上传用户数据或截取屏幕内容。
              更新检查仅向 AsaHome 服务器请求版本信息，不传输其他数据。
              用户可在系统托盘中随时退出程序。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">联系方式</h2>
            <p>
              如有隐私相关问题，请通过项目页面提供的联系方式联系站长。
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
