import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

const host = "http://localhost:4000";

export interface LoginDataInterface {
  login: string;
  password: string;
}

export interface LoginAction {
  type: ActionTypes.authSuccess;
}

export interface AuthRespInterface {
  json(): Object;
}

export const login = (props: LoginDataInterface): Function => {
  return async (dispatch: Dispatch) => {
    const { login, password } = props;
    const res = await axios.post<AuthRespInterface>(host + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const json = res.data;
    authenticateUser(json);
    if (res.status) { // TODO Check this
      dispatch<LoginAction>({
        type: ActionTypes.authSuccess,
      });
    }
    // TODO Handle error
  };
};

// TODO fix any type
function authenticateUser(json: any) {
  window.localStorage.setItem("authToken", json.token);
  window.localStorage.setItem("username", json.user.username);
  if (json.user.roles && json.user.roles.length > 0) {
    window.localStorage.setItem("roles", json.user.roles);
  }
}
