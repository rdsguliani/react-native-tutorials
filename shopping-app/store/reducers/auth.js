const { LOGIN, SIGN_UP } = require("../actions/auth");

const initialState = {
  email: null,
  expiry: 0,
  token: null,
  refreshToken: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  const type = action.type;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        email: action.email,
        expiry: action.expiry,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        userId: action.localId,
      };
    case SIGN_UP:
      return {
        ...state,
        email: action.email,
        expiry: action.expiry,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        userId: action.localId,
      };
  }

  return state;
};

export default authReducer;
