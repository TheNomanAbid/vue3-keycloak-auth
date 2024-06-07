import Keycloak from "keycloak-js";
import axios from "axios";
import qs from "qs";

const keycloakInstance = new Keycloak({
  url: "http://localhost:8081/auth",
  realm: "Vue",
  clientId: "vuejs"
});

interface CallbackOneParam<T1 = void, T2 = void> {
  (param1: T1): T2;
}

const Login = async (onAuthenticatedCallback: CallbackOneParam): Promise<void> => {
  try {
    const data = qs.stringify({
      client_id: 'vuejs',
      client_secret: 'gG0Y0ME9p1ux6awADvFiqMlddZuwxlFt',
      username: 'vueuser',
      password: 'admin',
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