import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Audio } from 'expo-av';
import { NEUTRAL } from '../../common/color';
import Refresh from "../../common/image/Refresh"

const Computer = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const clickSoundRef = useRef(null);
  const gameOverSoundRef = useRef(null);

  // Load sounds
  const loadSounds = async () => {
    clickSoundRef.current = await Audio.Sound.createAsync(
      require('../../assets/sound/click.mp3')
    );
    gameOverSoundRef.current = await Audio.Sound.createAsync(
      require('../../assets/sound/game_over.mp3')
    );
  };

  // Play click sound
  const playClickSound = async () => {
    if (clickSoundRef.current) {
      await clickSoundRef.current.sound.replayAsync();
    }
  };

  // Play game over sound
  const playGameOverSound = async () => {
    if (gameOverSoundRef.current) {
      await gameOverSoundRef.current.sound.replayAsync();
    }
  };

  useEffect(() => {
    loadSounds();
    return () => {
      // Cleanup sounds
      clickSoundRef.current?.sound.unloadAsync();
      gameOverSoundRef.current?.sound.unloadAsync();
    };
  }, []);

  const playMove = (index) => {
    if (!board[index] && !gameOver) {
      playClickSound(); // Play click sound
      const newBoard = [...board];
      newBoard[index] = isUserTurn ? 'X' : 'O';
      setBoard(newBoard);
      setIsUserTurn(!isUserTurn);
    }
  };

  const computerMove = () => {
    const bestMove = getBestMove(board, 'O');
    if (bestMove !== -1) {
      playMove(bestMove);
    }
  };

  useEffect(() => {
    if (!isUserTurn && !gameOver && !checkWinner(board) && board.includes(null)) {
      setTimeout(computerMove, 500); // Delay computer's move
    }
  }, [isUserTurn]);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleGameOver = async (winner) => {
    if (winner || !board.includes(null)) {
      setGameOver(true); // Set game over state
      await playGameOverSound(); // Play game over sound
      alert(winner ? `${winner} wins!` : "It's a draw!");
    }
  };

  useEffect(() => {
    const winner = checkWinner(board);
    handleGameOver(winner);
  }, [board]);

  const getBestMove = (board, player) => {
    const opponent = player === 'X' ? 'O' : 'X';
    let bestScore = player === 'O' ? -Infinity : Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = player;
        const score = minimax(board, 0, false, player, opponent);
        board[i] = null;
        if (player === 'O') {
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        } else {
          if (score < bestScore) {
            bestScore = score;
            move = i;
          }
        }
      }
    }
    return move;
  };

  const minimax = (board, depth, isMaximizing, player, opponent) => {
    const winner = checkWinner(board);
    if (winner === player) return 10 - depth;
    if (winner === opponent) return depth - 10;
    if (!board.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = player;
          const score = minimax(board, depth + 1, false, player, opponent);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = opponent;
          const score = minimax(board, depth + 1, true, player, opponent);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsUserTurn(true);
    setGameOver(false);
  };

  const getCellStyle = (value) => {
    if (value === 'X') {
      return styles.cellX;
    } else if (value === 'O') {
      return styles.cellO;
    } else {
      return styles.cell;
    }
  };

  const getTextStyle = (value) => {
    if (value === 'X') {
      return styles.TextX;
    } else if (value === 'O') {
      return styles.TextO;
    } else {
      return styles.TextNull;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity key={index} style={getCellStyle(value)} onPress={() => isUserTurn && playMove(index)}>
            <Text style={getTextStyle(value)}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {gameOver && 
        <TouchableOpacity onPress={resetGame} style={styles.btn}>
            <Refresh />
            <Text style={styles.btnText}>Play again</Text>
        </TouchableOpacity>}
    </View>
  );
};

export default Computer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: "relative",
    flex: 1
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 320,
    height: 320,
    marginTop: 150,
    gap: 10
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#212835',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellX: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#2475C5',
    backgroundColor: '#2475C533',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellO: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#E45651',
    backgroundColor: '#E4565133',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextX: {
    fontSize: 40,
    color: '#2475C5',
  },
  TextO: {
    fontSize: 40,
    color: '#E45651',
  },
  TextNull: {
    fontSize: 40,
    color: NEUTRAL.dark_gray,
  },
  btn: {
    borderColor: NEUTRAL.dark_gray,
    borderWidth: 2,
    borderRadius: 5,
    width: "90%",
    position: "absolute",
    bottom: 30,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center"
  },
  btnText: {
    fontSize: 16,
    color: NEUTRAL.dark_gray,
    fontFamily: "Roboto-Medium"
  }
});
