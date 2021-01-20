import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoadingApp from "./shared/LoadingApp";

import { enableScreens } from "react-native-screens";

import AppContainer from "./navigation/AppNavigator";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import mealsReducer from "./store/reducers/meals";

// enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoading] = useState(false);

  const loadComplete = () => {
    setFontLoading(true);
  };

  if (!fontLoaded) {
    return <LoadingApp onFinish={loadComplete} />;
  }

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
