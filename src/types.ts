export const customFields = ['width', 'height', 'bombNum'] as const;

export type CustomFields = (typeof customFields)[number];
export type LevelData = { width: number; height: number };
