import { combineReducers } from "redux";
import { USER_UPDATED } from "./actions";

const userReducer = (state = null, action) => {
  if(action.type === USER_UPDATED) {
    return action.payload
  }
  return state;
}

export default combineReducers({
  user: userReducer
})