import { Display } from '../components/Display';
import { useTimer } from './useTimer';

type props = { isStart: boolean; isFailed: boolean; isClear: boolean };
export const Timer = ({ isStart, isFailed, isClear }: props) => {
  const { timer } = useTimer({ isStart, isFailed, isClear });
  return <Display number={timer} digits={3} />;
};
