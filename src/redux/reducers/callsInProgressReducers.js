import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function callsInProgress(
  state = initialState.callsInProgress,
  action
) {
  switch (action.type) {
    case types.START_ACTION_CALL:
      return [...state, action.element];

    case types.END_ACTION_CALL:
      return state.filter((element) => element !== action.element);

    default:
      return state;
  }
}
