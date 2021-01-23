import React from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import Order from "../../models/order";
import DefaultText from "../../shared/components/UI/DefaultText";
import CustomHeaderButton from "../../shared/components/UI/HeaderButton";
import { isAndroid } from "../../utils/Platforms";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <View style={styles.screen}>
        <DefaultText>No Orders !</DefaultText>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <OrderItem
            date={itemData.item.readableDate}
            amount={itemData.item.totalAmount}
            items={itemData.item.items}
          />
        )}
      />
    </View>
  );
};

OrdersScreen.navigationOptions = (screenProps) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName={isAndroid() ? "md-menu" : "ios-menu"}
          onPress={() => screenProps.navigation.toggleDrawer()}
        ></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
});

export default OrdersScreen;
