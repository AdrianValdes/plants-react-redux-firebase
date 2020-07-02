import { auth } from '../config/firebaseConfig';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';
export const SET_AUTHED_USER = 'SET_AUTHED_USER';

//Sing up process
function signUpSuccess() {
  return {
    type: SIGN_UP_SUCCESS,
  };
}

function signUpError(err) {
  return {
    type: SIGN_UP_ERROR,
    err,
  };
}

export function handleSignUp(newUser) {
  return (dispatch) => {
    auth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        dispatch(signUpSuccess());
      })
      .catch((err) => {
        dispatch(signUpError(err));
      });
  };
}

//Sign in process
function signInSuccess() {
  return {
    type: SIGN_IN_SUCCESS,
  };
}

function signInError(err) {
  return {
    type: SIGN_IN_ERROR,
    err,
  };
}

export function handleSignIn(user) {
  return (dispatch) => {
    auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        dispatch(signInSuccess());
      })
      .catch((err) => {
        dispatch(signInError(err.message));
      });
  };
}

//Sign out process
function signOut() {
  return {
    type: SIGN_OUT,
  };
}

function signOutError(err) {
  return {
    type: SIGN_OUT_ERROR,
    err,
  };
}

export function handleSignOut() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(signOut());
      })
      .catch((err) => {
        dispatch(signOutError(err.message));
      });
  };
}

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}
