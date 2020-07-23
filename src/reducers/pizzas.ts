import { AppActions, Pizza } from "../actions";
import { ActionTypes } from "../actions/types";

const defaultState = [
  {
    description:
      "Pepperoni is an American variety of salami, made from cured pork and beef mixed together and seasoned with paprika or other chili pepper.",
    image:
      "https://vignette.wikia.nocookie.net/oddsquad/images/f/f4/Pizza.png/revision/latest?cb=20170203223737",
    ingredients: [
      "Olive oil",
      "oregano",
      "pepperoni salami",
      "yellow cheese",
      "tomato sauce",
    ],
    likes: [],
    name: "Pepperoni",
    price: 9.9,
    private: false,
    reviews: [],
    weight: 450,
    __v: 0,
    _id: "5ef48f85f5853e6de413204e",
  },
];

export const pizzasReducer = (
  state: Pizza[] = defaultState,
  action: AppActions
) => {
  switch (action.type) {
    case ActionTypes.setPizzas:
      return action.payload;
    default:
      return state;
  }
};
