import { UserManager, WebStorageStateStore } from "oidc-client";
import { IDENTITY_CONFIG } from "../settings/OidcSettings";

import { Log } from "oidc-client";
class AuthService {
  constructor() {
    console.log("Loading auth service");
    this.userManager = new UserManager({
      ...IDENTITY_CONFIG,
      userStore: new WebStorageStateStore({
        store: window.localStorage
      })
    });

    Log.logger = console;
    Log.level = Log.DEBUG;
  }

  parseJwt = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  setUserInfo = id_token => {
    const idData = this.parseJwt(id_token);

    this.setIdData(idData);
  };

  addUserLoaded = updateUser => {
    this.userManager.events.addUserLoaded(user => {
      console.log("LOADED USER in APP", JSON.stringify(user));
      localStorage.setItem("id_token", user.id_token);
      this.setUserInfo({
        idToken: user.id_token
      });
      updateUser(user);
    });
  };

  setIdData = data => {
    localStorage.setItem("idData", JSON.stringify(data));
  };

  setSessionInfo(authResult) {
    localStorage.setItem("id_token", authResult.idToken);
  }

  addAccessTokenExpiring = () => {
    this.userManager.events.addAccessTokenExpiring(() =>
      console.log(`Token is expiring!!!`)
    );
  };

  addAccessTokenExpired = updateUser => {
    this.userManager.events.addAccessTokenExpired(() => {
      console.log(`Token is expired!!!`);
      this.storageCleanUp();
      this.removeUser(updateUser);
    });
  };

  removeAccessTokenExpired = () => {
    this.userManager.events.removeAccessTokenExpired();
  };

  removeAccessTokenExpiring = () => {
    this.userManager.events.removeAccessTokenExpiring();
  };

  signinPopup = () => {
    localStorage.setItem("redirectUriPop", window.location.pathname);
    this.userManager.signinPopup();
  };

  signinPopupCallback = () => {
    this.userManager.signinPopupCallback();
  };

  signoutPopup = updateUser => {
    this.userManager
      .signoutPopup()
      .then(() => this.signoutPopupCallback(updateUser));
  };

  signoutPopupCallback = async updateUser => {
    this.storageCleanUp();
    this.removeUser(updateUser);
    this.userManager.signoutPopupCallback();
  };

  storageCleanUp = () => {
    localStorage.removeItem("redirectUriPop");
    localStorage.removeItem("id_token");
    localStorage.removeItem("accessData");
    localStorage.removeItem("idData");
    localStorage.removeItem("userId");
  };

  isAuthenticated = () => {
    const id_token = localStorage.getItem("id_token");
    return !!id_token;
  };

  getUser = async () => {
    console.log("RUNNING getUser");
    const user = await this.userManager.getUser();
    return user;
  };

  removeUser = async updateUser => {
    console.log("RUNNING removeUser");
    await this.userManager.removeUser();
    updateUser(null);
  };
}

export const authService = new AuthService();
