import React, { Component } from "react";
import OidcRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { HeaderButtons } from "./components/header/headerButtons";
import { authService } from "./services/AuthService";

export default class App extends Component {
  componentDidMount =  async () => {
    console.log("Rendering APP")
    if (await authService.getUser()) {
      authService.removeAccessTokenExpiring();
      authService.removeAccessTokenExpired();
    } else {
      authService.addUserLoaded();
      authService.addAccessTokenExpiring();
      authService.addAccessTokenExpired();
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
