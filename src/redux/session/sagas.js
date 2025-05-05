import { all, call, cancel, takeEvery } from "redux-saga/effects";
import { runEffect } from "../../utilities/actionUtility";
import SessionEffects from "./effects";
import { resultHasError } from "@/utilities/onError";
import { router } from "@/utilities/routes";
function* REQUEST_LOGIN(action) {
  const result = yield call(
    runEffect,
    action,
    SessionEffects.login,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
  router.navigate("/");
}
export default function* sessionSaga() {
  yield all([takeEvery("session/REQUEST_LOGIN", REQUEST_LOGIN)]);
}
