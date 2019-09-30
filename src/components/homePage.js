import React from "react";
import { AuthConsumer } from "../context/authContext/authProvider";

export const HomePage = () => {
  return (
    <AuthConsumer>
      {({ signinRedirect, signinPopup }) => {
        return (
          <div>
            <button onClick={signinRedirect}>Log in!</button>
            <button onClick={signinPopup}>Log in POP UP!</button>
          </div>
        );
      }}
    </AuthConsumer>
  );
};
