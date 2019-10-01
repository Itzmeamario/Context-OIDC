import { combineReducers } from "redux";
import { USER_UPDATED } from "./actions";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case USER_UPDATED:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer
});
