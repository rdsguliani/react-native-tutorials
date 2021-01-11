import React, { useState } from "react";

import { Button, Image, StyleSheet, Text, View } from "react-native";

import Colors from "../constants/color";
import BodyText from "../shared/components/BodyText";
import MainButton from "../shared/components/MainButton";
import TitleText from "../shared/components/TitleText";

const GameOver = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over !</TitleText>
      <View style={styles.imageContainer}>
        {/* <fade */}
        <Image
          // source={require("./../assets/success.png")}
          source={{
            uri:
              "https://image.shutterstock.com/image-photo/hand-touching-screen-icon-throw-600w-696395281.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed
          <Text style={styles.highlight}> {props.totalRounds} </Text>
          rounds to guess the number
          <Text style={styles.highlight}> {props.userNumber}</Text>.
        </BodyText>
      </View>

      <MainButton onPress={props.restart}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30,
    alignSelf: "center",
  },
  resultContainer: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  resultText: {
    textAlign: "center",
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});

export default GameOver;
