import React, { useContext, useState, createContext, useEffect, useRef} from 'react'
import { DARK_MODE, LIGHT_MODE } from '../common/color'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WEB_SOCKET_URL } from '../env'
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginContext = createContext()
LogBox.ignoreAllLogs()

const LoginProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profile, setProfile] = useState([])
  const [mode, setMode] = useState(LIGHT_MODE)
  const [changeMode, setChangeMode] = useState(false)
  const [inviterId, setInviterId] = useState(""); 
  const [declineMsg, setDeclineMsg] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [declineVisible, setDeclineVisible] = useState(false);
  const [gameId, setGameId] = useState("")
  const [board, setBoard] = useState(Array(9).fill(null)); 
  const [currentTurn, setCurrentTurn] = useState(null); // Track whose turn it is
  const [winner, setWinner] = useState(null); // Store the winner
  const [opponent, setOpponent] = useState(null);
  const socketRef = useRef(null);
  const navigation = useNavigation()

  const socketService = async () => {
    socketRef.current = new WebSocket(WEB_SOCKET_URL);

    socketRef.current.onopen = () => {
      socketRef.current.send(JSON.stringify({ userId: profile._id }));
    };
  
    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);
        
        // Check if users are being received
        if (data.type === 'onlineUsers') {
          return setOnlineUsers(data.users); // Set the online users
          // const filteredUsers = users.filter(user => user.userId !== profile._id )
        }

        if (data.type === 'gameInvitation') {
          setInviterId(data.fromUser);
          showModal()
        }

        if (data.type === 'inviteDeclined') {
          setDeclineMsg(data.invitee ? `Your game invitation was declined by ${data.inviteeName}` : `You declined a game invite from ${data.inviterName}`);
          showDeclineModal();
          setTimeout(() => setDeclineVisible(false), 3000);
        }

        if (data.type === 'startGame') {
          navigation.navigate('MultiLoading');
          setGameId(data.gameId)
          setCurrentTurn(data.currentTurn);
          // Determine the opponent based on who initiated the game
          const opponentId = data.with !== profile._id && data.with;
          const opponentData = onlineUsers.find(user => user.userId === opponentId);          
          if (opponentData) {
            setOpponent(opponentData);  // Assuming you've added setOpponent to manage the opponent's state
          }
        }

        if (data.type === 'gameUpdate') {
          console.log("----");
          console.log(data);
          console.log("----");
          setBoard(data.board)
          setCurrentTurn(data.currentTurn);
          setWinner(data.winner);
        }
      
      } catch (error) {
        console.log(error);
        
      }
    };
    
    socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
    }; 
  }

  useEffect(() => {
    if(profile.length !== 0){
      socketService()
    }
  }, [profile])

  useEffect(() => {
    const loadMode = async () => {
      try {
        const storedMode = await AsyncStorage.getItem("mode")

        if(storedMode){
          const isDarkMode = storedTheme === "LIGHT_MODE";
          setMode( isDarkMode ? LIGHT_MODE : DARK_MODE)
        }
      } catch (error) {
        console.error("error getting mode", error);
        
      }
    }

    loadMode()
  }, [])

  const toggleMode = async () => {
    const newTheme = mode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE
    setMode(newTheme)
    try {
      await AsyncStorage.setItem("mode", newTheme === LIGHT_MODE ? "LIGHT_MODE" : "DARK_MODE")
    } catch (error) {
      console.error("unable to connect", error);
    }
  }

  const handleInvite = (userId) => {
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          type: 'inviteToGame',
          userId: profile._id,
          toUser: userId,
        })
      );
    }
  };
 
  // Decline invitation
  const handleCancel = () => {
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          type: 'declineInvite',
          userId: profile._id,
          toUser: inviterId,  // Use inviter ID from state
        })
      );
      setModalVisible(false);  // Close the modal after declining
    }
  };

  // Accept invitation
  const handleAccept = () => {
    if (socketRef.current) {
      socketRef.current.send(
        JSON.stringify({
          type: 'acceptInvite',
          userId: profile._id,
          toUser: inviterId,  // Use inviter ID from state
        })
      );
      setModalVisible(false);  // Close the modal after accepting
    }
  };

  const showModal = () => {
    setModalVisible(true)
  }

  const showDeclineModal = () => {
    setDeclineVisible(true)
  }

  return (
    <LoginContext.Provider  value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, mode, handleInvite, handleCancel, handleAccept, onlineUsers, declineMsg, modalVisible, declineVisible, setModalVisible, setDeclineVisible, inviterId, socketRef, gameId, board, setBoard, currentTurn, setCurrentTurn, opponent}}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider
