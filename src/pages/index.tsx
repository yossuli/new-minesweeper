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
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
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
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (userInputs[y][x] === 1) {
        board[y][x] = countBomb(x, y);
      }
    }
  }
  console.log('userInputs');
  console.table(userInputs);
  console.log('board');
  console.table(board);
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
