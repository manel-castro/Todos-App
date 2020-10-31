import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function interactivityReducer(
  state = initialState.interactivity,
  action,
  todos = initialState.todos
) {
  switch (action.type) {
    case types.SET_ITEM_POSITION:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.todoId,
            position: action.position,
            height: action.height,
            upperLimit: action.position,
            lowerLimit: action.position + action.height,
          },
        ],
      };
    case types.ALL_TODO_ITEMS_MOUNTED:
      return { ...state, allTodoItemsMounted: action.state };
    default:
      return state;
  }
}
