import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import Logo from '../common/image/logo.js'
import Google from '../common/image/Google.js'
import Facebook from '../common/image/Facebook.js'
import { DARK_THEME, NEUTRAL } from '../common/color'
import LoadingScreen from './LoadingScreen.js'
import ErrorScreen from './ErrorScreen.js'


const RegisterScreen = ({ navigation }) => {


  const userInfo = {
    name: "Stefan Jovanovic"
  }

  return (
    <ScrollView style={styles.registerScreen}>
      <View style={{flex: 1, paddingTop: 130, alignItems: "center"}}>
        <View style={styles.partOne}>
          <Logo />
          <Text style={styles.registerText}>Welcome</Text>
          <Text style={styles.registerDesc}>Please sign in to continue.</Text>
        </View>

        <View style={styles.registerAuth}>
          <TouchableOpacity style={styles.authPart}>
              <Google />
              <Text style={styles.authText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.authPart} onPress={() => navigation.navigate('Home', { screen: 'LoggedIn' })}>
              <Facebook />
              <Text style={styles.authText}>Sign in with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} >
              <Text style={[styles.authText, {textAlign: "center"}]}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    registerScreen: {
        flex: 1,
        backgroundColor: DARK_THEME.dark,
        // height: 900
    },
    partOne: {
        // top: 150
        position: "relative"
    },
    registerText: {
        color: NEUTRAL.gray,
        fontFamily: "Roboto-Medium",
        fontSize: 24,
        textAlign: "center",
        marginTop: 50
    },
    registerDesc: {
        textAlign: "center",
        marginTop: 10,
        color: NEUTRAL.darker_gray,
        fontSize: 16
    },
    registerAuth: {
        marginTop: 70,
        width: "100%",
        paddingHorizontal: 30,
        gap: 20
    },
    authPart: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        alignItems: "center",
        borderWidth: 2,
        borderColor: NEUTRAL.darker_gray,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    authText: {
        color: NEUTRAL.gray,
        fontSize: 16
    }
})