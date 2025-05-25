import { all } from "redux-saga/effects";
import sessionSaga from "./session/sagas";
import projectSaga from "./project/sagas";
import customerSaga from "./customer/sagas";
import skillArchitectureSaga from "./skillArchitecture/sagas";
import user from "./user/sagas";
import inventory from "./inventory/sagas";
import AdminInventory from "./adminInventory/sagas";

export default function* rootSaga() {
  yield all([
    sessionSaga(),
    projectSaga(),
    customerSaga(),
    skillArchitectureSaga(),
    user(),
    inventory(),
    AdminInventory(),
  ]);
}
