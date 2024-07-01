import type React from 'react';
import { useState } from 'react';
import { isIncludesStone } from '../utils/isIncludesStone';
import type { CustomFields, LevelData } from '../types';
import { customFields } from '../types';
import { countBoard } from '../utils/countBoard';
import { normalBoard } from '../utils/normalBoard';
const dirs = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

export const useGame = () => {
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>(normalBoard(9, 9, 0));
  const [bombMap, setBombMap] = useState(normalBoard(9, 9, 0));
  const [custom, setCustom] = useState<Record<CustomFields, number> | null>(null);

  const bombNumCalc = () =>
    custom !== null ? custom.bombNum : { 9: 10, 16: 40, 30: 99 }[width] ?? 0;

  const width = userInputs[0].length;
  const height = userInputs.length;
  const bombNum = bombNumCalc();
  const board = normalBoard(width, height, -1);
  const isStart = countBoard(userInputs, [1]) !== 0;
  const isFailed = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );

  const countBomb = (x: number, y: number) =>
    bombMap
      .slice(Math.max(0, y - 1), Math.min(y + 2, height))
      .flatMap((row) => row.slice(Math.max(0, x - 1), Math.min(x + 2, width)))
      .filter((cell) => cell === 1).length;

  const openCell = (x: number, y: number) => {
    const bombCount = countBomb(x, y);
    board[y][x] = bombCount;
    if (bombCount === 0) {
      for (const [dx, dy] of dirs) {
        if (isIncludesStone(board[y + dy]?.[x + dx])) {
          openCell(x + dx, y + dy);
        }
      }
    }
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (userInputs[y][x] === 1 && bombMap[y][x] === 0) {
        openCell(x, y);
      } else if (userInputs[y][x] === 2) {
        board[y][x] = 10;
        if (isFailed && bombMap[y][x] === 0) {
          board[y][x] = 210;
        }
      } else if (userInputs[y][x] === 3) {
        board[y][x] = 9;
      }
      if (isFailed && bombMap[y][x] === 1) {
        board[y][x] = 11;
        if (userInputs[y][x] === 1) {
          board[y][x] = 111;
        }
      }
    }
  }

  const isClear = countBoard(board, [-1, 10]) === bombNum;

  const boardWithFlag = board.map((row, y) =>
    row.map((cell, x) => (isClear && bombMap[y][x] === 1 ? 10 : cell)),
  );

  const setBombRandom = (x: number, y: number) => {
    const newBombMap = structuredClone(bombMap);
    newBombMap[y][x] = 1;
    const safeBombNum = Math.min(bombMap.flat().length - 1, Math.max(0, bombNum));
    while (countBoard(newBombMap, [1]) <= safeBombNum) {
      const randomX = Math.floor(Math.random() * width);
      const randomY = Math.floor(Math.random() * height);
      newBombMap[randomY][randomX] = 1;
    }
    if (custom !== null) {
      setCustom({ ...custom, bombNum: safeBombNum });
    }
    newBombMap[y][x] = 0;
    setBombMap(newBombMap);
  };

  const clickHandler = (x: number, y: number) => {
    if (!isFailed && !isClear) {
      if (countBoard(userInputs, [1]) === 0) {
        setBombRandom(x, y);
      }
      const newUserInputs = structuredClone(userInputs);
      if (newUserInputs[y][x] === 0) {
        newUserInputs[y][x] = 1;
      }
      setUserInputs(newUserInputs);
    }
  };

  const clickRHandler = (x: number, y: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isFailed && !isClear && isIncludesStone(board[y][x])) {
      const newUserInputs = structuredClone(userInputs);
      newUserInputs[y][x] = ({ 0: 2, 1: 1, 2: 3, 3: 0 } as const)[newUserInputs[y][x]];
      setUserInputs(newUserInputs);
    }
  };

  const reset = () => {
    setUserInputs(normalBoard(width, height, 0));
    setBombMap(normalBoard(width, height, 0));
  };

  const customSelect = () => {
    if (custom === null) {
      setCustom({ width, height, bombNum });
    } else {
      setUserInputs(normalBoard(custom.width, custom.height, 0));
      setBombMap(normalBoard(custom.width, custom.height, 0));
    }
  };

  const levelsData: { level: string; data: LevelData }[] = [
    { level: '初級', data: { width: 9, height: 9 } },
    { level: '中級', data: { width: 16, height: 16 } },
    { level: '上級', data: { width: 30, height: 16 } },
  ];
  const levelSelect = (data: LevelData) => {
    setUserInputs(normalBoard(data.width, data.height, 0));
    setBombMap(normalBoard(data.width, data.height, 0));
    setCustom(null);
  };
  const defaultValues: Record<CustomFields, number> = { width, height, bombNum };

  const displayBombNum = bombNum - countBoard(userInputs, [2]);
  return {
    levelSelect,
    customSelect,
    setCustom,
    reset,
    isIncludesStone,
    clickHandler,
    clickRHandler,
    levelsData,
    customFields,
    defaultValues,
    width,
    height,
    displayBombNum,
    boardWithFlag,
    isClear,
    isFailed,
    isStart,
    custom,
  };
};
