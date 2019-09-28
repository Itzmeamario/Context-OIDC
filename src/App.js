import React, { Component } from "react";
import OidcRoutes from "./routes/routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext/authProvider";


export default class App extends Component {
  render () {
    console.log("Rerendering");
    return (
      <div>
        HI FML
        <AuthProvider>
          <BrowserRouter>
            <OidcRoutes />
          </BrowserRouter>
        </AuthProvider>
      </div>
    );
  };
}
