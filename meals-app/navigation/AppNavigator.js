import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

import Colors from "./../constants/Colors";
import FiltersScreen from "../screens/FiltersScreen";

const navigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen,
  },
  {
    initialRouteName: "Categories",
    defaultNavigationOptions: { ...navigationOptions },
  }
);

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    initialRouteName: "Favorites",
    defaultNavigationOptions: { ...navigationOptions },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        tabBarLabel: "Favorites !",
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontFamily: "open-sans",
      },
      activeTintColor: Colors.accent,
    },
  }
);

const FilterNavigator = createStackNavigator(
  {
    Filter: FiltersScreen,
  },
  {
    navigationOptions: { drawerLabel: "Filters!!" },
    defaultNavigationOptions: { ...navigationOptions },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: TabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FilterNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accent,
    },
  }
);

export default createAppContainer(MainNavigator);
