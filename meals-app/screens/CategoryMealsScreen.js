import React from "react";

import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

import MealList from "../components/MealList";

import Colors from "./../constants/Colors";

import { CATEGORIES } from "./../data/dummy-data";

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((item) => item.id === catId);
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const navigateToDetails = (item) => {
    props.navigation.navigate({
      routeName: "MealDetail",
      params: {
        mealId: item.id,
        mealTitle: item.title,
      },
    });
  };

  const displayMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>NO meals found. Check you filters!</DefaultText>
      </View>
    );
  }

  return (
    <MealList listData={displayMeals} navigateToDetails={navigateToDetails} />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

CategoryMealsScreen.navigationOptions = (screenProps) => {
  const catId = screenProps.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((item) => item.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;
