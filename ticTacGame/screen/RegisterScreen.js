import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import Logo from '../common/image/logo.js'
import Google from '../common/image/Google.js'
import Facebook from '../common/image/Facebook.js'
import { DARK_THEME, NEUTRAL } from '../common/color'
import LoadingScreen from './LoadingScreen.js'
import ErrorScreen from './ErrorScreen.js'
import { useLogin } from '../context/LoginProvider.js'


const RegisterScreen = ({ navigation }) => {
  const{mode} = useLogin()
  return (
    <ScrollView style={[styles.registerScreen, {backgroundColor: mode.white}]}>
      <View style={{flex: 1, paddingTop: 130, alignItems: "center"}}>
        <View style={styles.partOne}>
          <Logo color={mode.black} />
          <Text style={[styles.registerText, {color: mode.black}]}>Welcome</Text>
          <Text style={[styles.registerDesc, {color: mode.secondary}]}>Please sign in to continue.</Text>
        </View>

        <View style={styles.registerAuth}>
          <TouchableOpacity style={[styles.authPart, {borderColor: mode.secondary }]}>
              <Google />
              <Text style={[styles.authText, {color: mode.black}]}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.authPart, {borderColor: mode.secondary }]} onPress={() => navigation.navigate('Home', { screen: 'LoggedIn' })}>
              <Facebook />
              <Text style={[styles.authText, {color: mode.black}]}>Sign in with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} >
              <Text style={[styles.authText, {textAlign: "center", color: mode.black}]}>Create an Account</Text>
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
    },
    partOne: {
        position: "relative"
    },
    registerText: {
        fontFamily: "Roboto-Medium",
        fontSize: 24,
        textAlign: "center",
        marginTop: 50
    },
    registerDesc: {
        textAlign: "center",
        marginTop: 10,
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
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    authText: {
        fontSize: 16
    }
})