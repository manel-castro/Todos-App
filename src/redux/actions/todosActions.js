import * as types from "./actionTypes";
import firebase from "firebase";

export function getTodosSuccess(todos) {
  return { type: types.GET_TODOS_SUCCESS, todos };
}

//THUNKS

export function getTodos(userUid) {
  return function (dispatch, getState) {
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
