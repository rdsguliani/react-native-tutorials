import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import Colors from "./../../shared/constants/Colors";

import { useDispatch, useSelector } from "react-redux";
import DefaultText from "../../shared/components/UI/DefaultText";
import { addToCart } from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../shared/components/UI/HeaderButton";
import { isAndroid } from "../../utils/Platforms";

const ProductsDetailScreen = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);

  const addProductToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <ScrollView>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.action}>
        <Button
          title={"Add to cart"}
          onPress={addProductToCart}
          color={Colors.primary}
        />
      </View>
      <DefaultText style={styles.price}>
        ${product.price.toFixed(2)}
      </DefaultText>
      <DefaultText style={styles.description}>
        {product.description}
      </DefaultText>
    </ScrollView>
  );
};

ProductsDetailScreen.navigationOptions = (screenProps) => {
  return {
    headerTitle: screenProps.navigation.getParam("title"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          iconName={isAndroid() ? "md-cart" : "ios-cart"}
          iconSize={25}
          onPress={() => screenProps.navigation.navigate("Cart")}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    color: Colors.grey,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductsDetailScreen;
