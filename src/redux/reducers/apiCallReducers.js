import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function apiCallReducers(
  state = initialState.accessUserErrors,
  action
) {
  switch (action.type) {
    case types.API_CALL_ERROR:
      return { ...state, ...action.error };
    default:
      return state;
  }
}
