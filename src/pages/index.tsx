import React from 'react';
import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { Cell } from '../components/Cell';
import { Reset } from '../components/Reset';

const Home = () => {
  const {
    levelSelect,
    customSelect,
    setCustom,
    reset,
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
    timer,
    custom,
  } = useGame();
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
      </div>
    </div>
  );
};

export default Home;
