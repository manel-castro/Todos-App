import * as types from "./actionTypes";

export function apiCallError(error) {
  return { type: types.API_CALL_ERROR, error };
}
