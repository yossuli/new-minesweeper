import React from 'react';
import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { isIncludesStone } from '../utils/isIncludesStone';

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
          {boardWithFlag.map((row, y) =>
            row.map((cell, x) => (
              <div
                className={`${styles.icon} ${isIncludesStone(cell) ? styles.stone : styles.cell}`}
                onClick={() => clickHandler(x, y)}
                onContextMenu={(e) => clickRHandler(x, y, e)}
                style={{
                  backgroundPositionX: `${((cell % 100) - 1) * -20}px`,
                  backgroundColor: { 1: 'red', 2: 'pink' }[Math.floor(cell / 100)],
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
