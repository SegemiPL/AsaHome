// =============================================================================
// AsaHome Static WindowPet Data
// =============================================================================

export interface PetPlatform {
  platform: "windows" | "macos";
  arch: "x86_64" | "aarch64";
  downloadLabel: string;
}

export interface PetScreenshot {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Static WindowPet project information — displayed on /pet page.
 */
export const petProjectInfo = {
  title: "AsaHome WindowPet",
  description:
    "跨平台桌面桌宠客户端，支持角色立绘切换、动画效果和系统托盘。基于 Tauri 2 构建。",
  features: [
    "Windows 和 macOS 原生桌面客户端（Tauri 2）",
    "透明无边框窗口，始终置顶显示角色立绘",
    "鼠标拖动、点击穿透、系统托盘驻留",
    "角色状态切换：idle、smile、speaking 等",
    "自动更新支持",
    "可选 TTS 语音播放联动",
  ],
  techStack: ["Tauri 2", "React", "TypeScript", "Rust"],
  githubRepo: "https://github.com/SegemiPL/AsaHome-Pet",
  localDeployDoc: "https://github.com/SegemiPL/AsaHome-Pet#readme",
  platforms: [
    {
      platform: "windows" as const,
      arch: "x86_64" as const,
      downloadLabel: "Windows (x64)",
    },
    {
      platform: "macos" as const,
      arch: "aarch64" as const,
      downloadLabel: "macOS (Apple Silicon)",
    },
  ],
};

/**
 * Screenshots displayed on the pet page.
 * Images live in public/images/.
 */
export const petScreenshots: PetScreenshot[] = [
  // Example screenshots — replace with real images
  // {
  //   src: "/images/pet/pet-screenshot-01.png",
  //   alt: "桌面桌宠截图",
  //   caption: "桌宠在桌面的展示效果",
  // },
];

export const petDisclaimer =
  "桌宠角色素材基于 ASa Project 作品，仅用于个人技术展示。不提供完整游戏资源下载。";
