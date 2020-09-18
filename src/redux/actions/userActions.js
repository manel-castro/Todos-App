import * as types from "./actionTypes";
import firebase from "firebase";

//Todo: manage errors redux.

export function userLoginSuccess(userCredentials) {
  return { type: types.USER_LOGIN_SUCCESS, userCredentials };
}

export function userSignupSuccess(newUserCredentials) {
  return { type: types.USER_SIGNUP_SUCCESS, newUserCredentials };
}

export function userLogoutSuccess() {
  return { type: types.USER_LOGOUT_SUCCESS };
}

//
//Thunks

export function userLogin(userData) {
  return function (dispatch, getState) {
    console.log(userData);
    return firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((cred) => {
        console.log(cred);
        dispatch(userLoginSuccess(cred));
      })
      .catch((err) => {
        // setErrors((prevErrors) => ({
        //   ...prevErrors,
        //   userAccessError: err.message,
        // }));
        console.log(err.message);
        //**TODO**//
      });
  };
}

export function userSignup(newUserData) {
  return function (dispatch) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(newUserData.email, newUserData.password)
      .then((cred) => {
        dispatch(userSignupSuccess(cred));
      })
      .catch((err) => {
        // setErrors((prevErrors) => ({
        //   ...prevErrors,
        //   userAccessError: err.message,
        // }));

        //**TODO**//
        console.log(err.message);
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
