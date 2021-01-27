import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import Order from "../../models/order";
import DefaultText from "../../shared/components/UI/DefaultText";
import CustomHeaderButton from "../../shared/components/UI/HeaderButton";
import Colors from "../../shared/constants/Colors";
import { fetchOrders } from "../../store/actions/orders";
import { isAndroid } from "../../utils/Platforms";

const OrdersScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    setIsLoading(true);
    const loadOrders = async () => {
      await dispatch(fetchOrders());
      setIsLoading(false);
    };
    loadOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <View style={styles.screen}>
        <DefaultText>No Orders !</DefaultText>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
