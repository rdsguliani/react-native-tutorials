import React from "react";

import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";

import CategoryGridTile from "./../components/CategoryGridTile";

import Colors from "./../constants/Colors";

import { CATEGORIES } from "./../data/dummy-data";

const CategoriesScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "CategoryMeals",
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList
      numColumns={2}
      renderItem={renderGridItem}
      data={CATEGORIES}
      keyExtractor={(item, index) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

CategoriesScreen.navigationOptions = (screenProps) => ({
  headerTitle: "Meal Categories",
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

export default CategoriesScreen;
