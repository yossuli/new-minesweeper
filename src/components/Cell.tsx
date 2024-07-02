import { isIncludesStone } from '../utils/isIncludesStone';
import styles from './Cell.module.css';

type props = {
  cell: number;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  onContextMenu: React.MouseEventHandler<HTMLDivElement> | undefined;
};

export const Cell = ({ cell, onClick, onContextMenu }: props) => {
  const backgroundPositionX = `${((cell % 100) - 1) * -20}px`;
  const backgroundColor = { 1: 'red', 2: 'pink' }[Math.floor(cell / 100)];
  const className = `${styles.icon} ${isIncludesStone(cell) ? styles.stone : styles.cell}`;
  console.log(new Date().getTime());
  return (
    <div
      className={className}
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{ backgroundPositionX, backgroundColor }}
    />
  );
};
