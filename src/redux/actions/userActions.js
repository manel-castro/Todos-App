import * as types from "./actionTypes";
import firebase from "firebase";

//Todo: manage errors redux.

export function userLoginSuccess(cred) {
  return { type: types.USER_LOGIN_SUCCESS, cred };
}

export function userSignupSuccess(newUserCredentials) {
  return { type: types.USER_SIGNUP_SUCCESS, newUserCredentials };
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
        console.log("Logged, credentials:");
        console.log(cred.uid);
        dispatch(userLoginSuccess(cred.uid));
        console.log("success");
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
