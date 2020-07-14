import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";

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

export const fetchPizzas = () => {
  return async (dispatch: Dispatch) => {
    const resp = await axios.get<Pizza[]>("http://localhost:4000/pizza/all");

    dispatch<FetchPizzasAction>({
      type: ActionTypes.setPizzas,
      payload: resp.data,
    });
  };
};
