import Order from "../../models/order";
import { SET_PRODUCTS } from "./products";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/orders/u1.json`
      );
      const res = await response.json();

      const allOrders = [];
      for (let key in res) {
        const { amount, date, items } = res[key];
        allOrders.push(new Order(key, items, amount, new Date(date)));
      }

      dispatch({
        type: SET_ORDERS,
        allOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    try {
      const date = new Date();
      const response = await fetch(
        `https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/orders/u1.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            amount: totalAmount,
            date: date.toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error posting order");
      }

      const res = await response.json();

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: response.name,
          items: cartItems,
          amount: totalAmount,
          date,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
