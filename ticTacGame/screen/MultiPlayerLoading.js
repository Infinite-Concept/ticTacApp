import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { DARK_THEME, NEUTRAL } from '../common/color'
import { StatusBar } from 'expo-status-bar';
import { WEB_SOCKET_URL } from '../env';

const { width: screenWidth } = Dimensions.get('window');

const ResponsiveView = () => {
    return <View style={styles.item} />;
};

const MultiPlayerLoading = ({navigation, route }) => {

    const { inviterId, inviteeId } = route.params;

    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('MultiPlayer', {
            inviterId: inviterId,
            inviteeId: inviteeId
          }); 
      }, 3000); 
  
      return () => clearTimeout(timer);
    }, []);

  return (
    <View style={styles.GameBoard}>
        <StatusBar hidden />
      <View style={styles.GameBoardContainer}>
        <Text style={styles.GameBoardText}>Loading</Text>

        <View style={styles.GameBoardPad}>
            <View style={styles.GameBoardrow}>
                <ResponsiveView />
                <ResponsiveView />
                <ResponsiveView />
            </View>
            <View style={styles.GameBoardrow}>
                <ResponsiveView />
                <ResponsiveView />
                <ResponsiveView />
            </View>
            <View style={styles.GameBoardrow}>
                <ResponsiveView />
                <ResponsiveView />
                <ResponsiveView />
            </View>
        </View>
      </View>
    </View>
  )
}

export default MultiPlayerLoading

const styles = StyleSheet.create({
    GameBoard: {
        flex: 1,
        backgroundColor: DARK_THEME.dark
    },
    GameBoardContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 50
    },
    GameBoardText: {
        fontSize: 24,
        fontFamily: "Roboto-Medium",
        color: NEUTRAL.darker_gray
    },
    GameBoardrow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    item: {
        width: screenWidth / 3 - 35,
        height: 80,
        backgroundColor: DARK_THEME.bark_blue,
        marginHorizontal: 10,
    },
    GameBoardPad: {
        gap: 20,
        marginTop: 30
    }
})