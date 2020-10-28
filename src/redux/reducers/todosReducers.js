import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { modifyAndReturnAllObj } from "../redux-helpers/subItemPath";

export default function todosReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.GET_TODOS_SUCCESS:
      return [...action.todos];

    //--- Used to manage snapshot and avoid full rerenders on all TodoItems.
    // case types.MODIFIED_TODO_BACK_END:
    //   return state.map((todo) => {
    //     return todo.id === action.id ? { ...todo, ...action.todo } : todo;
    //   });
    case types.MODIFY_TODO_SUCCESS:
      return state.map((todo) => {
        if (todo.id === action.todoId) {
          if (action.isNew) {
            const { isNew, ...rest } = todo;
            console.log("HERE IS");
            console.log({ ...rest });
            return { ...rest, title: action.dataUpdate };
          } else {
            return { ...todo, title: action.dataUpdate };
          }
        } else {
          return todo;
        }
      });

    case types.ADD_TODO_SUCCESS:
      return [{ ...action.todo }, ...state];

    case types.MARK_TODO_IS_NEW_SUCCESS:
      return state.map((todo) => {
        todo.id === action.todoId ? { ...state, isNew: true } : todo;
      });
    case types.DISMARK_TODO_IS_NEW:
      return state.map((todo) => {
        todo.id === action.todoId ? { ...state, isNew: false } : todo;
      });
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
    case types.ADD_SUB_ITEM_SUCCESS:
      console.log(action.subItemPath);
      return state.map((todo) => {
        if (todo.id !== action.todoId) {
          return todo;
        } else {
          if (action.subItemPath === false) {
            return {
              ...todo,
              subItems: { ...action.todoData, ...todo.subItems },
            };
          } else {
            const funcItemPath = [...action.subItemPath];
            const funcSubItems = todo.subItems;
            const funcTodoData = { ...action.todoData };
            const newSubItems = Object.assign(
              {},
              modifyAndReturnAllObj(funcSubItems, funcItemPath, funcTodoData)
            );
            const reduxFailure = { ...newSubItems[action.subItemPath[0]] };
            console.log("subItempath", action.subItemPath[0]);
            console.log("newsubitems: ", newSubItems);
            console.log("redux: ", reduxFailure);
            return {
              ...todo,
              subItems: {
                ...newSubItems,
                ...todo.subItems,
              },
            };
          }
        }
      });
    default:
      return state;
  }
}
