import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { DARK_THEME, NEUTRAL } from '../common/color'
import { useLogin } from "../context/LoginProvider"
import {useFetchHistoryEffect} from '../libs/History/History'

const LoggedInScreen = ({ navigation }) => {
  const{profile, history, setHistory} = useLogin()

  useFetchHistoryEffect(profile, setHistory)


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
          {userInfo == null ? (
            <View style={styles.emptyHistory}>
              <Text style={styles.emptyHistoryA}>Empty</Text>
              <Text style={styles.emptyHistoryB}>Play some game.</Text>
            </View>
          ) : (
            <View>
              <Text>There is data</Text>
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
    fontFamily: "Roboto-Regular",
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
    height: 130,
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
  }
})