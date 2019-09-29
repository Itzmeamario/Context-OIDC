export const IDENTITY_CONFIG = {
  authority: process.env.REACT_APP_AUTH_URL,
  client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URL,
  // silent_redirect_uri: process.env.REACT_APP_SILENT_REDIRECT_URL,
  post_logout_redirect_uri: process.env.REACT_APP_LOGOFF_REDIRECT_URL,
  // audience: "your audience",
  // accessTokenExpiringNotificationTime: "10",
  // checkSessionInterval: "10",
  monitorSession: false,
  response_type: "id_token token",
  // automaticSilentRenew: false,
  loadUserInfo: false,
  scope: "openid profile hc-rules email"
};
