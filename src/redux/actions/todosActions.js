import * as types from "./actionTypes";
import firebase from "firebase";

export function getTodosSuccess(todos) {
  return { type: types.GET_TODOS_SUCCESS, todos };
}

export function addTodoSuccess() {
  return { type: types.ADD_TODO_SUCCESS };
}

//THUNKS

export function getTodos() {
  return function (dispatch, getState) {
    const userUid = getState().user[0].uid;
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
    const userUid = getState().user[0].uid;

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
  };
}
