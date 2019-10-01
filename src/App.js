import React, { Component } from "react";
import OidcRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { HeaderButtons } from "./components/header/headerButtons";
import { authService } from "./services/AuthService";
import { updateUser } from "./redux/actionCreators"
import { connect } from "react-redux";


class AppController extends Component {
  componentDidMount =  async () => {
    console.log("Rendering APP")
    if (await authService.getUser()) {
      authService.removeAccessTokenExpiring();
      authService.removeAccessTokenExpired();
    } else {
      const { updateUser } = this.props;
      authService.addUserLoaded(updateUser);
      authService.addAccessTokenExpiring();
      authService.addAccessTokenExpired(updateUser);
    }
  }
  render() {
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


export default connect(null, { updateUser })(AppController)