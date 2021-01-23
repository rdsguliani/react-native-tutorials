import React, { useCallback, useEffect, useState } from "react";

import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native";
import { set } from "react-native-reanimated";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import Product from "../../models/product";
import CustomHeaderButton from "../../shared/components/UI/HeaderButton";
import { createProduct, updateProduct } from "../../store/actions/products";
import { isAndroid } from "../../utils/Platforms";

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const prodId = props.navigation.getParam("productId");
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );

  const [title, setTitle] = useState(editProduct ? editProduct.title : "");
  const [imageUrl, setImageUrl] = useState(
    editProduct ? editProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editProduct ? editProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    console.log("submitting", title, description, imageUrl);
    if (editProduct) {
      dispatch(updateProduct(prodId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}> Title </Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}> ImageUrl </Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {editProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}> Price </Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}> Description </Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (props) => {
  const submitFn = props.navigation.getParam("submit");

  return {
    headerTitle: props.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="save"
          iconName={isAndroid() ? "md-checkmark" : "ios-checkmark"}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
