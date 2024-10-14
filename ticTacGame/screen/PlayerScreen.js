import { Alert, Button, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { DARK_THEME, LIGHT_THEME, NEUTRAL } from '../common/color'
import Search from "../common/image/Search"
import { useLogin } from '../context/LoginProvider'

const PlayerScreen = ({ navigation }) => {
  const {onlineUsers, declineMsg, modalVisible, declineVisible, handleInvite, handleCancel, handleAccept, setModalVisible, setDeclineVisible} = useLogin()

  const showOnlineUser = (item) => {
      const {inGame, userName, userId} = item.item      
      
      return (
        <View style={styles.userCon}>
          <View style={styles.userCol}>
            <Text style={styles.userColTextName}>{userName}</Text>
            <View style={styles.userOnline}>
              <View style={[styles.userOnlineCircle, {backgroundColor: inGame ? LIGHT_THEME.red : LIGHT_THEME.green }]}></View>
              <Text style={styles.userOnlineText}>{inGame ? "Playing" : "Online"}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.userBtn} onPress={() => handleInvite(userId)} >
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
              keyExtractor={item => item.userId}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={[styles.centeredView, {justifyContent: 'center', alignItems: 'center', marginTop: 22}]}>
            <View style={[styles.modalView, {margin: 20, borderRadius: 20, padding: 20,}]}>
              <Text style={styles.modalText}>Game Invitation!</Text>
              <Text>You are invited to a game </Text>
              <Text>By <Text style={styles.modalTextName}>James Mike</Text></Text>
              
              <View style={styles.modalBtn}>
                <TouchableOpacity onPress={handleCancel}
                  style={[styles.modalbutton, styles.modalbuttonClose]}>
                  <Text style={styles.modaltextStyle}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAccept}
                  style={[styles.modalbutton, styles.modalbuttonAccept]}>
                  <Text style={[styles.modaltextStyle, styles.modalAcceptTextStyle,]}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={declineVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setDeclineVisible(!modalVisible);
          }}>
          <View style={[styles.centeredView, {margin: 0}]}>
            <View style={[styles.modalView, { padding: 10}]}>
              <Text>{declineMsg}</Text>
            </View>
          </View>
        </Modal>
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
  },
  centeredView: {
    flex: 1
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtn: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  modalbutton: {
    width: "45%",
    borderRadius: 20,
    padding: 10,
  },
  modaltextStyle: {
    textAlign: "center"
  },
  modalbuttonAccept: {
    backgroundColor: NEUTRAL.dark_gray,
    elevation: 2,
  },
  modalbuttonClose: {
    borderColor: NEUTRAL.dark_gray,
    borderWidth: 1,
    borderStyle: "solid"
  },
  modalAcceptTextStyle: {
    color: "#fff"
  },
  modalText: {
    textTransform: "uppercase",
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 4
  },
  modalTextName: {
    color: NEUTRAL.black,
    fontFamily: 'Roboto-Bold',
  }
})