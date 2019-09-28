import React from "react";
import { AuthConsumer } from "../context/authContext/authProvider";

export const PublicPage = () => {
  return (
    <AuthConsumer>
      {({ signinRedirect }) => {
        return (
          <div>
            Public page
            <button onClick={signinRedirect}>Log in!</button>
          </div>
        );
      }}
    </AuthConsumer>
  );
};
