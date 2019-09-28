import React from "react";
import { AuthConsumer } from "../../context/authContext/authProvider";

export const Callback = () => (
  <AuthConsumer>
    {({ signinRedirectCallback }) => {
      signinRedirectCallback();
      return <h1>LOADING!!!...</h1>;
    }}
  </AuthConsumer>
);