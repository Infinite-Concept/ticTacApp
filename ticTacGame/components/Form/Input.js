import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import React from 'react'

const width = Dimensions.get("window").width

const Input = ({place, value, onChange, children, keyboardType, secureTextEntry}) => {
  return (
    <View style={styles.input_group}>
        {children}
      <TextInput placeholder={place} style={styles.input} placeholderTextColor="#8F8996" onChangeText={onChange} value={value} keyboardType={keyboardType} secureTextEntry={secureTextEntry}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    input_group: {
        borderWidth: 1,
        borderColor: "#6D6D6D",
        borderRadius: 18,
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 20
    },
    input: {
        fontSize: 14,
        color: "#8F8996",
    },
})