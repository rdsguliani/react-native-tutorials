import React, { useCallback, useReducer, useState } from "react";

import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../shared/constants/Colors";

import Card from "../../shared/components/UI/Card";
import Input from "../../shared/components/UI/Input";

import { useDispatch } from "react-redux";

import { login, signup } from "../../store/actions/auth";
import Product from "../../models/product";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  const type = action.type;

  if (type === FORM_INPUT_UPDATE) {
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

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    try {
      setIsError(null);
      setIsLoading(true);
      const result = isSignup
        ? await dispatch(
            signup(formState.inputValues.email, formState.inputValues.password)
          )
        : await dispatch(
            login(formState.inputValues.email, formState.inputValues.password)
          );

      props.navigation.navigate("Shop");
    } catch (e) {
      console.log(formState);

      setIsError(e.message);
      setIsLoading(false);
    }
  };

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

  // if (isloading) {
  //   return (
  //     <View style={styles.gradient}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            {isError && (
              <View>
                <Text>Error while loggin in!</Text>
              </View>
            )}
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              auto
              email
              autoCapitalize="none"
              errorText="Please Enter a valid email address."
              initialValue=""
              onInputChange={inputChangeHandler}
            />

            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              auto
              minLength={4}
              autoCapitalize="none"
              errorText="Please Enter a valid password."
              initialValue=""
              onInputChange={inputChangeHandler}
            />
            <View style={styles.buttonContainer}>
              {isloading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                ></Button>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup((prevState) => !prevState);
                }}
              ></Button>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    padding: 15,
    maxHeight: 400,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
