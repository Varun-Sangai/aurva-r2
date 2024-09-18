export function convertRowColumnToKey(i: number, j: number): string {
  return `${i}${j}`;
}

export function calculateOneCount(input: number[][]): number {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == 1) count += 1;
    }
  }
  return count;
}
