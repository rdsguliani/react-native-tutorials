import React from "react";

import { View, StyleSheet, FlatList, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../shared/components/UI/HeaderButton";
import Colors from "../../shared/constants/Colors";

import { selectedProduct } from "../../store/actions/products";
import { isAndroid } from "../../utils/Platforms";
import { addToCart } from "./../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);

  const onAddToCart = (itemDetails) => {
    dispatch(addToCart(itemDetails));
  };

  const onSelectHandler = (itemDetails) => {
    dispatch(selectedProduct(itemDetails.id));

    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        title: itemDetails.title,
      },
    });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => onSelectHandler(itemData.item)}
          >
            <Button
              title="View Details"
              onPress={() => onSelectHandler(itemData.item)}
              color={Colors.primary}
            />
            <Button
              title={"Add To Cart"}
              onPress={() => onAddToCart(itemData.item)}
              color={Colors.primary}
            />
          </ProductItem>
        )}
        style={styles.list}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (props) => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="cart"
          iconName={isAndroid() ? "md-cart" : "ios-cart"}
          onPress={() => props.navigation.navigate("Cart")}
        ></Item>
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName={isAndroid() ? "md-menu" : "ios-menu"}
          onPress={() => props.navigation.toggleDrawer()}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {},
  list: {
    borderRadius: 10,
  },
});

export default ProductsOverviewScreen;
