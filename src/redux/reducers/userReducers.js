import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducers(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      console.log("userlogged ");
      return [{ loggedIn: true, uid: action.credentials }];
    case types.USER_SIGNUP_SUCCESS:
      return [{ loggedIn: true, uid: action.credentials }];
    case types.USER_LOGOUT_SUCCESS:
      return [{ loggedIn: false }];
    default:
      return state;
  }
}
