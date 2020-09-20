import * as types from "./actionTypes";
import firebase from "firebase";

export function getTodosSuccess(todos) {
  return { type: types.GET_TODOS_SUCCESS, todos };
}

export function addTodoSuccess() {
  return { type: types.ADD_TODO_SUCCESS };
}

export function markTodoCompletedOptimistic(todo) {
  return { type: types.MARK_TODO_COMPLETED_OPTIMISTIC, todo };
}

export function deleteTodoOptimistic(todo) {
  return { type: types.DELETE_TODO_OPTIMISTIC, todo };
}

//THUNKS

export function getTodos() {
  return function (dispatch, getState) {
    const userUid = getState().user.uid;

    firebase
      .firestore()
      .collection("todos")
      .where("userId", "==", userUid)
      .orderBy("timestamp", "desc")
      .onSnapshot((serverUpdate) => {
        const todos = serverUpdate.docs.map(
          (todo) => {
            const data = todo.data();
            data["id"] = todo.id;
            return data;
          },
          (err) => {
            throw err;
          }
        );
        dispatch(getTodosSuccess(todos));
      });
  };
}

export function addTodo(todo) {
  return function (dispatch, getState) {
    const userUid = getState().user.uid;

    firebase
      .firestore()
      .collection("todos")
      .add({
        title: todo.title,
        completed: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userUid,
      })
      .catch((err) => {
        throw err;
      });

    dispatch(addTodoSuccess());

    return;
  };
}

export function markTodoCompleted(todo) {
  return function (dispatch, getState) {
    dispatch(markTodoCompletedOptimistic(todo));
    firebase
      .firestore()
      .collection("todos")
      .doc(todo.id)
      .update({
        completed: !todo.completed,
      })
      .catch((err) => {
        throw err;
      });
  };
}

//need to implement pendant:
export function deleteTodo(todo) {
  return function (dispatch, getState) {
    dispatch(deleteTodoOptimistic(todo));
    setTimeout(() => {
      firebase
        .firestore()
        .collection("todos")
        .doc(todo.id)
        .delete()
        .catch((err) => {
          throw err;
        });
    }, 2000);
  };
}
