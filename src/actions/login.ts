import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

const host = "http://localhost:4000/";

export interface LoginDataInterface {
  email: string;
  password: string;
}

export interface LoginAction {
  type: ActionTypes.authSuccess;
}

export interface AuthRespInterface {
  success: boolean;
}

export const login = (props: LoginDataInterface): Function => {
  return async (dispatch: Dispatch) => {
    const { email, password } = props;
    console.log("About to login");
    const res = await axios.post<AuthRespInterface>(host + "auth/login", {
      email,
      password,
    });

    console.log("Login response: ", res);
    const resData = res.data;
    Auth.authenticateUser(resData);
    if (resData.success) {
      // TODO Check this
      dispatch<LoginAction>({
        type: ActionTypes.authSuccess,
      });
    }
    // TODO Handle error
  };
};

// TODO fix any type
export class Auth {
  static authenticateUser(json: any) {
    window.localStorage.setItem("authToken", json.token);
    window.localStorage.setItem("username", json.user.username);
    if (json.user.roles && json.user.roles.length > 0) {
      window.localStorage.setItem("roles", json.user.roles);
    }
  }

  static isUserAuthenticated() {
    return window.localStorage.getItem("authToken") !== null;
  }
}
// TODO fix any type
