import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { DARK_THEME, NEUTRAL } from '../common/color'
import MessageIcon from "../common/image/MessageIcon"
import LockIcon from "../common/image/LockIcon"
import Input from '../components/Form/Input'
import BackArrow from "../common/image/BackArrow"
import {handleLogin, handleRegister} from "../libs/Authlogic"
import { useLogin } from '../context/LoginProvider'

const LoginScreen = ({ navigation }) => {
  const[signUp, setSignUp] = useState(false)
  const[signIn, setSignIn] = useState(true)
  // ========  form state 
  const[userName, setUserName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  // ======== end form state 
  const { setIsLoggedIn, setProfile, mode } = useLogin();

  const clear = () => {
      setErrorMessage('');
      setUserName('')
      setEmail('')
      setConfirmPassword('')
      setPassword('')
  }

  const showSignIn = () => {
      clear()
      setSignIn(true)
      setSignUp(false)
  }

  const showSignUp = () => {
      clear()
      setSignIn(false)
      setSignUp(true)
  }

  return (
    <ScrollView style={[styles.login, {backgroundColor: mode.white}]}>
        <View style={styles.loginContainer}>

          <TouchableOpacity activeOpacity={0.6} style={[styles.backBtn, {backgroundColor: mode.black}]} onPress={() => navigation.goBack()}>
            <BackArrow color={mode.white} />
          </TouchableOpacity>

            <View style={styles.header}>
                <Text style={[styles.headerTitle, {color: mode.black}]}>Welcome Back!</Text>
                <Text style={[styles.headerDesc, {color: mode.secondary}]}>You will get 7 days free trial on creating new account. Make sure you use correct informations</Text>
            </View>

            <View style={styles.authContainer}>
                <TouchableOpacity onPress={showSignIn} activeOpacity={0.6}>
                    <Text style={[styles.authText, {color: mode.secondary}]}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={showSignUp} activeOpacity={0.6}>
                    <Text style={[styles.authText, {color: mode.secondary}]}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.authen}>
            {
              signUp && (
                <View style={{gap: 15}}>
                  <Input place="Enter your username" value={userName} onChange={setUserName} keyboardType="default" secureTextEntry={false} >
                    <MessageIcon color={mode.secondary} />
                  </Input>

                  <Input place="Enter your email Address" value={email} onChange={setEmail} keyboardType="email-address" secureTextEntry={false} >
                    <MessageIcon color={mode.secondary} />
                  </Input>

                  <Input place="Choose password" value={password} onChange={setPassword} keyboardType="default" secureTextEntry={true}>
                    <LockIcon color={mode.secondary}/>
                  </Input>

                  <Input place="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} keyboardType="default" secureTextEntry={true} >
                    <LockIcon color={mode.secondary}/>
                  </Input>

                  {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                  <TouchableOpacity style={[styles.logIn, {backgroundColor: mode.lightBlue}]} onPress={() =>  handleRegister(setErrorMessage, email, password, confirmPassword, userName, showSignIn )} activeOpacity={0.6} >
                    <Text style={[styles.authenThirdText, {color: mode.white}]}>Register</Text>
                  </TouchableOpacity>
                </View>
              )
            }

            {
              signIn && (
                <View style={{gap: 15}}>
                  <Input place="Enter your email Address" value={email} onChange={setEmail} keyboardType="email-address" secureTextEntry={false}  >
                    <MessageIcon color={mode.secondary} />
                  </Input>

                  <Input place="Enter your password" value={password} onChange={setPassword} keyboardType="default" secureTextEntry={true} >
                    <LockIcon color={mode.secondary} />
                  </Input>

                  {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

                  <TouchableOpacity style={styles.forget} activeOpacity={0.6}>
                    <Text style={[styles.forgetText, {color: mode.black}]}>forget password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.logIn, {backgroundColor: mode.lightBlue}]} activeOpacity={0.6} onPress={ () => handleLogin(setErrorMessage, email, password, navigation )}>
                    <Text style={[styles.authenThirdText, {color: mode.white}]}>Login</Text>
                  </TouchableOpacity>
                </View>
              )
            }
            
          </View>
        </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    login: {
        flex: 1
    },
    loginContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    authContainer: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20
    },
    authText: {
        color: NEUTRAL.gray,
        fontFamily: "Roboto-Medium",
        fontSize: 16 
    },
    header: {
        alignItems: "center"
    },
    headerTitle: {
        fontFamily: 'Roboto-Bold',
        color: "#ffffff",
        fontSize: 24,
        marginBottom: 10
    },
    headerDesc: {
        color: "#8F8996",
        fontFamily: "Roboto-Medium",
        textAlign: "center",
        fontSize: 12
    },
    logIn: {
        borderRadius: 18,
        alignItems: "center",
        paddingVertical: 12
    },
    authenThirdText: {
        color: "#ffffff",
        fontFamily: 'Roboto-Bold',
        fontSize: 16
    },
    error: {
        fontFamily: "Roboto-Medium",
        fontSize: 12,
        color: "red",
    },
    forgetText: {
        color: "#fff",
        fontFamily: "Roboto-Medium",
        textDecorationLine: 'underline',
        textDecorationColor: "#fff",
        textDecorationStyle: "solid",
        textTransform: "capitalize",
        paddingVertical: 10
    },
    backBtn: {
      width: 30,
      height: 30,
      borderRadius: 100,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: DARK_THEME.blue,
      shadowRadius: 5,
      shadowOffset: 5,
      elevation: 5
    }
})