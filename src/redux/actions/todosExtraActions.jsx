import * as types from "./actionTypes";

export function markNewTodoCount(todoId) {
  return { type: types.MARK_NEW_TODO_COUNT, todoId };
}

export function dismarkNewTodoCount() {
  return { type: types.DISMARK_NEW_TODO_COUNT };
}
