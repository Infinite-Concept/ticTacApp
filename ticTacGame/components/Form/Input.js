import { StyleSheet, TextInput, View, Dimensions } from 'react-native'
import React from 'react'
import { useLogin } from '../../context/LoginProvider'

const width = Dimensions.get("window").width

const Input = ({place, value, onChange, children, keyboardType, secureTextEntry}) => {
  const{mode} = useLogin()

  return (
    <View style={[styles.input_group, {borderColor: mode.secondary} ]}>
        {children}
      <TextInput placeholder={place} style={[styles.input, {color: mode.secondary}]} placeholderTextColor={mode.secondary} onChangeText={onChange} value={value} keyboardType={keyboardType} secureTextEntry={secureTextEntry}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    input_group: {
        borderWidth: 1,
        borderRadius: 18,
        alignItems: 'center',
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 15,
        gap: 20
    },
    input: {
        fontSize: 14,
    },
})