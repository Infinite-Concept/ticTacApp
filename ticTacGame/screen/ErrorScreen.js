import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Retry from "../common/image/Retry"
import { DARK_THEME, NEUTRAL } from '../common/color'

const ErrorScreen = () => {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorWrapper}>
        <Text style={styles.errorMainText}>Internet Connection Unavailable</Text>

        <TouchableOpacity style={styles.errorRetry}>
            <Retry />
            <Text style={styles.errorRetryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ErrorScreen

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        backgroundColor: DARK_THEME.dark
    },
    errorWrapper: {
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    errorMainText: {
        color: NEUTRAL.gray,
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        top: "40%"
    },
    errorRetry: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: NEUTRAL.gray,
        borderStyle: "solid",
        paddingVertical: 30,
        gap: 40
    },
    errorRetryText: {
        color: NEUTRAL.gray,
        fontFamily: "Roboto-Regular",
        fontSize: 14,
    }
})