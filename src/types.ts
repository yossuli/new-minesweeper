import type { customFields } from './constants';

export type CustomFields = (typeof customFields)[number];
export type LevelData = { width: number; height: number };
