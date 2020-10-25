import * as firebase from "firebase/app";
import "firebase/firestore";

import * as types from "./actionTypes";

import { v4 as uuid } from "uuid";
import { subItemPath as subItemPathFunc } from "../redux-helpers/subItemPath";

export function getTodosSuccess(todos) {
  return { type: types.GET_TODOS_SUCCESS, todos };
}

export function modifiedTodoBackEnd(id, todo) {
  return { type: types.MODIFIED_TODO_BACK_END, id, todo };
}

export function addTodoSuccess() {
  return { type: types.ADD_TODO_SUCCESS };
}

export function modifyTodoSuccess() {
  return { type: types.MODIFY_TODO_SUCCESS };
}

{
  /* Potentially useful for labeling notes
export function markTodoCompletedOptimistic(todo) {
  return { type: types.MARK_TODO_COMPLETED_OPTIMISTIC, todo };
}
*/
}

export function deleteTodoOptimistic(todo) {
  return { type: types.DELETE_TODO_OPTIMISTIC, todo };
}

export function openSubItemLevel(todoId, key, action) {
  return { type: types.OPEN_SUB_ITEM_LEVEL, todoId, key, action };
}

export function addSubItemSuccess() {
  return { type: types.ADD_SUB_ITEM_SUCCESS };
}

export function modifySubItemSuccess() {
  return { type: types.MODIFY_SUB_ITEM_SUCCESS };
}

export function deleteSubItemSuccess() {
  return { type: types.DELETE_SUB_ITEM_SUCCESS };
}

//
//THUNKS

export function getTodos() {
  return function (dispatch, getState) {
    const userUid = getState().user.uid;
    let breaker = false;

    firebase
      .firestore()
      .collection("todos")
      .where("userId", "==", userUid)
      .orderBy("timestamp", "desc")
      .onSnapshot((serverUpdate) => {
        serverUpdate.docChanges().forEach((change) => {
          if (change.type === "modified") {
            console.log("ALERt: ", change.doc.id, change.doc.data());
            dispatch(modifiedTodoBackEnd(change.doc.id, change.doc.data()));
            breaker = true;
          }
        });
        if (breaker) {
          breaker = false;
          return;
        }
        console.log("ALL SNAPSHOT");
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

export function addTodo() {
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
  //eslint-disable-next-line
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

//DEPRECATED potentially useful for labeling
{
  /*
export function markTodoCompleted(todo) {
  return function (dispatch) {
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
*/
}

export function deleteTodo(todo) {
  return function (dispatch) {
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
  subItemParentId = false,
  subItemText = "Edit your sub-item"
) => async (dispatch) => {
  const { id } = todo;

  let firebaseObjectPath = "subItems";
  let orderCount;

  //Set subItemPath and backEnd path
  let subItemPath;
  if (subItemParentId) {
    subItemPath = subItemPathFunc(subItemParentId, todo);
    subItemPath.forEach((item) => {
      firebaseObjectPath = firebaseObjectPath + "." + item;
    });
  }

  console.log("TODO SUB COUNTER");

  const getCounter = (subItemPath) => {
    let currentOrderCount = 0;
    let counterPath = todo.subItems;

    subItemPath.forEach((item) => {
      counterPath = counterPath[item];
    });

    Object.keys(counterPath).forEach((key) => {
      if (typeof counterPath[key] === "object") currentOrderCount++;
    });
    currentOrderCount++;

    return currentOrderCount;
  };

  //Set orderCount-
  //  //Used for keeping order of subItems.
  if (subItemParentId) {
    orderCount = getCounter(subItemPath);
  } else {
    orderCount = Object.keys(todo.subItems).length + 1;
  }
  console.log("ORDER COUNT IS: ", orderCount);

  let newSubItemId = uuid().substring(0, 13);

  firebaseObjectPath = firebaseObjectPath + "." + newSubItemId;

  //  subItemPath = "subItems." + newSubItemId;

  //.update({
  //  "subItem.subItem2": firebase.firestore.FieldValue.delete(),
  //})
  await firebase
    .firestore()
    .collection("todos")
    .doc(id)
    .update({
      [firebaseObjectPath]: {
        title: subItemText,
        orderCount: orderCount,
      },
    })
    .then(() => {
      dispatch(addSubItemSuccess());
    })
    .catch((err) => {
      throw err;
    });
};

export const modifySubItem = (todo, subItemId, subItemText) => async (
  dispatch
) => {
  const { id } = todo;

  let firebaseObjectPath = "subItems";

  const subItemPath = subItemPathFunc(subItemId, todo);
  subItemPath.forEach((item) => {
    firebaseObjectPath = firebaseObjectPath + "." + item;
  });

  console.log(subItemPath);
  firebaseObjectPath = firebaseObjectPath + ".title";

  console.log("firebase is: ", firebaseObjectPath);

  //.update({
  //  "subItem.subItem2": firebase.firestore.FieldValue.delete(),
  //})
  await firebase
    .firestore()
    .collection("todos")
    .doc(id)
    .update({
      [firebaseObjectPath]: subItemText,
    })
    .then(() => {
      dispatch(modifySubItemSuccess());
    })
    .catch((err) => {
      throw err;
    });
};

//Delete field in map firestore
//.update({
//})

export const deleteSubItem = (todo, subItemId) => async (dispatch) => {
  const { id } = todo;

  let firebaseObjectPath = "subItems";

  const subItemPath = subItemPathFunc(subItemId, todo);
  subItemPath.forEach((item) => {
    firebaseObjectPath = firebaseObjectPath + "." + item;
  });

  console.log("localPath", subItemPath);

  console.log("firebase is: ", firebaseObjectPath);

  //.update({
  //  "subItem.subItem2": firebase.firestore.FieldValue.delete(),
  //})
  await firebase
    .firestore()
    .collection("todos")
    .doc(id)
    .update({
      [firebaseObjectPath]: firebase.firestore.FieldValue.delete(),
    })
    .then(() => {
      dispatch(deleteSubItemSuccess());
    })
    .catch((err) => {
      throw err;
    });
};
