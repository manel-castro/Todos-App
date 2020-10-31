import * as types from "./actionTypes";

export function setItemPosition(todoId, position, height) {
  return { type: types.SET_ITEM_POSITION, todoId, position, height };
}

export function allTodoItemsMounted(state) {
  return { type: types.ALL_TODO_ITEMS_MOUNTED, state };
}

//thunks
export function getTodosInteractivity() {
  return function (dispatch, getState) {
    const { interactivity, todos } = getState();
    const todosStyling = interactivity.todos;

    return todosStyling;
  };
}

export function areAllTodoItemsMounted() {
  return function (dispatch) {
    let isPageFullyLoaded = document.readyState;
    let flag = isPageFullyLoaded === "complete" ? false : true;
    const something = () => {
      if (flag) {
        console.log("ARE ALL TODO ITEMS MOUNTED", flag);
        window.setTimeout(areAllTodoItemsMounted(), 3000);
      } else {
        console.log("AAAAAAAAALLL MOUNTED");
        dispatch(allTodoItemsMounted(true));
      }
    };
    something();
  };
}
