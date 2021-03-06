import React, { Component } from "react";
import OidcRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { HeaderButtons } from "./components/header/headerButtons";
import { authService } from "./services/AuthService";
import { updateUser, asyncUpdateUser } from "./redux/actionCreators";
import { connect } from "react-redux";

class AppController extends Component {
  componentDidMount = () => {
    console.log("Rendering APP");
    const { asyncUpdateUser, updateUser } = this.props;
    asyncUpdateUser();
    authService.addUserLoaded(updateUser);
    authService.removeAccessTokenExpiring();
    authService.removeAccessTokenExpired();
  };

  render() {
    const { user, loading, updateUser } = this.props;
    console.log("User", { user });
    if (user && !loading) {
      authService.addAccessTokenExpiring();
      authService.addAccessTokenExpired(updateUser);
    }
    return (
      <div>
        <BrowserRouter>
          <HeaderButtons />
          <OidcRoutes />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user, loading: state.loading }),
  { updateUser, asyncUpdateUser }
)(AppController);
