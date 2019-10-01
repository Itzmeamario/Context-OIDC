import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivatePage } from "../components/privatePage";
import { PublicPage } from "../components/publicPage";
import { CallbackIn } from "../components/auth/callbackIn";
import { CallbackOut } from "../components/auth/callbackOut";
import { PrivateRoute } from "./privateRoute";
import { HomePage } from "../components/homePage";

export default function OidcRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/public" component={PublicPage} />
      <PrivateRoute exact path="/private" component={PrivatePage} />
      <Route exact path="/signin-oidc" component={CallbackIn} />
      <Route exact path="/signout-oidc" component={CallbackOut} />
    </Switch>
  );
}
