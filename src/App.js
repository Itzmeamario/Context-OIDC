import React, { Component } from "react";
import OidcRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { HeaderButtons } from "./components/header/headerButtons";
import { authService } from "./services/AuthService";
import { updateUser, asyncUpdateUser } from "./redux/actionCreators";
import { connect } from "react-redux";

class AppController extends Component {
  componentDidMount = async () => {
    console.log("Rendering APP");
    const { asyncUpdateUser } = this.props;
    asyncUpdateUser();
  };
  render() {
    const { user, loading } = this.props;
    console.log({loading})
    console.log("User in", { user });
    if (user) {
      authService.addAccessTokenExpiring();
      authService.addAccessTokenExpired(updateUser);
    } else {
      const { updateUser } = this.props;
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
  }
}

export default connect(
  state => ({ user: state.user, loading: state.loading }),
  { updateUser, asyncUpdateUser }
)(AppController);
