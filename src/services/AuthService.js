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

    this.token = null;

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
      localStorage.setItem("id_token", user.id_token);
      this.setUserInfo(user.id_token);
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
    this.userManager.events.addAccessTokenExpiring();
  };

  addAccessTokenExpired = updateUser => {
    this.userManager.events.addAccessTokenExpired(() => {
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

  signinPopup = async () => {
    localStorage.setItem("redirectUriPop", window.location.pathname);
    await this.userManager.signinPopup(
      {
      acr_values: "passport_social",

      extraQueryParams: {
        preselectedExternalProvider: "ewogICAicHJvdmlkZXIiIDogImdvb2dsZSIKfQ==",
        redirectUri:
          "https://dev.idp.hyrecar.com/identity/authentication/getauthcode"
      }
    }
    );
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
    localStorage.removeItem("idData");
  };

  isAuthenticated = () => {
    const id_token = localStorage.getItem("id_token");
    return !!id_token;
  };

  getUser = async () => {
    const user = await this.userManager.getUser();
    return user;
  };

  removeUser = async updateUser => {
    await this.userManager.removeUser();
    updateUser(null);
  };
}

export const authService = new AuthService();
