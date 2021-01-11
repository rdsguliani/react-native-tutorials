import React, { useState } from "react";

import AppLoading from "expo-app-loading";
import { ShadowPropTypesIOS } from "react-native";

import { fetchFonts } from "./../fonts/fonts";

const Loading = (props) => {
  return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={props.finish}
      onError={(err) => console.log(err)}
    />
  );
};

export default Loading;
