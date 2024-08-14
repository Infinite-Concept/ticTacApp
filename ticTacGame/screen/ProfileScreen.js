import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DARK_THEME, NEUTRAL } from '../common/color'
import Search from "../common/image/Search"

const ProfileScreen = () => {
  return (
    <View style={styles.profileHome}>
      <View style={styles.profileHomeContainer}>
        <Text style={styles.historyText}>Friends</Text>
      </View>

      <TouchableOpacity style={styles.calenderContainer}>
        <Search />
        <TextInput style={styles.calenderContainerText} placeholder='Search Players' placeholderTextColor={NEUTRAL.darker_gray} />
      </TouchableOpacity>

    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileHome: {
    flex: 1,
    backgroundColor: DARK_THEME.dark,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  profileHomeContainer: {
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
})