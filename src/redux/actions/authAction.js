import axios from "axios";
import { returnErrors } from "./errorAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  axios
    .get("https://messaging-web-app-server.herokuapp.com/users", config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      console.log(err)
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
// Register User
export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name, email, password });
    axios
      .post("https://messaging-web-app-server.herokuapp.com/users/register", body, config)
      .then((res) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "REGISTER_FAIL"
          )
        );
        dispatch({
          type: REGISTER_FAIL,
        });
      });
  };

// Login User
export const login =
  ({ email, password }) =>
  (dispatch) => {
    // User loading
    dispatch({ type: USER_LOADING });
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios
      .post("https://messaging-web-app-server.herokuapp.com/users/login", body, config)
      .then((res) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data.msg, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
