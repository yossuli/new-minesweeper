import { useCallback, useEffect, useState } from 'react';

type props = {
  isStart: boolean;
  isFailed: boolean;
  isClear: boolean;
};

export const useTimer = ({ isStart, isFailed, isClear }: props) => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (!isStart) {
      setTimer(0);
    }
    const intervalId = setInterval(() => {
      if (isStart && !isFailed && !isClear) {
        setTimer((time) => time + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, isStart, isFailed, isClear]);
  const resetTimer = useCallback(() => setTimer(0), []);
  return { timer, resetTimer };
};
