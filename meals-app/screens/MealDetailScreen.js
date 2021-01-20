import React, { useCallback, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
import CustomHeaderButton from "../components/HeaderButton";
import { ADD_TO_FAVORITE, toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const dispatch = useDispatch();
  const availableMeals = useSelector((state) => state.meals.meals);

  const mealId = props.navigation.getParam("mealId");
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const currentFavoriteMeals = useSelector((state) => {
    return state.meals.favoritesMeals.some((meal) => meal.id === mealId);
  });

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [mealId]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentFavoriteMeals });
  }, [currentFavoriteMeals]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>

      {selectedMeal.ingredients.map((ingredient, index) => {
        return (
          <ListItem key={ingredient}>
            {index + 1}. {ingredient}{" "}
          </ListItem>
        );
      })}

      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step, index) => {
        return (
          <ListItem key={step}>
            {index + 1}. {step}{" "}
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (screenProps) => {
  const mealTitle = screenProps.navigation.getParam("mealTitle");
  const isFav = screenProps.navigation.getParam("isFav");
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Fav"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={screenProps.navigation.getParam("toggleFav")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: { width: "100%", height: 200 },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    fontSize: 22,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
