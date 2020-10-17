import * as types from "./actionTypes";
import firebase from "firebase";

export function getTodosSuccess(todos) {
  return { type: types.GET_TODOS_SUCCESS, todos };
}

export function addTodoSuccess() {
  return { type: types.ADD_TODO_SUCCESS };
}

export function modifyTodoSuccess() {
  return { type: types.MODIFY_TODO_SUCCESS };
}

export function markTodoCompletedOptimistic(todo) {
  return { type: types.MARK_TODO_COMPLETED_OPTIMISTIC, todo };
}

export function deleteTodoOptimistic(todo) {
  return { type: types.DELETE_TODO_OPTIMISTIC, todo };
}

export function openSubItemLevel(todoId, key, action) {
  return { type: types.OPEN_SUB_ITEM_LEVEL, todoId, key, action };
}

//
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
    console.log("addTodo fired");
    firebase
      .firestore()
      .collection("todos")
      .add({
        title: "Enter your title here...",
        subItems: {},
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: userUid,
      })
      .catch((err) => {
        throw err;
      });

    //need to update store to avoid fire Snapshot.
    dispatch(addTodoSuccess());

    return;
  };
}

export function modifyTodo(todoId, title) {
  return function (dispatch, getState) {
    //const userUid = getState().user.uid;
    console.log("modifyTodo fired");
    firebase
      .firestore()
      .collection("todos")
      .doc(todoId)
      .update({
        title: title,
      })
      .catch((err) => {
        throw err;
      });
    //need to update store to avoid fire Snapshot.
    dispatch(modifyTodoSuccess());

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

export const addSubItem = (
  todo,
  todoLevel,
  subItemLevel,
  subItemText
) => async (dispatch) => {
  const { id } = todo;

  let subItem = "subItem" + todoLevel;
  //I can only do One subItem per level for now. Transform to Object with dot notation.

  await firebase
    .firestore()
    .collection("todos")
    .doc(id)
    .update({
      "subItem.subItem2": firebase.firestore.FieldValue.delete(),
    })
    .then(() => {
      dispatch(addTodoSuccess());
    })
    .catch((err) => {
      throw err;
    });
};

//Delete field in map firestore
//.update({
//  "subItem.subItem2": firebase.firestore.FieldValue.delete(),
//})
