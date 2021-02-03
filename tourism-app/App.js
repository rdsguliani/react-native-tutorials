import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigation/AppNavigation";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import { enableScreens } from "react-native-screens";
import placeReducer from "./store/reducers/places";
import { init } from "./data/db";

enableScreens();

init()
  .then(() => {
    console.log("init db");
  })
  .catch((e) => {
    console.log("error", e);
  });

const rootReducer = combineReducers({
  places: placeReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
