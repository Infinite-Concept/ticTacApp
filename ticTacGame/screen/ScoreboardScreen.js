import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { DARK_THEME, NEUTRAL } from '../common/color'
import Search from "../common/image/Search"
import BackArrow from "../common/image/BackArrow"
import { useNavigation } from '@react-navigation/native';

const ScoreboardScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.homeScreen}>
        <View style={styles.historyTextCon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackArrow />
            </TouchableOpacity>
            <Text style={styles.historyText}>Scoreboard</Text>
        </View>

        <TouchableOpacity style={styles.calenderContainer}>
            <Search />
            <TextInput style={styles.calenderContainerText} placeholder='Search Players' placeholderTextColor={NEUTRAL.darker_gray} />
        </TouchableOpacity>


        <ScrollView>

        </ScrollView>
    </View>
  )
}

export default ScoreboardScreen

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        backgroundColor: DARK_THEME.dark,
        paddingTop: 20,
        paddingHorizontal: 20
    },
    historyTextCon: {
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    historyText: {
        color: NEUTRAL.dark_gray,
        fontFamily: 'Roboto-Medium',
        fontSize: 24
    },
    calenderContainer: {
        borderWidth: 2,
        borderColor: DARK_THEME.bark_blue,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 15,
        alignItems: "center"
    },
    calenderContainerText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: NEUTRAL.darker_gray
    }
})