import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import { createStore, combineReducers } from "redux";
import { Provider, useSelector } from "react-redux";

import productReducer from "./store/reducers/products";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";

import AppNavigator from "./navigation/AppNavigation";
import LoadingApp from "./shared/components/LoadingApp";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [isPrefetch, setIsPrefetch] = useState(false);

  const onFinish = () => {
    setIsPrefetch(true);
  };

  if (!isPrefetch) {
    return <LoadingApp finish={onFinish} />;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
