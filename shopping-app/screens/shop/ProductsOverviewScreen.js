import React, { useCallback, useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  Text,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import DefaultText from "../../shared/components/UI/DefaultText";
import CustomHeaderButton from "../../shared/components/UI/HeaderButton";
import Colors from "../../shared/constants/Colors";

import {
  fetchProducts,
  getProducts,
  selectedProduct,
} from "../../store/actions/products";
import { isAndroid } from "../../utils/Platforms";
import { addToCart } from "./../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const products = useSelector((state) => state.products.availableProducts);

  const loadingProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadingProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadingProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadingProducts]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <DefaultText>An error occured!</DefaultText>
        <Button
          title="Try again"
          onPress={loadingProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <DefaultText>No products found. Maybe start adding some !!</DefaultText>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadingProducts}
        refreshing={isRefreshing}
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
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    borderRadius: 10,
  },
});

export default ProductsOverviewScreen;
