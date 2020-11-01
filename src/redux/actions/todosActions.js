import * as firebase from "firebase/app";
import "firebase/firestore";

import * as types from "./actionTypes";
import * as todosExtraActions from "./todosExtraActions";
import * as callsInProgressActions from "./callsInProgressActions";

import { v4 as uuid } from "uuid";
const clone = require("rfdc")();
import { subItemPath as subItemPathFunc } from "../redux-helpers/subItemPath";
import { reorderTodos } from "../redux-helpers/todosHelpers";

//DEVELOPMENT ACTIONS
export function deleteAllTodosSuccess() {
  return { type: types.DELETE_ALL_TODOS_SUCCESS };
}

// ----------------
export function getTodosSuccess(todos) {
  return { type: types.GET_TODOS_SUCCESS, todos };
}

//USED TO MANAGE FIREBASE ON SNAPSHOT, TO AVOID RERENDERING FULL INDIVIDUAL ITEMS
//export function modifiedTodoBackEnd(id, todo) {
//  return { type: types.MODIFIED_TODO_BACK_END, id, todo };
//}

export function addTodoSuccess(todo) {
  return { type: types.ADD_TODO_SUCCESS, todo };
}

export function modifyTodoSuccess(dataUpdate, todoId, isNew) {
  return { type: types.MODIFY_TODO_SUCCESS, dataUpdate, todoId, isNew };
}
export function moveTodoOrderSuccess(orderedTodos) {
  return { type: types.MOVE_TODO_ORDER_SUCCESS, orderedTodos };
}

// on creation of Todo we mark is as is new in order to limit some other actions. We autofocus and autoscroll in based of "isNew" when Add Todo buton is pressed.
export function markTodoIsNewSuccess(todoId) {
  return { type: types.MARK_TODO_IS_NEW_SUCCESS, todoId };
}

//dispatched when todo modified
export function dismarkTodoIsNew(todoId) {
  return { type: types.DISMARK_TODO_IS_NEW, todoId };
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

//SUBITEMS ACTIONS. I want to keep subItems inside Todos document since its saving document reads and it could save document writes significantly pooling up updates.

export function openSubItemLevel(todoId, key, action) {
  return { type: types.OPEN_SUB_ITEM_LEVEL, todoId, key, action };
}

export function addSubItemSuccess(todoData, todoId, subItemPath, isDeepNested) {
  return {
    type: types.ADD_SUB_ITEM_SUCCESS,
    todoData,
    todoId,
    subItemPath,
    isDeepNested,
  };
}

export function modifySubItemSuccess(
  todoData,
  todoId,
  subItemPath,
  isDeepNested
) {
  return {
    type: types.MODIFY_SUB_ITEM_SUCCESS,
    todoData,
    todoId,
    subItemPath,
    isDeepNested,
  };
}

export function deleteSubItemSuccess(todoId, subItemPath, isDeepNested) {
  return {
    type: types.DELETE_SUB_ITEM_SUCCESS,
    todoId,
    subItemPath,
    isDeepNested,
  };
}
//
//THUNKS

export const moveTodoOrder = (activeTodoId, todoToSwitchId, action) => (
  dispatch,
  getState
) => {
  const { todos } = getState();
  const clonedTodos = clone(todos);
  let newReduxTodos;

  let firebaseItem1, firebaseItem2;

  if (action === "up") {
    const reordered = reorderTodos(clonedTodos, activeTodoId, todoToSwitchId);
    newReduxTodos = reordered[0];
    firebaseItem1 = reordered[1];
    firebaseItem2 = reordered[2];
  }

  if (action === "down") {
    const reversedTodos = clonedTodos.reverse(); //very important
    const reordered = reorderTodos(reversedTodos, activeTodoId, todoToSwitchId);
    newReduxTodos = reordered[0].reverse();
    firebaseItem1 = reordered[1];
    firebaseItem2 = reordered[2];
  }
  if (action !== "up" && action !== "down")
    throw `Look at the todos actions, action sent: ${action}`;

  dispatch(moveTodoOrderSuccess(newReduxTodos));

  // firebase should be another action that it's only dispatched after certain time, and updates those documents that had changes on the order. We could also have the order separated in another document in a collection "extraDataTodos", so that we can poolUp orders. To order de todos on getTodos we should get this document by separate an then match them.

  console.log("-------------");
  console.log("newTodos");
  console.log(newReduxTodos);
  console.log("for firebase", firebaseItem1, firebaseItem2);
};

//Development thunks...
export function deleteAllTodos() {
  return function (dispatch, getState) {
    const { todos } = getState();
    todos.forEach((todo) => {
      dispatch(deleteTodo(todo));
    });
  };
}
//---------------
export const markTodoIsNew = (todoId) => (dispatch, getState) => {
  const { todosExtra } = getState();

  if (todosExtra.isAnyNewTodoCount.length > 0) return;
  dispatch(markTodoIsNewSuccess(todoId));
};
//
//

export function getReduxTodos() {
  return function (dispatch, getState) {
    const { todos } = getState();
    return todos;
  };
}
//should look in cookies first?
export function getTodos() {
  return function (dispatch, getState) {
    const userUid = getState().user.uid;
    firebase
      .firestore()
      .collection("todos")
      .where("userId", "==", userUid)
      .orderBy("orderCount", "desc")
      .get()
      .then((querySnapshot) => {
        const todos = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        //  .onSnapshot((serverUpdate) => {
        //    serverUpdate.docChanges().forEach((change) => {
        //      if (change.type === "modified") {
        //        console.log("ALERt: ", change.doc.id, change.doc.data());
        //        dispatch(modifiedTodoBackEnd(change.doc.id, change.doc.data()));
        //        breaker = true;
        //      }
        //    });
        //    if (breaker) {
        //      breaker = false;
        //      return;
        //    }
        //    console.log("ALL SNAPSHOT");
        //    const todos = serverUpdate.docs.map(
        //      (todo) => {
        //        const data = todo.data();
        //        data["id"] = todo.id;
        //        return data;
        //      },
        //      (err) => {
        //        throw err;
        //      }
        //    );
        dispatch(getTodosSuccess(todos));
      });
  };
}

export const addTodo = () => async (dispatch, getState) => {
  dispatch(callsInProgressActions.startActionCall("add todo"));
  const { todosExtra } = getState();
  if (todosExtra.isAnyNewTodoCount.length > 0) {
    /// END API CALL
    throw "Todo already created.";
  }

  const { todos } = getState();
  const orderCount = todos[0] ? todos[0].orderCount + 1 : 0;

  const userUid = getState().user.uid;
  let newTodoData = {
    title: "Enter your title here...",
    subItems: {},
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userId: userUid,
    isNew: true,
    orderCount: orderCount,
  };
  let newTodoLocalData = newTodoData;
  let newId = uuid();
  newTodoLocalData["id"] = newId;
  dispatch(addTodoSuccess(newTodoLocalData));

  //  firebase
  //    .firestore()
  //    .collection("todos")
  //    .doc(newId)
  //    .set(newTodoData)
  //    .catch((err) => {
  //      dispatch(deleteTodoOptimistic(newTodoLocalData));
  //      dispatch(todosExtraActions.dismarkNewTodoCount());
  //      dispatch(callsInProgressActions.endActionCall("add todo"));
  //      throw err;
  //    });
  dispatch(callsInProgressActions.endActionCall("add todo"));
  //need to update store to avoid fire Snapshot.

  return;
};

export const modifyTodo = (todoId, title, isNew = false) => async (
  dispatch,
  getState
) => {
  const { todosExtra } = getState();
  if (todosExtra.isAnyNewTodoCount === todoId) {
    dispatch(todosExtraActions.dismarkNewTodoCount());
  }
  //const userUid = getState().user.uid;
  //The next code is made to handle the property of New in each TODO document. which only exist when it's created, and then here it's deleted at first modification
  let dataUpdate = {};
  if (isNew === true) {
    dataUpdate = {
      isNew: firebase.firestore.FieldValue.delete(),
      title: title,
    };
  } else {
    dataUpdate = {
      title: title,
    };
  }
  /// ------------
  //  firebase
  //    .firestore()
  //    .collection("todos")
  //    .doc(todoId)
  //    .update(dataUpdate)
  //    .catch((err) => {
  //      throw err;
  //    });
  //need to update store to avoid fire Snapshot.
  await dispatch(modifyTodoSuccess(title, todoId, isNew));
};

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
  return function (dispatch, getState) {
    dispatch(deleteTodoOptimistic(todo));
    const { todosExtra } = getState();
    if (todosExtra.isAnyNewTodoCount === todo.id) {
      dispatch(todosExtraActions.dismarkNewTodoCount());
    }
    firebase
      .firestore()
      .collection("todos")
      .doc(todo.id)
      .delete()
      .catch((err) => {
        throw err;
      });
  };
}

