import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = () => {
  return (
    <View>
      <Text style={styles.title}>Quiza</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  title: {
    color: '#e5e5e5',
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
  }
})