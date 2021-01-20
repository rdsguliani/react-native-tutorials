import React from "react";

import AppLoading from "expo-app-loading";
import fetchFonts from "./fonts/fonts";

const LoadingApp = (props) => {
  return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={props.onFinish}
      onError={(err) => console.log(err)}
    />
  );
};

export default LoadingApp;
