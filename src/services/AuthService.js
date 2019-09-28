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
    this.userManager.events.addUserLoaded(user => {
      this.accessToken = user.access_token;
      this.id_token = user.id_token;
      localStorage.setItem("access_token", user.access_token);
      localStorage.setItem("id_token", user.id_token);
      this.setUserInfo({
        accessToken: this.accessToken,
        idToken: user.id_token
      });
      if (window.location.href.indexOf("signin-oidc") !== -1) {
        this.navigateToScreen();
      }
    });
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

  signinRedirect = async () => {
    console.log("RUNNING signinRedirect");
    localStorage.setItem("redirectUri", window.location.pathname);
    await this.userManager.signinRedirect();
  };

  onUserLoaded = () => {
    console.log("RUNNING onUserLoaded");
    console.log(this.props);
  };

  signinRedirectCallback = () => {
    console.log("RUNNING signinRedirectCallback");
    this.userManager.signinRedirectCallback().then(() => {
      "";
    });
  };

  isAuthenticated = () => {
    const id_token = localStorage.getItem("id_token");
    console.log(!!id_token);
    return !!id_token;
  };

  getUser = async () => {
    console.log("RUNNING getUser");
    const user = await this.userManager.getUser();
    return user;
  };

  navigateToScreen = () => {
    window.location.replace("/private");
  };
}
