import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cartitem";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  const type = action.type;

  switch (type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      let updateOrNewCartItem = null;

      if (state.items[addedProduct.id]) {
        updateOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };

      break;

    case REMOVE_FROM_CART:
      const productId = action.productId;
      const quantity = state.items[productId].quantity;
      const remainingItems = { ...state.items };
      let productPrice = state.items[productId].productPrice;

      if (quantity === 1) {
        delete remainingItems[productId];
      } else {
        remainingItems[productId].sum -= productPrice;
        remainingItems[productId].quantity--;
      }

      return {
        ...state,
        items: remainingItems,
        totalAmount: state.totalAmount - productPrice,
      };

      break;

    case CLEAR_CART:
      return {
        items: {},
        totalAmount: 0,
      };
      break;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.productId].sum;
      delete updatedItems[action.productId];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default cartReducer;
