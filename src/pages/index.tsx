import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
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

const Home = () => {
  const normalBoard = (x: number, y: number, fill: number) =>
    [...Array(y)].map(() => [...Array(x)].map(() => fill));

  const customFields = ['width', 'height', 'bombNum'] as const;
  type CustomFields = (typeof customFields)[number];
  const [userInputs, setUserInputs] = useState(normalBoard(9, 9, 0));
  const [bombMap, setBombMap] = useState(normalBoard(9, 9, 0));
  const [timer, setTimer] = useState(0);
  const [custom, setCustom] = useState<Record<CustomFields, number> | null>(null);

  const countBoard = (board: number[][], countNum: number[]) =>
    board.flat().filter((cell) => countNum.includes(cell)).length;
  const bombNumCalc = () => {
    if (custom !== null) return custom.bombNum;
    if (width === 9) return 10;
    if (width === 16) return 40;
    if (width === 30) return 99;
    return 0;
  };

  const width = userInputs[0].length;
  const height = userInputs.length;
  const bombNum = bombNumCalc();
  const board = normalBoard(width, height, -1);
  const isStart = countBoard(userInputs, [1]) !== 0;
  const isFailed = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );

  const countBomb = (x: number, y: number) => {
    let bombCount = 0;
    for (const [dx, dy] of dirs) {
      if (bombMap[y + dy]?.[x + dx] === 1) {
        console.log(y + dy, x + dx);
        bombCount++;
      }
    }
    return bombCount;
  };

  const openCell = (x: number, y: number) => {
    const bombCount = countBomb(x, y);
    board[y][x] = bombCount;
    if (bombCount === 0) {
      for (const [dx, dy] of dirs) {
        if (board[y + dy]?.[x + dx] === -1) {
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
      } else if (userInputs[y][x] === 3) {
        board[y][x] = 9;
      }
      if (isFailed && bombMap[y][x] === 1) {
        board[y][x] = 11;
      }
    }
  }
  const isClear = countBoard(board, [-1, 10]) === bombNum;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (isClear && bombMap[y][x] === 1) {
        board[y][x] = 10;
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isStart && !isFailed && !isClear) {
        setTimer((time) => time + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, isStart, isFailed, isClear]);

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
      console.log('newUserInputs');
      console.table(newUserInputs);
      setUserInputs(newUserInputs);
    }
  };

  const clickRHandler = (x: number, y: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isFailed && !isClear && [-1, 9, 10].includes(board[y][x])) {
      const newUserInputs = structuredClone(userInputs);
      if (newUserInputs[y][x] === 0) {
        newUserInputs[y][x] = 2;
      } else if (newUserInputs[y][x] === 2) {
        newUserInputs[y][x] = 3;
      } else if (newUserInputs[y][x] === 3) {
        newUserInputs[y][x] = 0;
      }
      setUserInputs(newUserInputs);
    }
  };

  const reset = () => {
    setUserInputs(normalBoard(9, 9, 0));
    setBombMap(normalBoard(9, 9, 0));
    setTimer(0);
  };

  const customSelect = () => {
    if (custom === null) {
      setCustom({ width, height, bombNum });
    } else {
      setUserInputs(normalBoard(custom.width, custom.height, 0));
      setBombMap(normalBoard(custom.width, custom.height, 0));
      setTimer(0);
    }
  };

  type LevelData = {
    width: number;
    height: number;
    bombNum: number;
  };
  const levelsData: { level: string; data: LevelData }[] = [
    { level: '初級', data: { width: 9, height: 9, bombNum: 10 } },
    { level: '中級', data: { width: 16, height: 16, bombNum: 10 } },
    { level: '上級', data: { width: 30, height: 16, bombNum: 10 } },
  ];
  const levelSelect = (data: LevelData) => {
    setUserInputs(normalBoard(data.width, data.height, 0));
    setBombMap(normalBoard(data.width, data.height, 0));
    setCustom(null);
    setTimer(0);
  };
  const defaultValues: Record<CustomFields, number> = {
    width,
    height,
    bombNum,
  };

  console.log('userInputs');
  console.table(userInputs);
  console.log('bombMap');
  console.table(bombMap);
  return (
    <div className={styles.container}>
      <div>
        {levelsData.map((levelData) => (
          <button onClick={() => levelSelect(levelData.data)} key={levelData.level}>
            {levelData.level}
          </button>
        ))}
        <button onClick={customSelect}>カスタム</button>
      </div>
      {custom !== null && (
        <div>
          {customFields.map((customField) => (
            <>
              <label htmlFor={customField}>{customField} : </label>
              <input
                type="number"
                name={customField}
                id={customField}
                min={1}
                defaultValue={defaultValues[customField]}
                onChange={(e) => setCustom({ ...custom, [customField]: +e.target.value })}
              />
            </>
          ))}
        </div>
      )}
      <div
        className={styles.main}
        style={{ width: `${width * 30 + 30}px`, height: `${height * 30 + 85}px` }}
      >
        <div className={styles.head}>
          <div className={styles.display}>{bombNum - countBoard(userInputs, [2])}</div>
          <div
            className={styles.reset}
            style={{
              backgroundPositionX: `${(11 + +isFailed * 2 + +isClear) * -30}px`,
            }}
            onClick={reset}
          />
          <div className={styles.display}>{timer}</div>
        </div>
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={`${styles.icon} ${
                  [-1, 9, 10].includes(cell) ? styles.stone : styles.cell
                }`}
                onClick={() => clickHandler(x, y)}
                onContextMenu={(e) => clickRHandler(x, y, e)}
                style={{
                  backgroundPositionX: `${(cell - 1) * -20}px`,
                  backgroundColor: { 111: 'red', 120: 'pink' }[
                    100 * +isFailed + 10 * userInputs[y][x] + bombMap[y][x]
                  ],
                }}
                key={`${x}-${y}`}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
