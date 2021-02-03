import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

import PlaceItem from "../components/PlaceItem";
import Colors from "../constants/Colors";
import { fetchPlaces } from "../store/actions/places";

const PlacesListScreen = (props) => {
  const dispatch = useDispatch();

  const places = useSelector((state) => state.places.places);

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

  const navigateToDetails = (title, id) => {
    props.navigation.navigate({
      routeName: "PlaceDetails",
      params: {
        title: title,
        placeId: id,
      },
    });
  };

  return (
    <FlatList
      style={styles.screen}
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.image}
          address={null}
          title={itemData.item.title}
          onSelect={navigateToDetails.bind(
            this,
            itemData.item.title,
            itemData.item.id
          )}
        ></PlaceItem>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

PlacesListScreen.navigationOptions = (props) => {
  return {
    headerTitle: "All Places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="add Place"
            iconName="ios-add"
            onPress={() => props.navigation.navigate("NewPlace")}
          ></Item>
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
});

export default PlacesListScreen;
