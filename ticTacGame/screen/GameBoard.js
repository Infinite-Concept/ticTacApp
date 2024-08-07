import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { DARK_THEME } from '../common/color';
import Computer from '../libs/computer/Computer';

const GameBoard = () => {

  return (
    <View style={styles.board}>
      <Computer />
    </View>
  )
}

export default GameBoard

const styles = StyleSheet.create({
  board: {
    backgroundColor: DARK_THEME.dark,
    flex: 1,
  }
});