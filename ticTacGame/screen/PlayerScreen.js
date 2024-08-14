import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DARK_THEME, LIGHT_THEME, NEUTRAL } from '../common/color'
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
      const {users} = JSON.parse(event.data);
      // const filteredUsers = users.filter(user => user.userId !== profile._id )
      setOnlineUsers(users)
    };
    
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    }; 

  }

  useEffect(() => {
    socketService()
    
  }, [])

  const showOnlineUser = (item) => {
      const {inGame, userName} = item.item
      
      return (
        <View style={styles.userCon}>
          <View style={styles.userCol}>
            <Text style={styles.userColTextName}>{userName}</Text>
            <View style={styles.userOnline}>
              <View style={[styles.userOnlineCircle, {backgroundColor: inGame ? LIGHT_THEME.red : LIGHT_THEME.green }]}></View>
              <Text style={styles.userOnlineText}>{inGame ? "Playing" : "Online"}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.userBtn}>
            <Text style={styles.userBtnText}>Invite</Text>
          </TouchableOpacity>
        </View>
      )
  }

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

        <View style={{paddingTop: 35}}>
          {
            onlineUsers.length > 0 ?
            <FlatList
              data={onlineUsers}
              keyExtractor={item => item.id}
              renderItem={showOnlineUser}
              contentContainerStyle={{gap: 20}}
            />
            :
            <View style={styles.noUsers}>
              <Text style={styles.noUsersText1}>No Players Online</Text>
              <Text style={styles.noUsersText2}>Please come again later.</Text>
            </View>
          }
        </View>
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
  },
  noUsers: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200
  },
  noUsersText1: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    color: NEUTRAL.gray
  },
  noUsersText2: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: NEUTRAL.dark_gray
  },
  userCon: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  userCol: {
    gap: 5
  },
  userColTextName: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: NEUTRAL.gray
  },
  userOnline: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  userOnlineCircle: {
    width: 10,
    height: 10,
    borderRadius: 150
  },
  userOnlineText: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: NEUTRAL.gray
  },
  userBtn: {
    borderColor: NEUTRAL.gray,
    borderWidth: 1,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 15
  },
  userBtnText: {
    fontSize: 12,
    fontFamily: "Roboto-Regular",
    color: NEUTRAL.gray
  }
})