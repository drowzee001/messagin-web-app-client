import {
  GET_MESSAGES,
  ADD_MESSAGE,
  DELETE_MESSAGE,
  MESSAGES_LOADING,
} from "../types";

const initialState = {
  messages: [],
  loading: true,
  success: false,
};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false,
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.array.filter(
          (message) => message._id !== action.payload
        ),
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.msg],
        success: true,
      };
    case MESSAGES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
