import { useState } from 'react';
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
  const board = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const [userInputs, setUserInputs] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const countBoard = (board: number[][], countNum: number) =>
    board.flat().filter((cell) => cell === countNum).length;
  const setBombRandom = (x: number, y: number) => {
    const newBombMap = structuredClone(bombMap);
    newBombMap[y][x] = 1;
    while (countBoard(newBombMap, 1) < 11) {
      const randomX = Math.floor(Math.random() * 9);
      const randomY = Math.floor(Math.random() * 9);
      newBombMap[randomY][randomX] = 1;
    }
    newBombMap[y][x] = 0;
    setBombMap(newBombMap);
  };
  const clickHandler = (x: number, y: number) => {
    if (countBoard(userInputs, 1) === 0) {
      setBombRandom(x, y);
    }
    const newUserInputs = structuredClone(userInputs);
    newUserInputs[y][x] = 1;
    console.log('newUserInputs');
    console.table(newUserInputs);
    setUserInputs(newUserInputs);
  };
  const countBomb = (x: number, y: number) => {
    let bombCount = 0;
    for (const [dx, dy] of dirs) {
      if (bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] === 1) {
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
        if (bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] !== undefined) {
          if (board[y + dy][x + dx] === -1) {
            openCell(x + dx, y + dy);
          }
        }
      }
    }
  };
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (userInputs[y][x] === 1 && bombMap[y][x] === 0) {
        openCell(x, y);
      }
    }
  }
  console.log('userInputs');
  console.table(userInputs);
  console.log('bombMap');
  console.table(bombMap);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.head} />
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={cell !== -1 ? styles.cell : styles.stone}
                onClick={() => clickHandler(x, y)}
                style={{ backgroundPositionX: `${(cell - 1) * -30}px` }}
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
