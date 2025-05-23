import { all, call, cancel, takeEvery } from "redux-saga/effects";
import InventoryActions from "./actions";
import { runEffect } from "@/utilities/actionUtility";
import InventoryEffects from "./effects";
import { resultHasError } from "@/utilities/onError";

function* ADD_INVENTORY(action) {
  const result = yield call(
    runEffect,
    action,
    InventoryEffects.createInventory,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* GET_INVENTORIES(action) {
  const result = yield call(runEffect, action, InventoryEffects.getInventories);
  if (resultHasError(result)) yield cancel();
}

function* DELETE_INVENTORY(action) {
  const result = yield call(
    runEffect,
    action,
    InventoryEffects.deleteInventory,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* UPDATE_INVENTORY(action) {
  const result = yield call(
    runEffect,
    action,
    InventoryEffects.updateInventory,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* GET_INVENTORY(action) {
  const result = yield call(
    runEffect,
    action,
    InventoryEffects.getInventoryById,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

export default function* InventorySaga() {
  yield all([
    takeEvery(InventoryActions.ADD_INVENTORY, ADD_INVENTORY),
    takeEvery(InventoryActions.GET_INVENTORIES, GET_INVENTORIES),
    takeEvery(InventoryActions.DELETE_INVENTORY, DELETE_INVENTORY),
    takeEvery(InventoryActions.UPDATE_INVENTORY, UPDATE_INVENTORY),
    takeEvery(InventoryActions.GET_INVENTORY, GET_INVENTORY),
  ]);
}