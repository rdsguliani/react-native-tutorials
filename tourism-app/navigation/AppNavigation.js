import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import PlacesListScreen from "../screens/PlacesListScreen";
import Colors from "../constants/Colors";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontSize: 24,
  },
};

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    NewPlace: NewPlaceScreen,
    Map: { screen: MapScreen },
    PlaceDetails: PlaceDetailScreen,
  },
  {
    default: "Places",
    defaultNavigationOptions,
  }
);

export default createAppContainer(PlacesNavigator);
