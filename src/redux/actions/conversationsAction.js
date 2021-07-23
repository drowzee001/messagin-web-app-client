import axios from "axios";
import { GET_CONVERSATIONS, CONVERSATIONS_LOADING } from "../types";
import { returnErrors } from "./errorAction";

export const getConversations = () => (dispatch, getState) => {
  const config = {
    headers: {},
  };

  dispatch(setConversationsLoading());
  // Get token from local storage
  const auth = getState().auth;
  if (auth.token) {
    config.headers["x-auth-token"] = auth.token;
  }

  axios
    .get("http://messaging-web-app-server.us-west-1.elasticbeanstalk.com/conversations", config)
    .then((res) => {
      dispatch({
        type: GET_CONVERSATIONS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status),
        "CONVERSATION_FAIL"
      )
    );
};

export const setConversationsLoading = () => {
  return {
    type: CONVERSATIONS_LOADING,
  };
};
