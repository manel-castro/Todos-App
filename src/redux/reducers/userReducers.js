import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducers(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      console.log(action.userCredentials);
      return state;
    case types.USER_SIGNUP_SUCCESS:
      console.log(action.newUserCredentials);
      return state;
    case types.USER_LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
}
