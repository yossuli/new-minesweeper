import styles from '../pages/index.module.css';
import { SevenSegment } from './SevenSegment';

type props = {
  number: number;
  digits: number;
};

export const Display = ({ number, digits }: props) => {
  const strNumFormatByDigit = String(number).padStart(digits, '0');
  return (
    <div className={styles.display}>
      {strNumFormatByDigit
        .split('')
        .slice(-digits)
        .map((n, i) => (
          <SevenSegment number={n} key={i} />
        ))}
    </div>
  );
};
