import { GET_CONVERSATIONS } from "../types";

const initialState = {
  conversations: [],
  loading: true,
};

export default function conversationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
