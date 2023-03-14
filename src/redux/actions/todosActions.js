import * as types from "./actionTypes";
import * as todosExtraActions from "./todosExtraActions";
import * as callsInProgressActions from "./callsInProgressActions";

import { v4 as uuid } from "uuid";
const clone = require("rfdc")();
import { subItemPath as subItemPathFunc } from "../redux-helpers/subItemPath";
import { reorderTodos } from "../redux-helpers/todosHelpers";
import { db } from "./userActions";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, set, getDatabase } from "firebase/database";

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

export const moveTodoOrder =
  (activeTodoId, todoToSwitchId, action) => (dispatch, getState) => {
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
      const reordered = reorderTodos(
        reversedTodos,
        activeTodoId,
        todoToSwitchId
      );
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
  return async function (dispatch, getState) {
    const userUid = getState().user.uid;
    console.log("userUid: ", userUid);

    const q = query(
      collection(db, "todos"),
      where("userId", "==", userUid),
      orderBy("orderCount", "desc")
    );

    const querySnapshot = await getDocs(q);

    const todos = querySnapshot?.docs?.map((doc) => {
      const data = doc.data();
      data["id"] = doc.id;
      if (data.isNew) dispatch(todosExtraActions.markNewTodoCount(doc.id));
      return data;
    });
    dispatch(getTodosSuccess(todos));

    // db.collection("todos")
    //   .where("userId", "==", userUid)
    //   .orderBy("orderCount", "desc")
    //   .get()
    //   .then((querySnapshot) => {
    //     console.log("dbg1 querySnapshot: ", querySnapshot);
    //     const todos = querySnapshot?.docs?.map((doc) => {
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       if (data.isNew) dispatch(todosExtraActions.markNewTodoCount(doc.id));
    //       return data;
    //     });
    //     dispatch(getTodosSuccess(todos));
    //   });
  };
}

export const addTodo = () => async (dispatch, getState) => {
  const { todosExtra, callsInProgress } = getState();

  console.log("-----------------", callsInProgress);

  //  let todoItemInProgress = false;
  //  Object.keys(callsInProgress).forEach((item) => {
  //    console.log("ITEM---", item);
  //    if (item === "TodoItem") todoItemInProgress = true;
  //  });
  //  console.log(todoItemInProgress);

  //  if (todoItemInProgress) return;
  dispatch(callsInProgressActions.startActionCall("addTodoButton"));
  if (todosExtra.isAnyNewTodoCount.length > 0) {
    /// END API CALL
    throw "Todo already created.";
  }
  let newId = uuid();
  dispatch(todosExtraActions.markNewTodoCount(newId));
  const { todos } = getState();
  const orderCount = todos[0] ? todos[0].orderCount + 1 : 0;

  const userUid = getState().user.uid;
  let newTodoData = {
    title: "Enter your title here...",
    subItems: {},
    timestamp: serverTimestamp(),
    userId: userUid,
    isNew: true,
    orderCount: orderCount,
  };
  let newTodoLocalData = newTodoData;
  newTodoLocalData["id"] = newId;
  dispatch(addTodoSuccess(newTodoLocalData));

  await setDoc(doc(db, "todos", newId), newTodoData);

  //  firebase
  //    .firestore()
  //    .collection("todos")
  //    .doc(newId)
  //    .set(newTodoData)
  //    .catch((err) => {
  //      dispatch(deleteTodoOptimistic(newTodoLocalData)); // instead of deleting the new todo, should let the user modify it, and just keep try to connect with the database, and warn the user that the changes still have not been saved.
  //      dispatch(todosExtraActions.dismarkNewTodoCount());
  //      dispatch(callsInProgressActions.endActionCall("add todo"));
  //      throw err;
  //    });
  dispatch(callsInProgressActions.endActionCall("addTodoButton"));
  //need to update store to avoid fire Snapshot.

  return;
};

export const modifyTodo =
  (todoId, title, isNew = false, modifyingElement) =>
  async (dispatch, getState) => {
    //control for calls in progress, if there is already one, skip this action.
    console.log("MODIFYING ELEMENT IS => ", modifyingElement);
    // It can happen, that the user starts modifying other todos while another another api call hasn't finished yet, so we should register the Todo Id
    dispatch(callsInProgressActions.startActionCall(modifyingElement));
    const { todosExtra } = getState();
    if (todosExtra.isAnyNewTodoCount === todoId) {
      dispatch(todosExtraActions.dismarkNewTodoCount());
    }
    //const userUid = getState().user.uid;
    //The next code is made to handle the property of New in each TODO document. which only exist when it's created, and then here it's deleted at first modification
    let dataUpdate = {};
    if (isNew === true) {
      dataUpdate = {
        isNew: deleteField(),
        title: title,
      };
    } else {
      dataUpdate = {
        title: title,
      };
    }

    updateDoc(doc(db, `todos`, todoId), dataUpdate);

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
    dispatch(callsInProgressActions.endActionCall(modifyingElement));
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

    deleteDoc(doc(db, "todos", todo.id));
    // db.collection("todos")
    //   .doc(todo.id)
    //   .delete()
    //   .catch((err) => {
    //     throw err;
    //   });
  };
}

export const addSubItem =
  (todo, subItemParentId = false, subItemText = "Edit your sub-item") =>
  async (dispatch) => {
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

    await db
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

export const modifySubItem =
  (todo, subItemId, subItemText) => async (dispatch) => {
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

    await db
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
  //  "subItem.subItem2": db.FieldValue.delete(),
  //})
  await db
    .collection("todos")
    .doc(id)
    .update({
      [firebaseObjectPath]: db.FieldValue.delete(),
    })
    .then(() => {
      // Stop api call redux
    })
    .catch((err) => {
      //Throw error redux
      throw err;
    });
};
