import React from "react";

import { StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";

import CustomHeaderButton from "../components/HeaderButton";
import MealList from "../components/MealList";
import Meal from "../models/Meal";

const FavoritesScreen = (props) => {
  const favMeals = useSelector((state) => state.meals.favoritesMeals);

  const navigateToDetails = (item) => {
    props.navigation.navigate({
      routeName: "MealDetail",
      params: {
        mealId: item.id,
        mealTitle: item.title,
      },
    });
  };

  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>NO Favorite meals found. Start adding some!</DefaultText>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
