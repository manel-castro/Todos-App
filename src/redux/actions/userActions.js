import * as types from "./actionTypes";
import firebase from "firebase";

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
        console.log("Signed Out");
        dispatch(userLogoutSuccess());
      });
  };
}
