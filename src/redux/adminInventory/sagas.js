import { all, call, cancel, takeEvery } from "redux-saga/effects";
import AdminInventoryActions from "./actions";
import { runEffect } from "@/utilities/actionUtility";
import AdminInventoryEffects from "./effects";
import { resultHasError } from "@/utilities/onError";

function* ADD_ADMIN_INVENTORY(action) {
  const result = yield call(
    runEffect,
    action,
    AdminInventoryEffects.createAdminInventory,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* GET_ADMIN_INVENTORIES(action) {
  const result = yield call(
    runEffect,
    action,
    AdminInventoryEffects.getAdminInventories,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* DELETE_ADMIN_INVENTORY(action) {
  const result = yield call(
    runEffect,
    action,
    AdminInventoryEffects.deleteAdminInventory,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* UPDATE_ADMIN_INVENTORY(action) {
  const result = yield call(
    runEffect,
    action,
    AdminInventoryEffects.updateAdminInventory,
    action.payload.inventoryId,
    action.payload.inventory
  );
  if (resultHasError(result)) yield cancel();
}

function* GET_ADMIN_INVENTORY(action) {
  const result = yield call(
    runEffect,
    action,
    AdminInventoryEffects.getAdminInventoryById,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

export default function* AdminInventorySaga() {
  yield all([
    takeEvery(AdminInventoryActions.ADD_ADMIN_INVENTORY, ADD_ADMIN_INVENTORY),
    takeEvery(AdminInventoryActions.GET_ADMIN_INVENTORIES, GET_ADMIN_INVENTORIES),
    takeEvery(AdminInventoryActions.DELETE_ADMIN_INVENTORY, DELETE_ADMIN_INVENTORY),
    takeEvery(AdminInventoryActions.UPDATE_ADMIN_INVENTORY, UPDATE_ADMIN_INVENTORY),
    takeEvery(AdminInventoryActions.GET_ADMIN_INVENTORY, GET_ADMIN_INVENTORY),
  ]);
}