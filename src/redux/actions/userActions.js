import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { config } from "../../firebaseConfig";
import * as types from "./actionTypes";
import * as todosActions from "./todosActions";

const app = initializeApp(config);
export const db = getFirestore(app);

const auth = getAuth();

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

    signInWithEmailAndPassword(auth, email, password)
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
    return createUserWithEmailAndPassword(
      auth,
      newUserData.email,
      newUserData.password
    )
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
    signOut(auth).then(() => {
      dispatch(userLogoutSuccess());
    });
  };
}

export const verifyAuth = () => async (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(userLoginSuccess(user.uid));
      dispatch(todosActions.getTodos());
    } else {
      dispatch(userLogoutSuccess());
    }
  });
};

export const resetPassword = (email) => async (dispatch) => {
  await sendPasswordResetEmail(auth, email)
    .then(function () {
      dispatch(resetPasswordSuccess());
    })
    .catch(function (error) {
      throw error;
    });
};
