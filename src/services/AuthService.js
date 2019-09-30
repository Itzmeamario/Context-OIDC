import { UserManager, WebStorageStateStore } from "oidc-client";
import { IDENTITY_CONFIG } from "../settings/OidcSettings";

// import { Log } from "oidc-client";

export default class AuthService {
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
    this.userManager.stopSilentRenew();
    this.userManager.events.addUserLoaded(user => {
      this.accessToken = user.access_token;
      this.id_token = user.id_token;
      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("id_token", user.id_token);
      this.setUserInfo({
        accessToken: this.accessToken,
        idToken: user.id_token
      });
      // when it's not pop up mode
      if (window.location.href.indexOf("signin-oidc") !== -1) {
        window.location.replace("/private");
      }
      // when it's popup mode
      if (!!localStorage.getItem("id_token")) {
        window.location.reload();
      }
    });
    this.userManager.events.addAccessTokenExpiring(() =>
      console.log(`Token is expiring!!!`)
    );
    this.userManager.events.addAccessTokenExpired(() => {
      console.log(`Token is expired!!!`);
      //Delete all localstorage items that i set
      localStorage.removeItem("id_token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("data");
      localStorage.removeItem("data1");
      localStorage.removeItem("redirectUri");
      localStorage.removeItem("userId");

      //Remove user from storage with removeUser
      this.removeUser();

      //Redirect to home page
      // window.location.replace("/");
    });
    this.userManager.events.removeAccessTokenExpired(() =>
      console.log("removed event from token is expired")
    );
    this.userManager.events.removeAccessTokenExpiring(() =>
      console.log(`removed event from Token is expiring`)
    );
  }

  parseJwt = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  setUserInfo = authResult => {
    const data = this.parseJwt(this.accessToken);
    const data1 = this.parseJwt(this.id_token);

    console.log({ data });
    console.log({ data1 });

    this.setSessionInfo(authResult);
    this.setUser(data);
    this.setUser1(data1);
  };

  setUser = data => {
    localStorage.setItem("userId", data.sub);
    localStorage.setItem("data", JSON.stringify(data));
  };

  setUser1 = data => {
    localStorage.setItem("data1", JSON.stringify(data));
  };

  setSessionInfo(authResult) {
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
  }

  signinRedirect = () => {
    localStorage.setItem("redirectUri", window.location.pathname);
    this.userManager.signinRedirect();
  };

  signinRedirectCallback = () => {
    this.userManager.signinRedirectCallback().then(() => {
      "";
    });
  };

  signinPopup = async () => {
    localStorage.setItem("redirectUriPop", window.location.pathname);
    await this.userManager.signinPopup();
  };

  signinPopupCallback = () => {
    this.userManager.signinPopupCallback();
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

  removeUser = async () => {
    console.log("RUNNING rmeoveUser");
    await this.userManager.removeUser();
  };
}
