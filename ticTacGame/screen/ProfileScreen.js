import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DARK_THEME, NEUTRAL } from '../common/color'

const ProfileScreen = () => {
  return (
    <View style={styles.profileHome}>
      <View style={styles.profileHomeContainer}>
        <Text>ProfileScreen</Text>

        <View>
          
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileHome: {
    flex: 1,
    backgroundColor: DARK_THEME.dark,
  },
  profileHomeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  }
})