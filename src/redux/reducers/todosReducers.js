import * as types from "../actions/actionTypes";
import initialState from "./initialState";

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
      state.map((todo) => {
        if (todo.id === action.todoId) {
          if (action.subItemPath === false) {
            return {
              ...todo,
              subItems: { ...action.todoData, ...todo.subItems },
            };
          } else {
            let { subItems } = todo;
            let newObj = subItems;
            let level = action.subItemPath.length;
            let interation = (obj, addItem = false, id = null) => {
              return addItem ? { ...obj, [id]: { ...addItem } } : { ...obj };
            };
            action.subItemPath.forEach((item) => {
              level--;
              const iterationOne = iteration(newObj);

              if (level === 0) {
                newObj[item] = {
                  ...newObj[item],
                  ...action.todoData,
                };
                newObj[item] = { ...newObj[item] };
              }
            });
            console.log("NEW OBJ");
            console.log(newObj);
            return newObj;
          }
        }
      });
      //console.log("NEW TODO REDUX IS: ", newTodo);
      return state;
    default:
      return state;
  }
}
