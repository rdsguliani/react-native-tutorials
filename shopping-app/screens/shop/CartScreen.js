import React, { useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import BoldText from "../../shared/components/UI/BoldText";
import Card from "../../shared/components/UI/Card";

import Colors from "../../shared/constants/Colors";
import { clearCart, removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const tranformItems = [];
    for (const key in state.cart.items) {
      tranformItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return tranformItems;
  });

  const onRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const addToOrder = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, totalAmount));
    await dispatch(clearCart());
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <BoldText style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount.toFixed(2)} </Text>
        </BoldText>
        {isLoading ? (
          <ActivityIndicator color={Colors.primary} size="small" />
        ) : (
          <Button
            title="Order now"
            color={Colors.accent}
            disabled={cartItems.length === 0}
            onPress={addToOrder}
          />
        )}
      </Card>
      <View>
        <FlatList
          data={cartItems}
          renderItem={(itemData) => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => onRemove(itemData.item.productId)}
            />
          )}
          keyExtractor={(item) => item.productId}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
