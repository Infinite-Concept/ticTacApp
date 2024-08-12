import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DARK_THEME, NEUTRAL } from '../common/color'
import Search from "../common/image/Search"
import { useLogin } from '../context/LoginProvider'
import { WEB_SOCKET_URL } from '../env'
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()

const PlayerScreen = ({ navigation }) => {
  const {profile} = useLogin()
  const [onlineUsers, setOnlineUsers] = useState([]);

  const socketService = async () => {
    let socket = new WebSocket(WEB_SOCKET_URL);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send(JSON.stringify({ userId: profile._id }));
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      
    };
    
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    }; 

  }

  useEffect(() => {
    socketService()
    
  }, [])

  return (
    <View style={styles.homeScreen}>
        <View style={styles.historyTextCon}>
            <Text style={styles.historyText}>Online Players</Text>
        </View>

        <TouchableOpacity style={styles.computerButton} onPress={() => navigation.navigate('GameboardLoading')} >
          <Text style={[styles.historyText, {fontSize: 16}]}>Computer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.calenderContainer}>
            <Search />
            <TextInput style={styles.calenderContainerText} placeholder='Search Players' placeholderTextColor={NEUTRAL.darker_gray} />
        </TouchableOpacity>


        <ScrollView>

        </ScrollView>
    </View>
  )
}

export default PlayerScreen

const styles = StyleSheet.create({
  homeScreen: {
      flex: 1,
      backgroundColor: DARK_THEME.dark,
      paddingTop: 20,
      paddingHorizontal: 20
  },
  historyTextCon: {
      marginBottom: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
  },
  historyText: {
      color: NEUTRAL.dark_gray,
      fontFamily: 'Roboto-Medium',
      fontSize: 24
  },
  calenderContainer: {
      borderWidth: 2,
      borderColor: DARK_THEME.bark_blue,
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 15,
      alignItems: "center"
  },
  calenderContainerText: {
      fontFamily: 'Roboto-Regular',
      fontSize: 14,
      color: NEUTRAL.darker_gray
  },
  computerButton: {
    backgroundColor: DARK_THEME.bark_blue,
    paddingVertical: 13,
    paddingLeft: 20,
    marginBottom: 20
  }
})