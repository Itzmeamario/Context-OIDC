import React, { Component } from "react";
import OidcRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext/authProvider";
import { HeaderButtons } from "./components/header/headerButtons";

export default class App extends Component {
  render() {
    console.log("Rerendering");
    return (
      <div>
        HI FML
        <AuthProvider>
          <BrowserRouter>
            <HeaderButtons />
            <OidcRoutes />
          </BrowserRouter>
        </AuthProvider>
      </div>
    );
  }
}
