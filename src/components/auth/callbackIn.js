import React from "react";
import { authService } from "../../services/AuthService"

export const CallbackIn = () => {
  authService.signinPopupCallback();
  authService.signinSilentCallback();
  return <h1>LOADING!!!...</h1>;
};
