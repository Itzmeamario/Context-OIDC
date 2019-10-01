import React from "react";
import { Route } from "react-router-dom";
// import { AuthConsumer } from "../context/authContext/authProvider";
import { authService } from "../services/AuthService";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!!Component && authService.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          window.location.replace("/");
          return <span>loading</span>;
        }
      }}
    ></Route>
  );
};
