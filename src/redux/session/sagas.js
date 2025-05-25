import { all, call, cancel, put, takeEvery } from "redux-saga/effects";
import { runEffect } from "../../utilities/actionUtility";
import SessionEffects from "./effects";
import { resultHasError } from "@/utilities/onError";
import { router } from "@/utilities/routes";
import UserEffects from "../user/effects";
import CustomerEffects from "../customer/effects";
import CustomerActions from "../customer/actions";

function* REQUEST_LOGIN(action) {
  const result = yield call(
    runEffect,
    action,
    SessionEffects.login,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
  const userDetails = result.data.userDetails;
  const token = result.data.token;
  localStorage.setItem("accessToken", token);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  if (userDetails?.role === "admin") {
    router.navigate(`/customers/${userDetails?.customerId}/home`);
  } else {
    router.navigate("/home");
  }
}

function* SET_CURRENT_CUSTOMER(action) {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const customer = yield call(
    runEffect,
    action,
    CustomerEffects.getCustomerById,
    userDetails?.customerId
  );

  if (resultHasError(customer)) yield cancel();
  yield put(CustomerActions.setCurrentCustomer(customer.data));
}
export default function* sessionSaga() {
  yield all([
    takeEvery("session/REQUEST_LOGIN", REQUEST_LOGIN),
    takeEvery("session/SET_CURRENT_CUSTOMER", SET_CURRENT_CUSTOMER),
  ]);
}
