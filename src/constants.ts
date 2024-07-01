import type { LevelData } from './types';

export const dirs = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

export const levelsData: { level: string; data: LevelData }[] = [
  { level: '初級', data: { width: 9, height: 9 } },
  { level: '中級', data: { width: 16, height: 16 } },
  { level: '上級', data: { width: 30, height: 16 } },
];

export const customFields = ['width', 'height', 'bombNum'] as const;
