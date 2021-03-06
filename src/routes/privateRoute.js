import React from "react";
import { Route } from "react-router-dom";
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

        if (loading) {
          console.log("loading")
          return <span>loading</span>;
        } else {
          if (
            !!Component &&
            user &&
            user.id_token &&
            user.profile &&
            user.profile.roles &&
            user.profile.roles === "admin"
          ) {
            return <Component {...props} />;
          } else {
            return <div>NO PERMS LOG IN</div>;
          }
        }
      }}
    ></Route>
  );
});
