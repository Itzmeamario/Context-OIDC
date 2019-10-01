export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTH_URL,
  client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID,
  redirect_uri: "http://localhost:3000/",
  popup_redirect_uri: "http://localhost:3000/signin-oidc",
  post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
  // audience: "your audience",
  monitorSession: false,
  response_type: "id_token token",
  loadUserInfo: false,
  scope: "openid profile email hc-rules"
};
