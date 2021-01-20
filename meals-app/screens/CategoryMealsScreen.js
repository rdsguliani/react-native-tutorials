import React from "react";

import {
  StyleSheet,
  View,
  Text,
  Button,
  Platform,
  FlatList,
} from "react-native";

import MealList from "../components/MealList";

import Colors from "./../constants/Colors";

import { CATEGORIES, MEALS } from "./../data/dummy-data";

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((item) => item.id === catId);

  // const renderMealItem = (itemData) => {
  //   return (
  //     <MealItem
  //       title={itemData.item.title}
  //       duration={itemData.item.duration}
  //       affordability={itemData.item.affordability}
  //       complexity={itemData.item.complexity}
  //       image={itemData.item.imageUrl}
  //       onSelectMeal={() => navigateToDetails(itemData.item.id)}
  //     />
  //   );
  // };

  const navigateToDetails = (id) => {
    props.navigation.navigate({
      routeName: "MealDetail",
      params: {
        mealId: id,
      },
    });
  };

  const displayMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  return (
    <MealList listData={displayMeals} navigateToDetails={navigateToDetails} />
  );
};

const styles = StyleSheet.create({});

CategoryMealsScreen.navigationOptions = (screenProps) => {
  const catId = screenProps.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((item) => item.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;
