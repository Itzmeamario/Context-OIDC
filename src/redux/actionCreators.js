import {
  USER_UPDATED,
  GET_USER,
  // GET_USER_SUCCESS,
  GET_USER_ERROR
} from "./actions";
import { authService } from "../services/AuthService";

// Action creator
export const updateUser = user => {
  // Return an action
  return {
    type: USER_UPDATED,
    payload: user
  };
};

export const getUser = () => {
  return {
    type: GET_USER
  };
};

// export const getUserSuccess = user => {
//   return {
//     type: GET_USER_SUCCESS,
//     payload: user
//   };
// };

export const getUserError = e => {
  return {
    type: GET_USER_ERROR,
    payload: e
  };
};

export const asyncUpdateUser = user => dispatch => {
  if (user) {
    // set loading to false , since it's no longer loading
  } else {
    dispatch(getUser());
    authService.getUser()
      .then((user) => {
        dispatch(updateUser(user))
      })
      .catch(e => {
        dispatch(getUserError(e));
      });
  }
};
