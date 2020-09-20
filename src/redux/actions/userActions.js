import * as types from "./actionTypes";
import { config } from "../../firebaseConfig";
import firebase from "firebase";
import * as todosActions from "./todosActions";
require("firebase/firestore");

firebase.initializeApp(config);

//Todo: manage errors redux.

export function userLoginSuccess(credentials) {
  return { type: types.USER_LOGIN_SUCCESS, credentials };
}

export function userSignupSuccess(credentials) {
  return { type: types.USER_SIGNUP_SUCCESS, credentials };
}

export function userLogoutSuccess() {
  return { type: types.USER_LOGOUT_SUCCESS };
}

//
//Thunks

export function userLogin(user) {
  return function (dispatch, getState) {
    const { email, password } = user;
    console.log("action userLogin");
    setTimeout(() => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((cred) => {
          dispatch(userLoginSuccess(cred.user.uid));
        })
        .catch((err) => {
          throw err;
        });
    }, 2000);
  };
}

export function userSignup(newUserData) {
  return function (dispatch) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(newUserData.email, newUserData.password)
      .then((cred) => {
        dispatch(userSignupSuccess(cred.user.uid));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function userLogout() {
  return function (dispatch) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out");
        dispatch(userLogoutSuccess());
      });
  };
}

export const verifyAuth = () => async (dispatch) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      console.log("userLogged");
      console.log(user);
      dispatch(userLoginSuccess(user.uid));
      dispatch(todosActions.getTodos());
    } else {
      dispatch(userLogoutSuccess());
    }
  });
};
