import { call, cancel, takeLatest } from "redux-saga/effects";
import SkillArchitectureActions from "./actions";
import SkillArchitectureEffects from "./effects";
import { runEffect } from "@/utilities/actionUtility";
import { resultHasError } from "@/utilities/onError";

function* GET_LABELS(action) {
  const result = yield call(
    runEffect,
    action,
    SkillArchitectureEffects.getLabels,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* GET_RECORDS(action) {
  const result = yield call(
    runEffect,
    action,
    SkillArchitectureEffects.getRecords,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* UPDATE_LABEL(action) {
  const { labelId, customerId, data } = action.payload;
  const result = yield call(
    runEffect,
    action,
    SkillArchitectureEffects.updateLabel,
    labelId,
    customerId,
    data
  );
  if (resultHasError(result)) yield cancel();
}

function* SAVE_RECORD(action) {
  const { customerId, value } = action.payload;
  const result = yield call(
    runEffect,
    action,
    SkillArchitectureEffects.saveRecord,
    customerId,
    value
  );
  if (resultHasError(result)) yield cancel();
}

function* SAVE_MULTIPLE_RECORDS(action) {
  const { customerId, records } = action.payload;
  const result = yield call(
    runEffect,
    action,
    SkillArchitectureEffects.saveMultipleRecords,
    customerId,
    records
  );
  if (resultHasError(result)) yield cancel();
}

function* DELETE_RECORDS(action) {
  const { customerId, labelKey } = action.payload;
  const result = yield call(
    runEffect,
    action,
    SkillArchitectureEffects.deleteRecords,
    customerId,
    labelKey
  );
  if (resultHasError(result)) yield cancel();
}

export default function* skillArchitectureSaga() {
  yield takeLatest(SkillArchitectureActions.GET_LABELS, GET_LABELS);
  yield takeLatest(SkillArchitectureActions.GET_RECORDS, GET_RECORDS);
  yield takeLatest(SkillArchitectureActions.UPDATE_LABEL, UPDATE_LABEL);
  yield takeLatest(SkillArchitectureActions.SAVE_RECORD, SAVE_RECORD);
  yield takeLatest(
    SkillArchitectureActions.SAVE_MULTIPLE_RECORDS,
    SAVE_MULTIPLE_RECORDS
  );
  yield takeLatest(SkillArchitectureActions.DELETE_RECORD, DELETE_RECORDS);
}
