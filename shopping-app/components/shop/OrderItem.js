import React, { useState } from "react";

import { View, Text, Button, StyleSheet } from "react-native";
import BoldText from "../../shared/components/UI/BoldText";
import Card from "../../shared/components/UI/Card";
import DefaultText from "../../shared/components/UI/DefaultText";
import Colors from "./../../shared/constants/Colors";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const { date, amount } = props;
  const [showDetails, setShowDetials] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <BoldText style={styles.totalAmount}>$ {amount.toFixed(2)}</BoldText>
        <DefaultText style={styles.date}>{date}</DefaultText>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => setShowDetials((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.detialItem}>
          {props.items.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.productId}
                quantity={cartItem.quantity}
                amount={cartItem.sum}
                title={cartItem.productTitle}
              />
            );
          })}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 10,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: Colors.grey,
  },
  detialItem: {
    width: "100%",
  },
});

export default OrderItem;
