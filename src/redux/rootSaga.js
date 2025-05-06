import { all } from "redux-saga/effects";
import sessionSaga from "./session/sagas";
import projectSaga from "./project/sagas";
import customerSaga from "./customer/sagas";

export default function* rootSaga() {
  yield all([sessionSaga(), projectSaga(), customerSaga()]);
}
