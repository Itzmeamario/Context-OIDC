import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "../context/authContext/authProvider";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <AuthConsumer>
          {({ isAuthenticated, getUser }) => {
            if (!!Component && isAuthenticated()) {
              return <Component {...props} getUser={getUser}/>;
            } else {
              window.location.replace("/");
              return <span>loading</span>;
            }
          }}
        </AuthConsumer>
      )}
    ></Route>
  );
};
