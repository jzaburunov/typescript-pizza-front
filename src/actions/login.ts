import axios from "axios";
import { Dispatch } from "redux";
import jwtDecode from "jwt-decode";
import { ActionTypes } from "./types";

const host = "http://localhost:4000/";

export interface LoginDataInterface {
  email: string;
  password: string;
}

export interface LoginAction {
  type: ActionTypes.authSuccess;
}

export interface LogoutAction {
  type: ActionTypes.logout;
}

export interface AuthRespInterface {
  success: boolean;
  token: string;
  user: LoginDataInterface;
}

export const login = (props: LoginDataInterface): Function => {
  return async (dispatch: Dispatch) => {
    const { email, password } = props;
    const res = await axios.post<AuthRespInterface>(host + "auth/login", {
      email,
      password,
    });

    const resData = res.data;
    if (resData.success) {
      const jwtParsed = jwtDecode(resData.token) as {
        sub: string
      };
      localStorage.setItem("user", JSON.stringify(jwtParsed.sub));
      await Auth.authenticateUser(resData);
      // TODO Check this
      dispatch<LoginAction>({
        type: ActionTypes.authSuccess,
      });
    }
    // TODO Handle error
  };
};

export const logout = (push: Function): Function => {
  return async (dispatch: Dispatch) => {
    Auth.deauthenticateUser();
    dispatch<LogoutAction>({
      type: ActionTypes.logout,
    });
    push("/login");
  };
};

// TODO fix any type
export class Auth {
  static deauthenticateUser() {
    window.localStorage.clear();
  }

  static async authenticateUser(json: any) {
    window.localStorage.setItem("authToken", json.token);
    window.localStorage.setItem("username", json.user.username);
  }

  static isUserAuthenticated() {
    return window.localStorage.getItem("authToken") !== null;
  }
}
// TODO fix any type
