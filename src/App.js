import React from "react";
import OidcRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { HeaderButtons } from "./components/header/headerButtons";
import { authService } from "./services/AuthService";
import { updateUser } from "./redux/actionCreators";
import { connect } from "react-redux";

const AppController = ({user, updateUser}) => {
  if (user) {
    console.log("User in app", { user });
    authService.addAccessTokenExpiring();
    authService.addAccessTokenExpired(updateUser);
  } else {
    console.log("No user in App", { user });
    authService.addUserLoaded(updateUser);
    authService.removeAccessTokenExpiring();
    authService.removeAccessTokenExpired();
  }
  return (
    <div>
      <BrowserRouter>
        <HeaderButtons />
        <OidcRoutes />
      </BrowserRouter>
    </div>
  );
};

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(AppController);
