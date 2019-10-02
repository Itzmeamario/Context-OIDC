import {
  USER_UPDATED,
  GET_USER,
  UPDATE_LOADING,
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

export const updateLoading = loading => {
  return {
    type: UPDATE_LOADING,
    loading
  };
};

export const getUserError = e => {
  return {
    type: GET_USER_ERROR,
    payload: e
  };
};

export const asyncUpdateUser = user => dispatch => {
  if (user) {
    dispatch(updateUser(false));
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
