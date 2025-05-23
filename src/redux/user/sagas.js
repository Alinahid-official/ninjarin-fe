import { call, cancel, takeLatest } from "redux-saga/effects";
import UserActions from "./actions";
import UserEffects from "./effects";
import { runEffect } from "@/utilities/actionUtility";
import { resultHasError } from "@/utilities/onError";

function* GET_USERS() {
  const result = yield call(runEffect, null, UserEffects.getUsers);
  if (resultHasError(result)) yield cancel();
}

function* ADD_USER(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.createUser,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* DELETE_USER(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.deleteUser,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* UPDATE_USER(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.updateUser,
    action.payload.id,
    action.payload.update
  );
  if (resultHasError(result)) yield cancel();
}

function* GET_USER(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.getUserById,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

export default function* userSaga() {
  yield takeLatest(UserActions.GET_USERS, GET_USERS);
  yield takeLatest(UserActions.ADD_USER, ADD_USER);
  yield takeLatest(UserActions.DELETE_USER, DELETE_USER);
  yield takeLatest(UserActions.UPDATE_USER, UPDATE_USER);
  yield takeLatest(UserActions.GET_USER, GET_USER);
}
