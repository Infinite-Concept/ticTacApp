import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Logo from '../common/image/logo.js'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider.js';

const SplashScreen = ({ navigation }) => {

  const{mode} = useLogin()

  useEffect(() => {
    const change = async () => {
        try {
          const value = await AsyncStorage.getItem('@has_seen_onboarding');
          const token = await AsyncStorage.getItem('token');
          const timer = setTimeout(() => {
            if(value){
              if(token){
                navigation.navigate("LoginLoading")
              }else{
                navigation.navigate("register")
              }
            }else{
              navigation.replace('Onboarding'); 
            }
          }, 3000); 

          return () => clearTimeout(timer);
        } catch (error) {
          
        }
    }
    change()
  }, []);

  return (
    <View style={[styles.home, {backgroundColor: mode.white}]}>
      <StatusBar hidden />
      <Logo color={mode.black} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})