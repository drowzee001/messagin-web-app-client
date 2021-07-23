import axios from "axios";
import {
  GET_MESSAGES,
  ADD_MESSAGE,
  DELETE_MESSAGE,
  MESSAGES_LOADING,
} from "../types";
import { returnErrors } from "./errorAction";

export const getMessages = (conversation_id) => (dispatch, getState) => {
  dispatch(setMessagesLoading());
  const auth = getState().auth;

  // Headers
  const config = {
    headers: {},
  };

  // If token, add to headers
  if (auth.token) {
    config.headers["x-auth-token"] = auth.token;
  }
  // Load messages using the conversation id
  axios
    .get(`https://messaging-web-app-server.donovanrowzee.net/messages/${conversation_id}`, config)
    .then((res) => {
      dispatch({
        type: GET_MESSAGES,
        payload: res.data.messages,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// New Conversation
export const addMessage = (receiver_email, text) => (dispatch, getState) => {
  // Get token from local storage
  const auth = getState().auth;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (auth.token) {
    config.headers["x-auth-token"] = auth.token;
  }

  // Confirm Recipient and get name
  axios
    .post(`https://messaging-web-app-server.donovanrowzee.net/users/`, { receiver_email }, config)
    .then((res) => {
      if (res.data.user._id === auth.user.id) {
        dispatch(
          returnErrors("Cannot use sender's email address", 400, "MESSAGE_FAIL")
        );
      } else {
        const message = {
          sender_id: auth.user.id,
          sender_name: auth.user.name,
          receiver_id: res.data.user._id,
          receiver_name: res.data.user.name,
          text: text,
        };
        axios
          .post("https://messaging-web-app-server.donovanrowzee.net/messages/message", message, config)
          .then((res) => {
            dispatch({
              type: ADD_MESSAGE,
              payload: res.data,
            });
          })
          .catch((err) =>
            dispatch(
              returnErrors(
                err.response.data,
                err.response.status,
                "MESSAGE_FAIL"
              )
            )
          );
      }
    })
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, "MESSAGE_FAIL")
      )
    );
};

export const sendMessage = (receiver_id, text) => (dispatch, getState) => {
  // Get token from local storage
  const auth = getState().auth;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (auth.token) {
    config.headers["x-auth-token"] = auth.token;
  }

  // Confirm Recipient and get name
  axios
    .get(`https://messaging-web-app-server.donovanrowzee.net/users/${receiver_id}`, config)
    .then((res) => {
      const message = {
        sender_id: auth.user.id,
        sender_name: auth.user.name,
        receiver_id: res.data.user._id,
        receiver_name: res.data.user.name,
        text: text,
      };
      axios
        .post("https://messaging-web-app-server.donovanrowzee.net/messages/message", message, config)
        .then((res) => {
          dispatch({
            type: ADD_MESSAGE,
            payload: res.data,
          });
        })
        .catch((err) =>
          dispatch(
            returnErrors(err.response.data, err.response.status, "MESSAGE_FAIL")
          )
        );
    })
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, "MESSAGE_FAIL")
      )
    );
};

export const deleteMessage = (id) => (dispatch, getState) => {
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
    .delete(`https://messaging-web-app-server.donovanrowzee.net/messages/${id}`, config)
    .then((res) => {
      dispatch({
        type: DELETE_MESSAGE,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setMessagesLoading = () => {
  return {
    type: MESSAGES_LOADING,
  };
};
