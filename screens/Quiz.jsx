import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Styles from '../styles/Styles';

const Quiz = ({navigation}) => {
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const getQuestions = async () => {
    try {
      setIsLoaded(true);
      const response = await fetch('https://opentdb.com/api.php?amount=20&type=multiple&encode=url3986');
      const data = await response.json();
      setQuestions(data.results);
      setOptions(generateOptions(data.results[0]));
      setIsLoaded(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);


  const generateOptions = (indexQuestion) => {
    const options = indexQuestion.incorrect_answers;
    options.push(indexQuestion.correct_answer);
    shuffleArray(options);
    return options;
  };

  const handleNextQuestion = () => {
    if(currentQuestion < questions.length - 1){
      setCurrentQuestion(currentQuestion + 1);
      setOptions(generateOptions(questions[currentQuestion+1]));
    } else {
      navigation.navigate("Result", {score: score});
    }
  };
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleAnswer = (option) => {
    if(option === decodeURIComponent(questions[currentQuestion].correct_answer)){
      setScore(score + 10);
    }
    handleNextQuestion();
  };

  const handleOnSkip = () => {
    handleNextQuestion();
  };

  const handleOnQuit = () => {
    navigation.navigate("Result", {score: score});
  };
  
  return (
    <View style={[Styles.container]}>
      {isLoaded ? 
      <View>
        <Text style={styles.loading}>Loading...</Text>
      </View> : questions &&
      <View style={[Styles.container]}>
        <View>
          <Text style={styles.question}>Q. {decodeURIComponent(questions[currentQuestion].question)} </Text>
        </View>
        <View style={styles.optionBar}>
          <TouchableOpacity onPress={()=> {handleAnswer(decodeURIComponent(options[0]))}}>
            <Text style={styles.option}>{decodeURIComponent(options[0])}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {handleAnswer(decodeURIComponent(options[1]))}}>
            <Text style={styles.option}>{decodeURIComponent(options[1])}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {handleAnswer(decodeURIComponent(options[2]))}}>
            <Text style={styles.option}>{decodeURIComponent(options[2])}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {handleAnswer(decodeURIComponent(options[3]))}}>
            <Text style={styles.option}>{decodeURIComponent(options[3])}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnOption}>
          <TouchableOpacity onPress={()=>{handleOnSkip()}}>
            <Text style={styles.btn}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{handleOnQuit()}}>
            <Text style={styles.btn}>Quit</Text>
          </TouchableOpacity>
        </View>
      </View>}
    </View>
  )
}

export default Quiz

const styles = StyleSheet.create({
  question:{
    marginHorizontal: 3,
    textAlign: "center",
    marginVertical: 50,
    color: '#e5e5e5',
    fontSize: 30,
  },
  optionBar:{
    marginTop: 50,
    flex: 1,
  },
  option:{
    paddingVertical: 20,
    paddingHorizontal: 20,
    color: '#caf0f8',
    backgroundColor: "#023e8a",
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnOption:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    alignItems: "center",
    marginBottom: 50,
  },
  btn:{
    backgroundColor: "#fca311",
    color: '#000',
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  loading:{
    color: '#fff',
    fontSize: 50,
    height: "100%",
    textAlign: "center",
    marginVertical: 400,
  }
})