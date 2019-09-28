import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivatePage } from "../components/privatePage";
import { PublicPage } from "../components/publicPage";
import { Callback } from "../components/auth/callback";
import { PrivateRoute } from "./privateRoute";

export default function OidcRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={PublicPage} />
      <PrivateRoute path="/private" component={PrivatePage} />
      <Route path="/signin-oidc" component={Callback} />
    </Switch>
  );
}
