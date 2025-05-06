import { all, call, cancel, takeEvery } from "redux-saga/effects";
import CustomerActions from "./actions";
import { runEffect } from "@/utilities/actionUtility";
import CustomerEffects from "./effects";
import { resultHasError } from "@/utilities/onError";

function* ADD_CUSTOMER(action) {
  const result = yield call(
    runEffect,
    action,
    CustomerEffects.createCustomer,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* GET_CUSTOMERS(action) {
  const result = yield call(runEffect, action, CustomerEffects.getCustomers);
  if (resultHasError(result)) yield cancel();
}

function* DELETE_CUSTOMER(action) {
  const result = yield call(
    runEffect,
    action,
    CustomerEffects.deleteCustomer,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

export default function* CustomerSaga() {
  yield all([
    takeEvery(CustomerActions.ADD_CUSTOMER, ADD_CUSTOMER),
    takeEvery(CustomerActions.GET_CUSTOMERS, GET_CUSTOMERS),
    takeEvery(CustomerActions.DELETE_CUSTOMER, DELETE_CUSTOMER),
  ]);
}
