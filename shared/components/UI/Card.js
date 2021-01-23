import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    elevation: 5,
    borderRadius: 10,
    shadowRadius: 8,
  },
});

export default Card;
