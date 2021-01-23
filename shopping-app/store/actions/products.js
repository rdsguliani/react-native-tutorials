export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const selectedProduct = (id) => {
  return { type: SELECTED_PRODUCT, productId: id };
};

export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, productId: id };
};

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    productDetail: { title, description, imageUrl, price },
  };
};

export const updateProduct = (productId, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    productDetail: { productId, title, description, imageUrl },
  };
};
