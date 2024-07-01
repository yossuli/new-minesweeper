import { useEffect, useState } from 'react';

type props = {
  isStart: boolean;
  isFailed: boolean;
  isClear: boolean;
};

export const useTimer = ({ isStart, isFailed, isClear }: props) => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isStart && !isFailed && !isClear) {
        setTimer((time) => time + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, isStart, isFailed, isClear]);
  const resetTimer = () => setTimer(0);
  return { timer, resetTimer };
};
