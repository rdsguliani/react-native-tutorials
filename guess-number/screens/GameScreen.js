import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Keyboard,
  ScrollView,
} from "react-native";
import Card from "../shared/components/Card";
import NumberContainer from "./../shared/components/NumberContainer";

import Colors from "../constants/color";
import BodyText from "../shared/components/BodyText";
import MainButton from "../shared/components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessList, setGuessList] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess == userChoice) {
      onGameOver(guessList.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const guessNext = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie !!", "You know that is wrong...", [
        { text: "sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") currentHigh.current = currentGuess;
    else currentLow.current = currentGuess + 1;

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setGuessList((currentValue) => currentValue + 1);
    setGuessList((oldGuessList) => [nextNumber, ...oldGuessList]);
  };

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>

      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => guessNext("lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => guessNext("greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {guessList.map((guess, index) => {
            return (
              <View style={styles.listItem}>
                <BodyText>#{guessList.length - index}</BodyText>
                <BodyText>{guess}</BodyText>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
  list: {
    flex: 1,
    width: "80%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    borderStyle: "dotted",
    marginVertical: 10,
    backgroundColor: "white",
  },
});

export default GameScreen;
