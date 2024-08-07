import { View, Text } from 'react-native'
import React from 'react'
import LoggedInScreen from '../../screen/LoggedInScreen';
import PlayerScreen from '../../screen/PlayerScreen';
import ProfileScreen from '../../screen/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Foundation, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { DARK_THEME } from '../../common/color';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={{flex: 1, backgroundColor: DARK_THEME.dark}}>
      <Tab.Navigator initialRouteName='LoggedIn' screenOptions={{ 
        tabBarStyle: {backgroundColor: DARK_THEME.bark_blue, margin: 15, borderRadius: 20, borderWidth: 0}, headerShown: false,
        tabBarLabel: () => null }} >
        <Tab.Screen name="LoggedIn" component={LoggedInScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <Foundation name="home" size={25} color={focused ? "#ADADAD" : "#12161F"} />
            )
          }}
        />
        <Tab.Screen name="Players" component={PlayerScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <MaterialIcons name="gamepad" size={25} color={focused ? "#ADADAD" : "#12161F"} />
            )
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} 
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesome5 name="user-friends" size={22} color={focused ? "#ADADAD" : "#12161F"} />
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default Home