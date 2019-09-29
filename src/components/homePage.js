import React from "react";
import { AuthConsumer } from "../context/authContext/authProvider";

export const HomePage = () => {
  return (
    <AuthConsumer>
      {({ signinRedirect }) => {
        return (
          <div>
            <button onClick={signinRedirect}>Log in!</button>
          </div>
        );
      }}
    </AuthConsumer>
  );
};
