import { combineReducers } from "redux";
import authReducer from "./authReducer";
import conversationsReducer from "./conversationsReducer";
import errorReducer from "./errorReducer";
import messagesReducer from "./messagesReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  conversations: conversationsReducer,
  messages: messagesReducer,
});
