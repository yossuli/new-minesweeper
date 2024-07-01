import styles from './Main.module.css';

type props = {
  width: number;
  height: number;
  children: React.ReactNode[];
};

export const Main = ({ width, height, children }: props) => (
  <div
    className={styles.main}
    style={{ width: `${width * 30 + 30}px`, height: `${height * 30 + 85}px` }}
  >
    {children}
  </div>
);
