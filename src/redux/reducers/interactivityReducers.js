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
        positions: [
          ...state.positions,
          { id: action.todoId, position: action.position },
        ],
      };
    default:
      return state;
  }
}
