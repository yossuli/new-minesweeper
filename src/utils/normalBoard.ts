export const normalBoard = <T>(x: number, y: number, fill: T) =>
  [...Array(y)].map(() => [...Array(x)].map(() => fill));
