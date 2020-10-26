import * as types from "../actions/actionTypes"; //eslint-disable-line
import initialState from "./initialState";

export default function todosReducer(state = initialState.colors, action) {
  switch (action.type) {
    default:
      console.log("from reducers", state);
      return state;
  }
}
