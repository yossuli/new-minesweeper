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
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.head} />
        <div className={styles.board}>
          {board.map((row, y) =>
            row.map((cell, x) => (
              <div className={cell !== -1 ? styles.cell : styles.stone} key={`${x}-${y}`} />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
