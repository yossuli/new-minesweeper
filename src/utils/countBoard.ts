export const countBoard = (board: number[][], countNum: number[]) =>
  board.flat().filter((cell) => countNum.includes(cell)).length;
