import * as types from "../actions/actionTypes";
import initialState from "./initialState";
// Import customized algorithms for the characteristics of our database.
import {
  modifyPropertyAndReturnAllObj,
  addObjAndReturnAllObj,
  deleteObjAndReturnAllObj,
  deleteSubItemAndReorder,
} from "../redux-helpers/subItemPath";
const clone = require("rfdc")(); // very important libary to fast clonning deep nested objects. Important to preserve inmutability. Common operators do shallow-copies.

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
    case types.MOVE_TODO_ORDER_SUCCESS:
      return [...action.orderedTodos];

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
    case types.ADD_SUB_ITEM_SUCCESS: {
      return state.map((todo) => {
        if (todo.id !== action.todoId) {
          return todo;
        } else {
          if (action.isDeepNested === false) {
            return {
              ...todo,
              subItems: { ...todo.subItems, ...action.todoData },
            };
          } else {
            const funcSubItems = clone(todo.subItems);
            let newSubItems = addObjAndReturnAllObj(
              funcSubItems,
              action.subItemPath,
              action.todoData
            );
            return {
              ...todo,
              subItems: { ...newSubItems },
            };
          }
        }
      });
    }
    case types.MODIFY_SUB_ITEM_SUCCESS: {
      const todoData = action.todoData;
      return state.map((todo) => {
        const subItemId = Object.keys(todoData)[0];
        if (todo.id !== action.todoId) {
          return todo;
        } else {
          if (action.isDeepNested === false) {
            return {
              ...todo,
              subItems: {
                ...todo.subItems,
                [subItemId]: {
                  ...todo.subItems[subItemId],
                  ...action.todoData[subItemId],
                },
              },
            };
          } else {
            const funcSubItems = clone(todo.subItems);
            const newItemId = Object.keys(action.todoData)[0];
            const newItemData = action.todoData[newItemId];
            let newSubItems = modifyPropertyAndReturnAllObj(
              funcSubItems,
              action.subItemPath,
              newItemData
            );
            return {
              ...todo,
              subItems: { ...newSubItems },
            };
          }
        }
      });
    }
    case types.DELETE_SUB_ITEM_SUCCESS: {
      const todoData = action.todoData;
      return state.map((todo) => {
        const subItemId = action.subItemPath[action.subItemPath.length - 1];
        if (todo.id !== action.todoId) {
          return todo;
        } else {
          if (action.isDeepNested === false) {
            const funcSubItems = clone(todo.subItems);
            const newSubItems = deleteSubItemAndReorder(
              funcSubItems,
              subItemId
            );
            console.log(newSubItems);
            return {
              ...todo,
              subItems: {
                ...newSubItems,
              },
            };
          } else {
            const funcSubItems = clone(todo.subItems);
            const itemToDeleteId =
              action.subItemPath[action.subItemPath.length - 1];
            let newSubItems = deleteObjAndReturnAllObj(
              funcSubItems,
              action.subItemPath,
              itemToDeleteId
            );

            return {
              ...todo,
              subItems: { ...newSubItems },
            };
          }
        }
      });
    }
    default:
      return state;
  }
}
