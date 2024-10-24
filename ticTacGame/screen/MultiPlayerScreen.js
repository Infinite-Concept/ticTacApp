import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLogin } from '../context/LoginProvider';
import { TouchableOpacity } from 'react-native';

const MultiPlayerScreen = ({ navigation }) => {
  const { profile, inviterId, socketRef, gameId, opponent, board, setBoard, currentTurn, setCurrentTurn} = useLogin();
  const [gameStatus, setGameStatus] = useState('');
  const currentUser = profile;

  const makeMove = (index) => {
    if (board[index] || gameStatus || currentTurn !== profile._id) return; // If square is filled or game is over
    const newBoard = [...board];
    newBoard[index] = currentTurn === inviterId ? 'X' : 'O';
    setBoard(newBoard);
    checkForWinner(newBoard);

    socketRef.current.send(JSON.stringify({
      type: 'makeMove',
      position: index,
      userId: profile._id,
      gameId: gameId,
    }));

    // setCurrentTurn(currentTurn === inviterId ? profile._id : inviterId); // Switch turn
  };

  const checkForWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setGameStatus(`Player ${newBoard[a]} Wins!`);
        socketRef.current.send(JSON.stringify({
          type: 'gameOver',
          winner: newBoard[a],
          gameId: gameId,
        }));
        return;
      }
    }
    
    if (newBoard.every(square => square)) {
      setGameStatus("It's a Tie!");
      socketRef.current.send(JSON.stringify({
        type: 'gameOver',
        winner: null,
        gameId: gameId,
      }));
    }
  };

  console.log("--------");
  console.log(currentTurn);
  console.log(currentUser);
  console.log(opponent);
  console.log("--------");

  

  return (
    <View style={styles.container}>
      {/* <Text style={styles.status}>{currentTurn === currentUser._id ? `Your turn (${currentUser.userName})` : `Opponent's turn (${opponent.userName})`}</Text> */}
      <View style={styles.board}>
        {board.map((square, index) => (
          <TouchableOpacity key={index} style={styles.square} onPress={() => makeMove(index)}>
            <Text style={styles.squareText}>{square}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default MultiPlayerScreen

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  status: { fontSize: 24, marginBottom: 20 },
  board: { width: 300, height: 300, flexDirection: 'row', flexWrap: 'wrap' },
  square: { width: '33.33%', height: '33.33%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#000' },
  squareText: { fontSize: 40 },
});