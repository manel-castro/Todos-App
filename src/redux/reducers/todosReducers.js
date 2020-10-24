import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function todosReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.GET_TODOS_SUCCESS:
      //trying to optimize rerenders of every todo.
      //It should only update the key whose info has been updated
      //Not working for now
      // const newArray = state.map((todo) => {
      //   return action.todos.map((aTodo) => {
      //     if (todo.id === aTodo.id) return { ...todo, ...aTodo };
      //     return;
      //   });
      // });
    //  console.log("----SNAPSHOT: ", action.todos);
      return [...action.todos];

    case types.MODIFIED_TODO_BACK_END:
      return state.map((todo) => {
        return todo.id === action.id ? { ...todo, ...action.todo } : todo;
      });

    case types.ADD_TODO_SUCCESS:
      return [...state];
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
    case types.OPEN_SUB_ITEM_LEVEL:
      return state.map((todo) => {
        return todo.id === action.todoId
          ? {
              ...todo,
              openedKeys: {
                ...todo.openedKeys,
                [action.key]: action.action,
              },
            }
          : todo;
      });

    default:
      return state;
  }
}
