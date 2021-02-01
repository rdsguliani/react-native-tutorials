import Product from "../../models/product";
import {
  ADD_TO_CART,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  SELECTED_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";
import { PRODUCTS } from "./../../data/dummy-data";

const initialState = {
  availableProducts: [],
  selectedProduct: null,
  userProducts: [],
};

const productReducer = (state = initialState, action) => {
  const type = action.type;

  switch (type) {
    case SET_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
      break;

    case SELECTED_PRODUCT:
      const selectedProduct = state.availableProducts.find(
        (product) => product.id === action.productId
      );
      return {
        ...state,
        selectedProduct,
      };
      break;

    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
      };

    case CREATE_PRODUCT:
      const {
        id,
        title,
        imageUrl,
        description,
        price,
        ownerId,
      } = action.productDetail;
      const newProduct = new Product(
        id,
        ownerId,
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
      break;

    case UPDATE_PRODUCT:
      const index = state.userProducts.findIndex(
        (product) => product.id === action.productDetail.productId
      );
      const updateProduct = new Product(
        action.productDetail.productId,
        state.userProducts[index].ownerId,
        action.productDetail.title,
        action.productDetail.imageUrl,
        action.productDetail.description,
        state.userProducts[index].price
      );

      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[index] = updateProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productDetail.productId
      );
      const updatedAvailableProduct = [...state.availableProducts];
      updatedAvailableProduct[availableProductIndex] = updateProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProduct,
        userProducts: updatedUserProduct,
      };
      break;

    default:
      return state;
  }

  return state;
};

export default productReducer;
