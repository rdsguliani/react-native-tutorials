export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

const API_KEY = "AIzaSyDgPymH-0iZrUWLNscHPQZRacF66EcCRLE";

export const signup = (email, password) => {
  console.log(email, password);
  return async (dispatch) => {
    try {
      const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData);
      }

      console.log(resData);

      dispatch({ type: SIGN_UP });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData);
      }

      dispatch({ type: LOGIN, ...resData });
    } catch (err) {
      throw err;
    }
  };
};
