export function solveNQueens(n: number): string[][] {
  // define variables
  const solutions: string[][] = [];
  const state: number[] = [];

  //   check for base case when we have placed all the queens
  const isValidState = (state: number[]): boolean => state.length === n;

  const getCandidates = (state: number[]): number[] => {
    if (state.length === 0) {
      console.log(
        "Row 0 ->",
        Array.from({ length: n }, (_, i) => i)
      );
      return Array.from({ length: n }, (_, i) => i);
    }
    const position = state.length;
    const candidates = new Set<number>(Array.from({ length: n }, (_, i) => i));

    // prune down candidates that place the queen into attacks
    for (let row = 0; row < state.length; row++) {
      // discard the column index if it's occupied by a queen
      const col = state[row]!;
      candidates.delete(col);

      // Discard diagonalss
      const dist = position - row;
      candidates.delete(col + dist);
      candidates.delete(col - dist);
    }

    return Array.from(candidates);
  };

  //  ex. [1, 3, 0, 2]
  //  output: [".Q..","...Q","Q...","..Q."]
  const stateToString = (state: number[]): string[] =>
    state.map((col) => ".".repeat(col) + "Q" + ".".repeat(n - col - 1));

  function search(state: number[]) {
        // exit when base case is achieved
        if (isValidState(state)) {
            // push to solutions array and format accordingly
            solutions.push(stateToString(state));
            return;
        }
        for (const candidate of getCandidates(state)) {
            state.push(candidate);
            search(state);
            state.pop();
        }
    }

  search(state);
  return solutions;
}

console.log(solveNQueens(4));
