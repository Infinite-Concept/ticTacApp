import React, { useContext, useState, createContext, useEffect} from 'react'
import { DARK_MODE, LIGHT_MODE } from '../common/color'
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = createContext()

const LoginProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const[profile, setProfile] = useState([])
  const[mode, setMode] = useState(LIGHT_MODE)
  const[changeMode, setChangeMode] = useState(false)

  useEffect(() => {
    const loadMode = async () => {
      try {
        const storedMode = await AsyncStorage.getItem("mode")

        if(storedMode){
          const isDarkMode = storedTheme === "LIGHT_MODE";
          setMode( isDarkMode ? LIGHT_MODE : DARK_MODE)
        }
      } catch (error) {
        console.error("error getting mode", error);
        
      }
    }

    loadMode()
  }, [])

  const toggleMode = async () => {
    const newTheme = mode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE
    setMode(newTheme)
    try {
      await AsyncStorage.setItem("mode", newTheme === LIGHT_MODE ? "LIGHT_MODE" : "DARK_MODE")
    } catch (error) {
      console.error("unable to connect", error);
    }
  }

  return (
    <LoginContext.Provider  value={{ isLoggedIn, setIsLoggedIn, profile, setProfile, mode}}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider
