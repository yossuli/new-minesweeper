import styles from '../pages/index.module.css';
import { useTimer } from './useTimer';

type props = { isStart: boolean; isFailed: boolean; isClear: boolean };
export const Timer = ({ isStart, isFailed, isClear }: props) => {
  const { timer } = useTimer({ isStart, isFailed, isClear });
  return <div className={styles.display}>{timer}</div>;
};
