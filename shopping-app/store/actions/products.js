import Product from "../../models/product";

export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "GET_PRODUCTS";

export const selectedProduct = (id) => {
  return { type: SELECTED_PRODUCT, productId: id };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "DELETE",
      }
    );
    dispatch({ type: DELETE_PRODUCT, productId: id });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("No products found. Try adding one!!");
      }

      const allProducts = await response.json();
      const loadedProducts = [];
      for (const key in allProducts) {
        const { description, imageUrl, price, title } = allProducts[key];
        loadedProducts.push(
          new Product(key, "u1", title, imageUrl, description, price)
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
    const res = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productDetail: { id: res.name, title, description, imageUrl, price },
    });
  };
};

export const updateProduct = (productId, title, description, imageUrl) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      productDetail: { productId, title, description, imageUrl },
    });
  };
};
