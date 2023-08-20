import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import Styles from '../styles/Styles';

const Result = ({navigation, route}) => {
  const score = route.params.score;
  return (
    <View style={[Styles.container]}>
      <View>
        <Text style={styles.title}>Result</Text>
      </View>
      <View>
        <Text style={styles.title}>{score}%</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={score >= 40 ? require('../assets/winner.png') : require('../assets/failure.png')}
         style={styles.img}
         resizeMode='contain'/>
      </View>
      <View style={styles.btnOption}>
        <TouchableOpacity onPress={()=> {navigation.navigate("Home")}}>
          <Text style={styles.btn}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
  title:{
    textAlign: "center",
    marginVertical: 30,
    color: '#e5e5e5',
    fontSize: 40,
  },
  img:{
    width: 400,
    height: 400,
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btn:{
    backgroundColor: "#fca311",
    color: '#000',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
  }
})