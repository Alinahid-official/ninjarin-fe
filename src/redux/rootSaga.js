import { all } from "redux-saga/effects";
import sessionSaga from "./session/sagas";
import projectSaga from "./project/sagas";

export default function* rootSaga() {
  yield all([sessionSaga(), projectSaga()]);
}
