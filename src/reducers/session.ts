import { ActionTypes } from "../actions/types";
import { AppActions } from "../actions";

export function sessionReducer(authorized = false, action: AppActions) {
  switch(action.type) {
  case ActionTypes.authSuccess: {
    return true;
  }
  case ActionTypes.logout: {
    return false;
  }
  default:
      return authorized;
  }
}