export const addSubItem = (
  todo,
  subItemParentId = false,
  subItemText = "Edit your sub-item"
) => async (dispatch) => {
  const todoId = todo.id;

  let firebaseObjectPath = "subItems";
  let orderCount;

  //Set subItemPath and backEnd path
  let subItemPath = {};
  let isDeepNested = false;
  if (subItemParentId) {
    isDeepNested = true;
    subItemPath = subItemPathFunc(subItemParentId, todo);
    subItemPath.forEach((item) => {
      firebaseObjectPath = firebaseObjectPath + "." + item;
    });
  }

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

  let newSubItemId = uuid().substring(0, 13);
  let localSubItemData = {
    [newSubItemId]: {
      title: subItemText,
      orderCount: orderCount,
      randomProperty: uuid(),
    },
  };

  dispatch(
    addSubItemSuccess(localSubItemData, todoId, subItemPath, isDeepNested)
  );
  firebaseObjectPath = firebaseObjectPath + "." + newSubItemId;

  await firebase
    .firestore()
    .collection("todos")
    .doc(todoId)
    .update({
      [firebaseObjectPath]: {
        title: subItemText,
        orderCount: orderCount,
      },
    })
    .then(() => {
      // STop api call redux
    })
    .catch((err) => {
      // throw errors redux
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

  firebaseObjectPath = firebaseObjectPath + ".title";
  const todoData = {
    [subItemId]: {
      title: subItemText,
    },
  };
  let isDeepNested = false;

  if (subItemPath.length - 1 > 0) {
    isDeepNested = true;
  }
  dispatch(modifySubItemSuccess(todoData, id, subItemPath, isDeepNested));

  await firebase
    .firestore()
    .collection("todos")
    .doc(id)
    .update({
      [firebaseObjectPath]: subItemText,
    })
    .then(() => {
      // Stop api call redux
    })
    .catch((err) => {
      // throw error redux
      throw err;
    });
};

export const deleteSubItem = (todo, subItemId) => async (dispatch) => {
  const { id } = todo;

  let firebaseObjectPath = "subItems";

  const subItemPath = subItemPathFunc(subItemId, todo);
  subItemPath.forEach((item) => {
    firebaseObjectPath = firebaseObjectPath + "." + item;
  });

  let isDeepNested = false;
  if (subItemPath.length > 1) isDeepNested = true;

  dispatch(deleteSubItemSuccess(id, subItemPath, isDeepNested));

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
      // Stop api call redux
    })
    .catch((err) => {
      //Throw error redux
      throw err;
    });
};
