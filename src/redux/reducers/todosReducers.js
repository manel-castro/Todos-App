import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function todosReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.GET_TODOS_SUCCESS:
      return [...state, ...action.todos];
    case types.USER_LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}
