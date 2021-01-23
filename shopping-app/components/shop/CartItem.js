import React from "react";

import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import DefaultText from "../../shared/components/UI/DefaultText";
import Colors from "../../shared/constants/Colors";
import { isAndroid, touchableComponent } from "../../utils/Platforms";
import BoldText from "../../shared/components/UI/BoldText";

const CartItem = (props) => {
  const { quantity, title, amount, onRemove, deletable } = props;
  const TouchableComponent = touchableComponent();

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <DefaultText style={styles.quantity}>{quantity} </DefaultText>
        <BoldText style={styles.mainText}>{title} </BoldText>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{amount.toFixed(2)}</Text>
        {deletable && (
          <TouchableComponent onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={isAndroid() ? "md-trash" : "ios-trash"}
              size={25}
              color={Colors.red}
            />
          </TouchableComponent>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    color: Colors.grey,
  },
  mainText: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default CartItem;
