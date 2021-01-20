import React from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { OPEN_SANS_BOLD } from "../shared/fonts/fonts";

const CategoryGridTile = (props) => {
  const { title, onSelect, color } = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21)
    TouchableCmp = TouchableNativeFeedback;

  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={onSelect}>
        <View style={{ ...styles.container, backgroundColor: color }}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    height: 150,
    margin: 15,
    overflow:
      Platform.OS === "andriod" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    elevation: 5,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
    fontFamily: OPEN_SANS_BOLD,
    textAlign: "right",
  },
});

export default CategoryGridTile;
