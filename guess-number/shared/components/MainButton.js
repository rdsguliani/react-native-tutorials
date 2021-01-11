import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import color from "./../../constants/color";

import Colors from "./../../constants/color";

const MainButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonTxt}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonTxt: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "white",
  },
});

export default MainButton;
