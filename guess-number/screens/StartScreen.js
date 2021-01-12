import React, { useState } from "react";

import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Keyboard,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import NumberContainer from "../shared/components/NumberContainer";
import Card from "../shared/components/Card";
import Input from "../shared/components/Input";

import Colors from "./../constants/color";
import BodyText from "../shared/components/BodyText";
import TitleText from "../shared/components/TitleText";
import MainButton from "./../shared/components/MainButton";

const StartScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  let confirmedOutput = null;

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <View style={styles.screen}>
          <TitleText style={styles.title}>Start a New Game!</TitleText>

          <Card style={styles.inputContainer}>
            <BodyText style={styles.text}>Select a Number</BodyText>
            <Input
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={numberInputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View>
                <Button
                  title="Reset"
                  color={Colors.accent}
                  onPress={resetInputHandler}
                />
              </View>
              <View>
                <Button
                  title="Confirm"
                  color={Colors.primary}
                  onPress={confirmInputHandler}
                />
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    width: 20,
    borderBottomWidth: 1,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    width: Dimensions.get("window").width < 500 ? "80%" : "60%",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartScreen;
