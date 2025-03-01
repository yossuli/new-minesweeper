import React from 'react';
import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { Cell } from '../components/Cell';
import { Reset } from '../components/Reset';
import { Levels } from '../components/Levels';
import { Custom } from '../components/Custom';
import { Main } from '../components/Main';
import { Timer } from '../hooks/Timer';
import { levelsData } from '../constants';
import { Display } from '../components/Display';

const Home = () => {
  const {
    levelSelect,
    customSelect,
    setCustom,
    reset,
    clickHandler,
    clickRHandler,
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
  return (
    <div className={styles.container}>
      <Levels levelsData={levelsData} levelSelect={levelSelect} customSelect={customSelect} />
      <Custom custom={custom} setCustom={setCustom} defaultValues={defaultValues} />
      <Main width={width} height={height}>
        <div className={styles.head}>
          <Display number={displayBombNum} digits={3} />
          <Reset isFailed={isFailed} isClear={isClear} reset={reset} />
          <Timer isClear={isClear} isFailed={isFailed} isStart={isStart} />
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
