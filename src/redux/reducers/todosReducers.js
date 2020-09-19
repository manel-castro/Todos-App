import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function todosReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.GET_TODOS_SUCCESS:
      return [...action.todos];
    case types.ADD_TODO_SUCCESS:
      return state;
    case types.MARK_TODO_COMPLETED_OPTIMISTIC:
      return state.map((todo) => {
        return todo.id === action.todo.id
          ? { ...todo, ...!todo.completed }
          : todo;
      });
    case types.DELETE_TODO_OPTIMISTIC:
      return state.filter((todo) => {
        return todo.id !== action.todo.id;
      });
    case types.USER_LOGOUT_SUCCESS:
      return [];
    default:
      return state;
  }
}
