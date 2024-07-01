import React from 'react';
import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { Cell } from '../components/Cell';
import { Reset } from '../components/Reset';
import { Levels } from '../components/Levels';
import { Custom } from '../components/Custom';
import { Main } from '../components/Main';
import { useTimer } from '../hooks/useTimer';

const Home = () => {
  const {
    levelSelect,
    customSelect,
    setCustom,
    reset,
    clickHandler,
    clickRHandler,
    levelsData,
    defaultValues,
    width,
    height,
    displayBombNum,
    boardWithFlag,
    isClear,
    isFailed,
    isStart,
    custom,
  } = useGame();
  const { timer } = useTimer({ isStart, isFailed, isClear });
  return (
    <div className={styles.container}>
      <Levels levelsData={levelsData} levelSelect={levelSelect} customSelect={customSelect} />
      <Custom custom={custom} setCustom={setCustom} defaultValues={defaultValues} />
      <Main width={width} height={height}>
        <div className={styles.head}>
          <div className={styles.display}>{displayBombNum}</div>
          <Reset isFailed={isFailed} isClear={isClear} reset={reset} />
          <div className={styles.display}>{timer}</div>
        </div>
        <div className={styles.board}>
          {boardWithFlag.map((row, y) =>
            row.map((cell, x) => (
              <Cell
                cell={cell}
                onClick={() => clickHandler(x, y)}
                onContextMenu={(e) => clickRHandler(x, y, e)}
                key={`${x}-${y}`}
              />
            )),
          )}
        </div>
      </Main>
    </div>
  );
};

export default Home;
