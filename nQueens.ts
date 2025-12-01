export function solveNQueens(n: number): string[][] {
  // define variables
  const solutions: string[][] = [];
  const state: number[] = [];
  // const position = state.length;

  //   check for base case when we have placed all the queens
  const isValidState = (state: number[]): boolean => state.length === n;
  const getCandidates = (state: number[]): number[] => {
    const position = state.length;
    // for first row
    if (position === 0) {
      return Array.from({ length: n }, (_, i) => i);
    }

    // possible candidates
    const candidates = new Set<number>(Array.from({ length: n }, (_, i) => i));

    // prune candidates that can attack queen
    for (let row = 0; row < position; row++) {
      // remove col already occupied by a queen
      const col = state[row]!;
      candidates.delete(col);

      // remove diagnol cols
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

console.log(solveNQueens(7));



// function Main(str: string): string {
//   // Parse input
//   let n = parseInt(str.trim());

//   // Edge case: check constraints
//   if (isNaN(n) || n < 1 || n > 12) {
//     return "Invalid Input";
//   }

//   // Initialize board
//   let result = "";
//   let state: number[] = [];

//   // Helper function to check if it's safe to place a queen
//   const isValidState = (state: number[]) => state.length === n;

//   // Recursive function to solve N-Queens
//   function n_queens(state: number[]): number[] {
//     // TODO: Implement recursive backtracking to place queens
//     // if first column, return all possible candidates
//     if (state.length === 0) {
//       return Array.from({ length: n }, (_, i) => i);
//     }

//     const candidates = new Set<number>(Array.from({ length: n }, (_, i) => i));
//     const position = state.length;

//     // prune rows that would lead to queens attacking each other
//     for (let row = 0; row < position; row++) {
//       // remove row already occupied by queen
//       const col = state[row]!;
//       candidates.delete(col);

//       // remove the diagonals
//       const dist = position - row;
//       candidates.delete(col - dist);
//       candidates.delete(col + dist);
//     }

//     return Array.from(candidates);
//   }

//   const stateToBinary = (state: number[]): string => {
//     let binary = "";
//     for (let row = 0; row < n; row++) {
//       const queenCol = state[row];
//       for (let col = 0; col < n; col++) {
//         binary += col === queenCol ? "1" : "0";
//       }
//     }

//     return binary;
//   };

//   function search(state: number[]): boolean {
//     // if solution found, push it to solutions array and exit search
//     if (isValidState(state)) {
//       result = stateToBinary(state);
//       return true;
//     }

//     for (const candidate of n_queens(state)) {
//       state.push(candidate);
//       try {
//         if (search(state)) return true;
//       } finally {
//         state.pop();
//       }
//     }

//     return false;
//   }

//   search(state);
//   return result ? result : "Invalid Input";
// }

// // keep this function call here
// // @ts-ignore
// let fs = require("fs");
// let stdinBuffer = fs.readFileSync(0);
// console.log(Main(stdinBuffer.toString()));

