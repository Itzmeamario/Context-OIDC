import { combineReducers } from "redux";
import {
  USER_UPDATED,
  GET_USER,
  // GET_USER_SUCCESS,
  GET_USER_ERROR
} from "./actions";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case USER_UPDATED:
      return action.payload;
    default:
      return state;
  }
};

const loading = (state = true, action) => {
  switch (action.type) {
    case GET_USER:
      return true;
    case USER_UPDATED:
    case GET_USER_ERROR:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  loading
});
