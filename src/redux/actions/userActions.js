import * as firebase from "firebase/app";
import "firebase/auth";
import { config } from "../../firebaseConfig";
import * as types from "./actionTypes";
import * as todosActions from "./todosActions";

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

export function resetPasswordSuccess() {
  return { type: types.RESET_PASSWORD_SUCCESS };
}

//
//Thunks

export function userLogin(user) {
  //eslint-disable-next-line
  return function (dispatch, getState) {
    const { email, password } = user;
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        dispatch(userLoginSuccess(cred.user.uid));
      })
      .catch((err) => {
        throw err;
      });
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
        dispatch(userLogoutSuccess());
      });
  };
}

export const verifyAuth = () => async (dispatch) => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      dispatch(userLoginSuccess(user.uid));
      dispatch(todosActions.getTodos());
    } else {
      dispatch(userLogoutSuccess());
    }
  });
};

export const resetPassword = (email) => async (dispatch) => {
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      dispatch(resetPasswordSuccess());
    })
    .catch(function (error) {
      throw error;
    });
};
