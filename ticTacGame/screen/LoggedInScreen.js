import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DARK_THEME, LIGHT_THEME, NEUTRAL } from '../common/color'
import { useLogin } from "../context/LoginProvider"
import {useFetchHistoryEffect, useFetchHistory} from '../libs/History/History'
import moment from 'moment'

const LoggedInScreen = ({ navigation }) => {
  const{profile} = useLogin()
  const[history, setHistory] = useState([])
  const[historyBoard, setHistoryBoard] = useState([])

  useFetchHistoryEffect(profile, setHistory)
  useFetchHistory(profile, setHistoryBoard)

  const showHistory = (item) => {
    const{date, playerTwoName, scored} = item.item

    const getColor = () => {
      if(scored == 'won'){
          return LIGHT_THEME.green
      }else if(scored == 'lost'){
          return LIGHT_THEME.red
      }else{
          return NEUTRAL.gray
      }
    }
    return (
      <View style={styles.historyItem}>
          <View style={styles.historyItemSec1}>
              <Text style={styles.historyItemText1}>{playerTwoName}</Text>
              <Text style={styles.historyItemText2}>{moment(date).format('DD.MM.YYYY')}</Text>
          </View>

          <Text style={[styles.historyItemText3, {color: getColor()}]}>{scored}</Text>
      </View>
    ) 
  }

  const userInfo = null
  return (
    <ScrollView style={styles.loggedIn}>
      <View style={styles.userLogged}>
        <Text style={styles.userText}>Welcome</Text>
        <Text style={styles.userText2}>{profile.userName}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statsPart}>
          <Text style={styles.statsNum}>{history.wins}</Text>
          <Text style={styles.statsText}>wins</Text>
        </View>

        <View style={styles.statsPart2}></View>

        <View style={styles.statsPart}>
          <Text style={styles.statsNum}>{history.losses}</Text>
          <Text style={styles.statsText}>losses</Text>
        </View>

        <View style={styles.statsPart2}></View>

        <View style={styles.statsPart}>
          <Text style={styles.statsNum}>{history.draws}</Text>
          <Text style={styles.statsText}>Draws</Text>
        </View>

      </View>

      <View style={styles.history}>
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Text style={[styles.userText, styles.historyText]}>Game History</Text>
        </TouchableOpacity>
        <View style={styles.historyBoard}>
          {historyBoard || historyBoard.length == 0 ? (
            <FlatList
              data={historyBoard}
              keyExtractor={item => item.id}
              renderItem={showHistory}
              contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
            />
          ) : (
            <View style={styles.emptyHistory}>
              <Text style={styles.emptyHistoryA}>Empty</Text>
              <Text style={styles.emptyHistoryB}>Play some game.</Text>
            </View>
          ) }
        </View>
      </View>

      <View style={styles.history}>
        <TouchableOpacity onPress={() => navigation.navigate('Scoreboard')} >
          <Text style={[styles.userText, styles.historyText]}>Scoreboard</Text>
        </TouchableOpacity>
        <View style={styles.historyBoard}>
          {userInfo == null ? (
            <View style={styles.emptyHistory}>
              <Text style={styles.emptyHistoryA}>Empty</Text>
              <Text style={styles.emptyHistoryB}>Start playing folks.</Text>
            </View>
          ) : (
            <View>
              <Text>There is data</Text>
            </View>
          ) }
        </View>
      </View>

    </ScrollView>
  )
}

export default LoggedInScreen

const styles = StyleSheet.create({
  loggedIn: {
    flex: 1,
    backgroundColor: DARK_THEME.dark,
    paddingHorizontal: 25
  },
  userLogged: {
    justifyContent: "center",
    marginTop: 30
  },
  userText: {
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    color: NEUTRAL.gray
  },
  userText2: {
    fontSize: 24,
    fontFamily: "Roboto-Bold",
    textAlign: "center",
    marginBottom: 5,
    color: NEUTRAL.gray,
    textTransform: "capitalize"
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30
  },
  statsPart: {
    flexDirection: "column",
    gap: 5,
    alignItems: "center"
  },
  statsNum: {
    fontSize: 26,
    color: NEUTRAL.gray,
    fontFamily: "Roboto-Bold"
  },
  statsText: {
    fontSize: 16,
    color: NEUTRAL.darker_gray,
    textTransform: "capitalize"
  },
  statsPart2: {
    borderRightColor: NEUTRAL.darkest_gray,
    borderRightWidth: 2,
    height: 30
  },
  history:{
    paddingTop: 20
  },
  historyText: {
    textAlign: "left",
    marginBottom: 10
  },
  historyBoard: {
    height: 185,
    backgroundColor: DARK_THEME.barker_blue,
    borderRadius: 10
  },
  emptyHistory: {
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
  },
  emptyHistoryA: {
    fontSize: 16,
    color: NEUTRAL.gray,
    fontFamily: "Roboto-Regular"
  },
  emptyHistoryB: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    color: NEUTRAL.darker_gray
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    alignItems: "center"
  },
  historyItemSec1: {
    gap: 3
  },
  historyItemText1: {
    color: NEUTRAL.gray,
    fontSize: 14,
    fontFamily: "Roboto-Medium"
  },
  historyItemText2: {
    fontSize: 12,
    color: NEUTRAL.dark_gray,
    fontFamily: "Roboto-Regular"
  },
  historyItemText3: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: "Roboto-Bold"
  }
})