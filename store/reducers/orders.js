import Order from "../../models/order";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  const type = action.type;

  switch (type) {
    case ADD_ORDER:
      const id = Math.random().toString();
      const { items, amount } = action.orderData;
      const order = new Order(id, items, amount, new Date());

      return {
        ...state,
        orders: state.orders.concat(order),
      };
      break;
  }

  return state;
};

export default ordersReducer;
