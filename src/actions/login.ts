import { Dispatch } from "redux";
import jwtDecode from "jwt-decode";
import { ActionTypes } from "./types";
import { ApiRequest } from "../api/ApiRequest";
import { Auth } from "../services/Auth";

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
    const request = new ApiRequest();
    const res = await request.axiosInstance.post<AuthRespInterface>(
      "auth/login",
      {
        email,
        password,
      }
    );

    const resData = res.data;
    if (resData.success) {
      const jwtParsed = jwtDecode(resData.token) as {
        sub: string;
      };
      localStorage.setItem("user", JSON.stringify(jwtParsed.sub));
      await Auth.authenticateUser(resData);
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
