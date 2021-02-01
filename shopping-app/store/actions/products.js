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
    try {
      const response = await fetch(
        `https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/products/${id}.json?auth=${
          getState().auth.idToken
        }`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("something went wront!!");
      }

      dispatch({ type: DELETE_PRODUCT, productId: id });
    } catch (e) {
      throw e;
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetch(
        "https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("No products found. Try adding one!!");
      }

      const allProducts = await response.json();
      const loadedProducts = [];
      for (const key in allProducts) {
        const { description, imageUrl, price, title, ownerId } = allProducts[
          key
        ];
        loadedProducts.push(
          new Product(key, ownerId, title, imageUrl, description, price)
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === userId
        ),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/products.json?auth=${
          getState().auth.idToken
        }`,
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
            ownerId: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("something went wront!!");
      }

      const res = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productDetail: { id: res.name, title, description, imageUrl, price },
      });
    } catch (e) {
      throw e;
    }
  };
};

export const updateProduct = (productId, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        `https://rn-complete-guide-7ad70-default-rtdb.firebaseio.com/products/${productId}.json?auth=${
          getState().auth.idToken
        }`,
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

      if (!response.ok) {
        throw new Error("something went wront!!");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        productDetail: { productId, title, description, imageUrl },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
};
