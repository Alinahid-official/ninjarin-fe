import { all, call, takeEvery } from "redux-saga/effects";
import { runEffect } from "../../utilities/actionUtility";
import SessionEffects from "./effects";
function* REQUEST_LOGIN(action) {
  console.log("REQUEST_LOGIN", action);
  yield call(runEffect, action, SessionEffects.login);
}
export default function* sessionSaga() {
  yield all([takeEvery("session/REQUEST_LOGIN", REQUEST_LOGIN)]);
}
