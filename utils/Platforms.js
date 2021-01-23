import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";

export const Platforms = {
  ANDROID: "android",
  IOS: "ios",
};

export const isAndroid = () =>
  Platform.OS === Platforms.ANDROID ? true : false;

export const touchableComponent = () => {
  return isAndroid() && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;
};
