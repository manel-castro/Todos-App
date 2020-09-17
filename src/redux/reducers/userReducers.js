import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducers(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return console.log("userLogin");
    default:
      return state;
  }
}
