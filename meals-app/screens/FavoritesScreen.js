import React from "react";

import { StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import MealList from "../components/MealList";
import Meal from "../models/Meal";

import { MEALS } from "./../data/dummy-data";

const FavoritesScreen = (props) => {
  const favMeals = MEALS.filter((meal) => meal.id === "m1" || meal.id === "m2");

  const navigateToDetails = (id) => {
    props.navigation.navigate({
      routeName: "MealDetail",
      params: {
        mealId: id,
      },
    });
  };

  return <MealList listData={favMeals} navigateToDetails={navigateToDetails} />;
};

FavoritesScreen.navigationOptions = (screenProps) => ({
  headerTitle: "Your Favorites",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Fav"
        iconName="ios-menu"
        onPress={() => screenProps.navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
});

export default FavoritesScreen;
