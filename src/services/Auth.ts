// TODO fix any type

const AUTH_TOKEN = "authToken";
const USERNAME = "username";

export class Auth {
  static deauthenticateUser() {
    window.localStorage.clear();
  }

  static async authenticateUser(json: any) {
    window.localStorage.setItem(AUTH_TOKEN, json.token);
    window.localStorage.setItem(USERNAME, json.user.username);
  }

  static isUserAuthenticated() {
    return window.localStorage.getItem(AUTH_TOKEN) !== null;
  }

  static getToken() {
    return window.localStorage.getItem(AUTH_TOKEN);
  }
}