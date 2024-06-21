import styles from './index.module.css';

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
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
  };
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
