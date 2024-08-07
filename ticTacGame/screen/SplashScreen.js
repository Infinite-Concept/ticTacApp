import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Logo from '../common/image/logo.js'
import { DARK_THEME } from '../common/color'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

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
    <View style={styles.home}>
      <StatusBar hidden />
      <Logo />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DARK_THEME.dark
  }
})