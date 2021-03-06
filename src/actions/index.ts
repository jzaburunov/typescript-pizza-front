import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { LogoutAction, LoginAction } from "./login";
import { ApiRequest } from "../api/ApiRequest";

export interface Pizza {
  description: string;
  image: string;
  ingredients: Array<String>;
  likes: Array<{}>;
  name: string;
  price: number;
  private: boolean;
  reviews: Array<{}>;
  weight: number;
  __v: number;
  _id: string;
}

export interface FetchPizzasAction {
  type: ActionTypes.setPizzas;
  payload: Pizza[];
}

export const fetchPizzas = (): Function => {
  return async (dispatch: Dispatch) => {
    const request = new ApiRequest();
    const resp = await request.axiosInstance.get<Pizza[]>("pizza/all");

    dispatch<FetchPizzasAction>({
      type: ActionTypes.setPizzas,
      payload: resp.data,
    });
  };
};

export interface AddToCartAction {
  type: ActionTypes.addToCart;
  payload: Pizza;
}

export const addToCart = (pizza: Pizza): Function => {
  return async (dispatch: Dispatch) => {
    // TODO use axios
    const payload = pizza;
    // Dispatch
    dispatch<AddToCartAction>({
      type: ActionTypes.addToCart,
      payload,
    });
  };
};

export type AppActions =
  | AddToCartAction
  | FetchPizzasAction
  | LogoutAction
  | LoginAction;
