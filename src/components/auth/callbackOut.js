import React from "react";
import { authService } from "../../services/AuthService";

export const CallbackOut = () => {
  authService.signoutPopupCallback();
  return <h1>LOADING!!!...</h1>;
};
