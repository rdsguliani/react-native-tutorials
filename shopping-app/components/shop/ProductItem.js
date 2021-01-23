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
import BoldText from "../../shared/components/UI/BoldText";
import Card from "../../shared/components/UI/Card";

import DefaultText from "../../shared/components/UI/DefaultText";
import Colors from "../../shared/constants/Colors";
import { touchableComponent } from "./../../utils/Platforms";

const ProductItem = (props) => {
  const { imageUrl, title, price, onSelect } = props;
  const TouchableComponent = touchableComponent();

  return (
    <Card style={styles.product}>
      <View style={styles.platform}>
        <TouchableComponent onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <BoldText style={styles.title}>{title}</BoldText>
              <DefaultText style={styles.price}>
                ${price.toFixed(2)}
              </DefaultText>
            </View>

            <View style={styles.buttonContainer}>{props.children}</View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  platform: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    height: "17%",
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: Colors.grey,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 10,
  },
});

export default ProductItem;
