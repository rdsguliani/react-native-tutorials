import React, { useCallback, useEffect, useState, useReducer } from "react";

import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import Product from "../../models/product";
import CustomHeaderButton from "../../shared/components/UI/HeaderButton";
import Input from "./../../shared/components/UI/Input";

import {
  createProduct,
  updateProduct,
  UPDATE_PRODUCT,
} from "../../store/actions/products";
import { isAndroid } from "../../utils/Platforms";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }

  return state;
};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const prodId = props.navigation.getParam("productId");
  const editProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editProduct ? editProduct.title : "",
      imageUrl: editProduct ? editProduct.imageUrl : "",
      description: editProduct ? editProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editProduct ? true : false,
      imageUrl: editProduct ? true : false,
      description: editProduct ? true : false,
      price: editProduct ? true : false,
    },
    formIsValid: false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input !", "Enter valid detials", [{ text: "Okay" }]);
      return;
    }
    if (editProduct) {
      dispatch(
        updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editProduct ? editProduct.title : ""}
          initiallyValid={!!editProduct}
          required
        />

        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editProduct ? editProduct.imageUrl : ""}
          initiallyValid={!!editProduct}
          required
        />

        {editProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editProduct ? editProduct.description : ""}
          initiallyValid={!!editProduct}
          required
          minLength={5}
        />
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
});

export default EditProductScreen;
