import styles from "./SevenSegment.module.css";

type props = {
  number: string;
};

export const SevenSegment = ({ number }: props) => {
  const displayNum = '0123456789-'.includes(number) ? number : '-';
  return <div className={styles.main}>{displayNum}</div>;
};
