// =============================================================================
// AsaHome Static Character Data
// =============================================================================

export interface CharacterData {
  id: string;
  slug: string;
  nameZh: string;
  nameJa: string;
  gameTitle: string;
  description: string;
  displayOrder: number;
  defaultPortrait: string;
  copyrightNotice: string;
}

/**
 * Static character data.
 *
 * To add a character, append a new entry to this array.
 * Portraits live in public/characters/.
 */
export const characters: CharacterData[] = [
  // Example character — replace with real data
  // {
  //   id: "example",
  //   slug: "example",
  //   nameZh: "示例角色",
  //   nameJa: "サンプル",
  //   gameTitle: "示例作品",
  //   description: "角色描述……",
  //   displayOrder: 1,
  //   defaultPortrait: "/characters/example.png",
  //   copyrightNotice: "© ASa Project / 权利方",
  // },
];
