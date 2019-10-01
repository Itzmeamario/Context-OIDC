import { USER_UPDATED } from "./actions";
// Action creator
export const updateUser = user => {
  // Return an action
  return {
    type: USER_UPDATED,
    payload: user
  };
};
