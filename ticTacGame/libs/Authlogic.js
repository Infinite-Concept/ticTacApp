import { Alert } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { envValue } from '../env';

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const handleRegister = async (ErrorMessage, emailValue, passwordValue, confirmPasswordValue, userNameValue, SignIn) => {
  ErrorMessage('');
  console.log("hello world");
    let email = emailValue.trim()
    let password = passwordValue.trim()
    let confirmPassword = confirmPasswordValue.trim()
    let userName = userNameValue.trim()

  if( userName === "" && email === "" && password === ""){
      ErrorMessage('All field is required');
      return
  }

  if(!validateEmail(email)) {
      ErrorMessage('Invalid email address');
      return;
  }

  if(password.length < 6) {
      ErrorMessage('Password must be at least 6 characters long');
      return;
  }

  if(userName.length < 3) {
    ErrorMessage('User name must be at least 3 characters long');
    return;
  }

  if(password !== confirmPassword) {
      ErrorMessage('Passwords do not match');
      return;
  }

  try {
    const response = await axios.post(`${envValue}/auth/register`, {
      email, password, userName
    })

    const data = await response.data

    if(data.success){
      return Alert.alert( data.message, 'You have successfully registered! \n Proceed to Login', [
        {
          text: "Login",
          onPress: SignIn
        }
      ])
    }

    Alert.alert( data.message)
    
  } catch (error) {
    console.log(error);
    ErrorMessage('Registration failed. Please try again.');
  }
    
}

export const handleLogin = async (ErrorMessage, emailValue, passwordValue, navigation, ) => {
    ErrorMessage('');

    let email = emailValue.trim()
    let password = passwordValue.trim() 


    if(email === "" && password === ""){
        ErrorMessage('All field is required');
        return
    }

    if(!validateEmail(email)) {
        ErrorMessage('Invalid email format');
        return;
    }

    if(password.length < 6) {
        ErrorMessage('Password must be at least 6 characters long');
        return;
    }

    try {
      const response = await axios.post(`${envValue}/auth/login`, {
        email, password
      })

      const data = await response.data

      if(data.success == false){
        Alert.alert(data.message)
        return
      }
      
      await AsyncStorage.setItem('token', data.token);
      navigation.navigate('LoginLoading')
      
    } catch (error) {
      console.error(error);
      ErrorMessage('Login failed. Please try again.');
    }     
}