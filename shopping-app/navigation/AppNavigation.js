import React from "react";
import { Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductsDetailScreen from "../screens/shop/ProductsDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import UserProductScreen from "../screens/user/UserProductsScreen";

import Colors from "../shared/constants/Colors";
import { isAndroid } from "../utils/Platforms";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { createStore } from "redux";
import Order from "../models/order";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

const navigationOptions = {
  headerStyle: {
    backgroundColor: isAndroid() ? Colors.primary : "",
  },
  headerTintColor: isAndroid() ? Colors.white : Colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductsDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      ...navigationOptions,
    },
  }
);

const OrderNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions: {
      ...navigationOptions,
    },
  }
);

const AdminNavigator = createStackNavigator(
  {
    userProducts: UserProductScreen,
    EditProduct: EditProductScreen,
  },
  {
    defaultNavigationOptions: {
      ...navigationOptions,
    },
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          size={23}
          name={isAndroid() ? "md-create" : "ios-create"}
          color={drawerConfig.tintColor}
        ></Ionicons>
      ),
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductNavigator,
      navigationOptions: {
        drawerLabel: "Products",
        drawerIcon: (drawerConfig) => (
          <Ionicons
            size={23}
            name={isAndroid() ? "md-cart" : "ios-cart"}
            color={drawerConfig.tintColor}
          ></Ionicons>
        ),
      },
    },
    Order: {
      screen: OrderNavigator,
      navigationOptions: {
        drawerLabel: "Orders",
        drawerIcon: (drawerConfig) => (
          <Ionicons
            size={23}
            name={isAndroid() ? "md-list" : "ios-list"}
            color={drawerConfig.tintColor}
          ></Ionicons>
        ),
      },
    },
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: navigationOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
