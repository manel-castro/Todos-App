import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducers(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        uid: action.credentials,
      };
    case types.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        uid: action.credentials,
      };
    case types.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        uid: null,
      };
    default:
      return state;
  }
}
