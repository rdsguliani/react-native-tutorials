import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoadingApp from "./shared/LoadingApp";

import { enableScreens } from "react-native-screens";

import AppContainer from "./navigation/AppNavigator";

// enableScreens();

export default function App() {
  const [fontLoaded, setFontLoading] = useState(false);

  const loadComplete = () => {
    setFontLoading(true);
  };

  if (!fontLoaded) {
    return <LoadingApp onFinish={loadComplete} />;
  }

  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
