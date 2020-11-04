import * as types from "../actions/actionTypes";
import initialState from "./initialState";

import { deleteArrayItemById } from "../../shared/utils/js-plain-arrays";

export default function callsInProgress(
  state = initialState.callsInProgress,
  action
) {
  switch (action.type) {
    case types.START_ACTION_CALL:
      return [...state, { id: action.element }];

    case types.END_ACTION_CALL: {
      return deleteArrayItemById(state, action.element);
    }
    default:
      return state;
  }
}
