import Keycloak from "keycloak-js";
import axios from "axios";
import qs from "qs";

const keycloakInstance = new Keycloak({
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID
});

interface CallbackOneParam<T1 = void, T2 = void> {
  (param1: T1): T2;
}

const Login = async (username: string, password: string, onAuthenticatedCallback: CallbackOneParam): Promise<void> => {
  try {
    const data = qs.stringify({
      client_id: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
      client_secret: process.env.VUE_APP_KEYCLOAK_CLIENT_SECRET,
      username,
      password,
      grant_type: 'password',
      scope: 'openid'
    });

    const tokenResponse = await axios.post('http://localhost:8081/realms/Vue/protocol/openid-connect/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const token = tokenResponse.data.access_token;
    keycloakInstance.token = token;

    keycloakInstance
      .init({ onLoad: "check-sso" })
      .then(function (authenticated) {
        authenticated ? onAuthenticatedCallback() : alert("non authenticated");
      })
      .catch((e) => {
        console.dir(e);
        console.log(`keycloak init exception: ${e}`);
      });
  } catch (error) {
    console.error('Error during authentication', error);
  }
};

const UserName = (): string | undefined =>
  keycloakInstance?.tokenParsed?.preferred_username;

const Token = (): string | undefined => keycloakInstance?.token;

const LogOut = () => keycloakInstance.logout();

const UserRoles = (): string[] | undefined => {
  if (keycloakInstance.resourceAccess === undefined) return undefined;
  return keycloakInstance.resourceAccess["vuejs"].roles;
};

const KeyCloakService = {
  CallLogin: Login,
  GetUserName: UserName,
  GetAccesToken: Token,
  CallLogOut: LogOut,
  GetUserRoles: UserRoles,
};

export default KeyCloakService;