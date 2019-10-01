import { UserManager, WebStorageStateStore } from "oidc-client";
import { IDENTITY_CONFIG } from "../settings/OidcSettings";

// import { Log } from "oidc-client";
class AuthService {
  constructor() {
    console.log("Loading auth service");
    this.userManager = new UserManager({
      ...IDENTITY_CONFIG,
      userStore: new WebStorageStateStore({
        store: window.localStorage
      })
    });

    // Log.logger = console;
    // Log.level = Log.DEBUG;

    this.accessToken = null;
    this.id_token = null;

    //Redirect to home page
    // window.location.replace("/");
    // });
  }

  parseJwt = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  setUserInfo = authResult => {
    const accessData = this.parseJwt(this.accessToken);
    const idData = this.parseJwt(this.id_token);

    this.setSessionInfo(authResult);
    this.setUser(accessData);
    this.setAccessData(accessData);
    this.setIdData(idData);
  };

  addUserLoaded = () => {
    this.userManager.events.addUserLoaded(user => {
      console.log("LOADED USER in APP");
      this.accessToken = user.access_token;
      this.id_token = user.id_token;
      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("id_token", user.id_token);
      this.setUserInfo({
        accessToken: this.accessToken,
        idToken: user.id_token
      });
    });
  };

  setUser = data => {
    localStorage.setItem("userId", data.sub);
  };

  setAccessData = data => {
    localStorage.setItem("accessData", JSON.stringify(data));
  };

  setIdData = data => {
    localStorage.setItem("idData", JSON.stringify(data));
  };

  setSessionInfo(authResult) {
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
  }

  addAccessTokenExpiring = () => {
    this.userManager.events.addAccessTokenExpiring(() =>
      console.log(`Token is expiring!!!`)
    );
  };
  
  addAccessTokenExpired = () => {
    this.userManager.events.addAccessTokenExpired(() => {
      console.log(`Token is expired!!!`);
      this.storageCleanUp();
      // window.location.reload();
    });
  };
  
  removeAccessTokenExpired = () => {
    this.userManager.events.removeAccessTokenExpired(() =>
    console.log("removed event from token is expired")
    );
  };
  
  removeAccessTokenExpiring = () => {
    this.userManager.events.removeAccessTokenExpiring(() =>
    console.log(`removed event from Token is expiring`)
    );
  };
  
  signinPopup = () => {
    localStorage.setItem("redirectUriPop", window.location.pathname);
    this.userManager.signinPopup();
  };
  
  signinPopupCallback = () => {
    this.userManager.signinPopupCallback();
  };
  
  signoutPopup = () => {
    this.storageCleanUp();
    console.log("SignoutPopup being called");
    this.userManager.signoutPopup();
  };

  signoutPopupCallback = () => {
    this.userManager.signoutPopupCallback();
  };

  storageCleanUp = () => {
    localStorage.removeItem("redirectUriPop");
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("accessData");
    localStorage.removeItem("idData");
    localStorage.removeItem("userId");

    this.removeUser();
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

  // Not being used
  removeUser = async () => {
    console.log("RUNNING removeUser");
    await this.userManager.removeUser();
  };
}

export const authService = new AuthService();
