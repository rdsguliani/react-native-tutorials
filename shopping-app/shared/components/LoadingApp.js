import React from "react";

import AppLoading from "expo-app-loading";
import fetchFonts from "./../fonts/fonts";

const LoadingApp = (props) => {
  return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={props.finish}
      onError={() => console.log("error loading fonts")}
    />
  );
};

export default LoadingApp;
