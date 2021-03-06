import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import ReduxThunk from "redux-thunk";

import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";

import AppNavigator from "./navigation/AppNavigation";
import LoadingApp from "./shared/components/LoadingApp";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
