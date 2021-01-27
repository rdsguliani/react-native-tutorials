import Order from "../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  const type = action.type;

  switch (type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.allOrders,
      };
      break;

    case ADD_ORDER:
      const { id, items, amount, date } = action.orderData;
      const order = new Order(id, items, amount, date);

      return {
        ...state,
        orders: state.orders.concat(order),
      };
      break;
  }

  return state;
};

export default ordersReducer;
