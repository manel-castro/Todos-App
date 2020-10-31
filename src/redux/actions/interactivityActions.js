import * as types from "./actionTypes";

export function setItemPosition(todoId, position, height) {
  return { type: types.SET_ITEM_POSITION, todoId, position, height };
}

export function allTodoItemsMounted(state) {
  return { type: types.ALL_TODO_ITEMS_MOUNTED, state };
}

//thunks
export const getTodosInteractivity = () => (dispatch, getState) => {
  const { interactivity, todos } = getState();
  const todosStyling = interactivity.todos;

  return todosStyling;
};

export const areAllTodoItemsMounted = () => (dispatch) => {
  let elementToWatch = document.getElementById("TodoItemObserver");
  console.log("ELEMENT TO WATCH ----------", elementToWatch);
  let flag = elementToWatch === null ? true : false;
  const something = async () => {
    if (flag) {
      console.log("ARE ALL TODO ITEMS MOUNTED", flag);
      window.setTimeout(areAllTodoItemsMounted(), 3000);
    } else {
      console.log("AAAAAAAAALLL MOUNTED");
      await this.dispatch(allTodoItemsMounted(true));
    }
  };
  something();
};
