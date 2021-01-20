import * as Font from "expo-font";

const OPEN_SANS_PATH = "./../../assets/fonts/OpenSans-Regular.ttf";
const OPEN_SANS_BOLD_PATH = "./../../assets/fonts/OpenSans-Bold.ttf";

export const OPEN_SANS = "open-sans";
export const OPEN_SANS_BOLD = "open-sans-bold";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require(OPEN_SANS_PATH),
    "open-sans-bold": require(OPEN_SANS_BOLD_PATH),
  });
};

export default fetchFonts;
