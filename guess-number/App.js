import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/core/Header";

import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import Loading from "./shared/components/Loading";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRound] = useState(0);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading finish={() => setLoading(false)} />;
  }

  const configureGameHandler = () => {
    setGuessRound(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRound(numOfRounds);
  };

  let content = <StartScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOver
        totalRounds={guessRounds}
        userNumber={userNumber}
        restart={configureGameHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
