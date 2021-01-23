import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlatList, StyleSheet, Button, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../shared/components/UI/HeaderButton";
import { isAndroid } from "../../utils/Platforms";
import Colors from "../../shared/constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductScreen = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.userProducts);

  const editProduct = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure!", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            title="Edit"
            onPress={() => editProduct(itemData.item.id)}
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => deleteHandler(itemData.item.id)}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = (props) => {
  return {
    headerTitle: "Your Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="add"
          iconName={isAndroid() ? "md-create" : "ios-create"}
          onPress={() => props.navigation.navigate("EditProduct")}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName={isAndroid() ? "md-menu" : "ios-menu"}
          onPress={() => props.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductScreen;
