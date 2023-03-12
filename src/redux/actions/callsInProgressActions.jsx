import * as types from "./actionTypes";

export function startActionCall(element) {
  return { type: types.START_ACTION_CALL, element };
}

export function endActionCall(element) {
  return { type: types.END_ACTION_CALL, element };
}
