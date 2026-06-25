// =============================================================================
// AsaHome Static TTS Sample Data
// =============================================================================

export interface TtsSample {
  id: string;
  characterId: string;
  characterName: string;
  textZh: string;
  textJa: string;
  audioPath: string;
  modelName: string;
  description: string;
}

/**
 * Static TTS sample data.
 *
 * Audio files live in public/audio/tts/.
 * Each entry is a pre-generated voice sample for display.
 */
export const ttsSamples: TtsSample[] = [
  // Example sample — replace with real data
  // {
  //   id: "sample-01",
  //   characterId: "example",
  //   characterName: "示例角色",
  //   textZh: "你好，这是示例文本。",
  //   textJa: "こんにちは、これはサンプルです。",
  //   audioPath: "/audio/tts/sample-01.wav",
  //   modelName: "v1.0",
  //   description: "基础模型生成的语音示例",
  // },
];

/**
 * TTS project information — displayed on /tts page.
 */
export const ttsProjectInfo = {
  title: "AsaHome TTS",
  description:
    "基于 AI 的角色语音合成项目。输入中文文本，合成对应角色的日文语音。",
  techStack: ["FastAPI", "Redis", "Celery", "PyTorch", "VITS / BERT-VITS2"],
  githubRepo: "https://github.com/SegemiPL/AsaHome-TTS",
  localDeployDoc: "https://github.com/SegemiPL/AsaHome-TTS#readme",
  aiGeneratedNotice:
    "所有展示音频均为 AI 生成，仅供技术学习参考，不得冒充游戏官方原始语音。",
};
