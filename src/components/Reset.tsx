import styles from './Reset.module.css';

type props = { isFailed: boolean; isClear: boolean; reset: () => void };

export const Reset = ({ isFailed, isClear, reset }: props) => (
  <div
    className={styles.reset}
    style={{
      backgroundPositionX: `${(11 + +isFailed * 2 + +isClear) * -30}px`,
    }}
    onClick={reset}
  />
);
