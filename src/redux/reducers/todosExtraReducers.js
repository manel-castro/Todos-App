import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function todosExtraReducer(
  state = initialState.todosExtra,
  action
) {
  switch (action.type) {
    case types.MARK_NEW_TODO_COUNT:
      return {
        ...state,
        isAnyNewTodoCount: action.todoId,
      };
    case types.DISMARK_NEW_TODO_COUNT:
      return { ...state, isAnyNewTodoCount: "" };
    default:
      return state;
  }
}
