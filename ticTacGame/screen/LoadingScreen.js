import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-native-progress/Bar';
import { DARK_THEME, NEUTRAL } from '../common/color'
import Refresh from "../common/image/Refresh"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../context/LoginProvider'

const LoadingScreen = ({navigation}) => {

    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState('Connecting to the Server');
    const [showBar, setShowBar] = useState(true)
    const { setIsLoggedIn, setProfile, profile } = useLogin();

    const fetch = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        let response = await axios.get("http://192.168.1.36:5678/auth/auth-user", {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })

        let data = await response.data
        if(data.success){
          navigation.navigate("Home")
          setProfile(data.user);
          console.log(profile);
        }else{
          await AsyncStorage.removeItem('token')
          navigation.navigate("register")
        }
      } catch (error) {
        console.log(error);
        setProgressText('Internet Connection Unavailable');
        setShowBar(false)
      }
    }

    useEffect(() => {
      if (progress >= 1) return;

      const progressTimer = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.25;
          if (newProgress >= 1) {
            clearInterval(progressTimer);
          }
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(progressTimer);
    }, [progress]);
    
    useEffect(() => {
      if (progress >= 0 && progress < 0.25) {
        setProgressText('Connecting to the Server');
      } else if (progress >= 0.25 && progress < 0.5) {
        setProgressText('Establishing a Secure Connection');
      } else if (progress >= 0.5 && progress < 0.75) {
        setProgressText('Checking for an Account');
      } else if (progress >= 0.75 && progress <= 1) {
        setProgressText('Done!');
        fetch()
      }
    }, [progress]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: DARK_THEME.dark, position: "relative" }}>
      <Text style={styles.loadingText}>{progressText}</Text>
      {showBar ? <ProgressBar
        progress={progress}
        width={200}
        color="#3399FF"
        height={10}
        borderRadius={5}
        borderWidth={0}
      />
       : 
      (<TouchableOpacity style={styles.refresh} onPress={fetch}>
        <Refresh />
        <Text style={styles.refreshText}>Try Again</Text>
      </TouchableOpacity>)}
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
  loadingText: {
      color: NEUTRAL.gray,
      fontFamily: "Roboto-Regular",
      fontSize: 14,
      marginBottom: 20
  },
  refresh: {
    position: "absolute",
    bottom: 30,
    borderWidth: 2,
    borderColor: NEUTRAL.dark_gray,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    flexDirection: 'row',
    paddingVertical: 12
  },
  refreshText: {
    color: NEUTRAL.dark_gray,
    fontSize: 14,
    fontFamily: "Roboto-Medium"
  }
})