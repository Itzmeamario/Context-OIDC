import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { authService } from "../services/AuthService";
import { connect } from "react-redux";

export const PrivateRoute = connect(state => ({
  user: state.user,
  loading: state.loading
}))(({ component: Component, user, loading, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // this will have to validate the id_token having an array called roles
        // with admin in it
        if (!!Component && user && user.id_token) {
          return <Component {...props} />;
        } else {
          if (loading) {
            return <span>loading</span>;
          } else {
            return <Redirect to="/" />
          }
        }
      }}
    ></Route>
  );
});
