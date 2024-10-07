import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLogin } from '../context/LoginProvider';
import { WEB_SOCKET_URL } from '../env';
import { TouchableOpacity } from 'react-native';

const MultiPlayerScreen = ({ route, navigation }) => {
  const { inviterId, inviteeId } = route.params;
  const { profile } = useLogin();
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [currentTurn, setCurrentTurn] = useState(inviterId); // Track whose turn it is
  const [winner, setWinner] = useState(null);  // Store the winner
  const socketRef = useRef(null);
  const [gameStatus, setGameStatus] = useState('');

  useEffect(() => {
    socketRef.current = new WebSocket(WEB_SOCKET_URL);
    socketRef.current.onopen = () => {
      socketRef.current.send(JSON.stringify({ userId: profile._id }));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("play");
      console.log(data);

      if (data.type === 'gameUpdate') {
        setBoard(data.board);
        setCurrentTurn(data.currentTurn);
        checkForWinner(data.board);
      }
    };

    return () => {
      socketRef.current.close();
    };

  }, [])

  const makeMove = (index) => {
    if (board[index] || gameStatus) return; // If square is filled or game is over
    const newBoard = [...board];
    newBoard[index] = currentTurn === inviterId ? 'X' : 'O';
    setBoard(newBoard);
    socketRef.current.send(JSON.stringify({ type: 'makeMove', board: newBoard, userId: currentTurn }));
    setCurrentTurn(currentTurn === inviterId ? inviteeId : inviterId); // Switch turn
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
        return;
      }
    }
    if (newBoard.every(square => square)) {
      setGameStatus("It's a Tie!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{gameStatus}</Text>
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