import { takeLatest, all, call, put } from "redux-saga/effects";
import USER_ACTION_TYPES from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutFailed,
} from "./user.action";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentWithAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase.utlis";

export function* getSnapShotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapShot = yield call(
      createUserDocumentWithAuth,
      userAuth,
      additionalInfo
    );
    // console.log(userSnapShot);
    // console.log(userSnapShot.data());
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signIn_Google_popup() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signInSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_STARTS,
    signIn_Google_popup
  );
}

export function* onSignInWithEmail() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_STARTS, signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_STARTS, signOut);
}
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onSignInWithEmail),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
