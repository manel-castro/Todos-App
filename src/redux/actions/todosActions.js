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

// export function errorMarkTodoCompletedOptimistic(todo) {
//   return { type: types.ERROR_MARK_TODO_COMPLETED_OPTIMISTIC, todo };
// }

export function deleteTodoSuccess(todo) {
  return { type: types.DELETE_TODO_SUCCESS, todo };
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
        console.log("Snapshot fired");
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
    return;
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
    return;
  };
}

export function markTodoCompleted(todo) {
  return function (dispatch, getState) {
    console.log("markcompletedaction fired");
    dispatch(markTodoCompletedOptimistic(todo));
    return firebase
      .firestore()
      .collection("todos")
      .doc(todo.id + 1)
      .update({
        completed: !todo.completed,
      })
      .catch((err) => {
        // dispatch(errorMarkTodoCompletedOptimistic(todo));
        throw err;
      });
  };
}

//need to implement pendant:
export function deleteTodo(todo) {
  return function (dispatch, getState) {
    if (window.confirm("Are you sure to delete this note?")) {
      return firebase
        .firestore()
        .collection("todos")
        .doc(todo.id)
        .delete()
        .catch((err) => {
          throw err;
        });
    }
  };
}
