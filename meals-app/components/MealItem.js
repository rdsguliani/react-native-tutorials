import React from "react";

import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import fetchFonts from "../shared/fonts/fonts";
import DefaultText from "./DefaultText";

const MealItem = (props) => {
  const {
    title,
    onSelectMeal,
    duration,
    complexity,
    affordability,
    image,
  } = props;
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <View style={styles.mealItem}>
      <TouchableCmp onPress={onSelectMeal}>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground source={{ uri: image }} style={styles.bgImage}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
          <DefaultText>{duration}m</DefaultText>
          <DefaultText>{complexity.toUpperCase()}</DefaultText>
          <DefaultText>{affordability.toUpperCase()}</DefaultText>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: "row",
  },
  mealItem: {
    height: 200,
    width: "95%",
    backgroundColor: "#f5f5f5",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});

export default MealItem;
