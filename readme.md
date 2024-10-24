  // const checkForWinner = (newBoard) => {
  //   const winningCombinations = [
  //     [0, 1, 2], [3, 4, 5], [6, 7, 8],
  //     [0, 3, 6], [1, 4, 7], [2, 5, 8],
  //     [0, 4, 8], [2, 4, 6],
  //   ];
  //   for (let combo of winningCombinations) {
  //     const [a, b, c] = combo;
  //     if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
  //       setGameStatus(`Player ${newBoard[a]} Wins!`);
  //       return;
  //     }
  //   }
  //   if (newBoard.every(square => square)) {
  //     setGameStatus("It's a Tie!");
  //   }
  // };