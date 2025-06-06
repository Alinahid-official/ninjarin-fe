import { call, cancel, takeLatest } from "redux-saga/effects";
import UserActions from "./actions";
import UserEffects from "./effects";
import { runEffect } from "@/utilities/actionUtility";
import { resultHasError } from "@/utilities/onError";

function* GET_USERS(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.getUsers,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* ADD_USER(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.createUser,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* DELETE_USER(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.deleteUser,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* UPDATE_USER(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.updateUser,
    action.payload.id,
    action.payload.update
  );
  if (resultHasError(result)) yield cancel();
}

function* GET_USER(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.getUserById,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

// SkillProfile Sagas
function* GET_USER_SKILL_PROFILES(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.getUserSkillProfiles,
    action.payload.params
  );
  if (resultHasError(result)) yield cancel();
}

function* CREATE_SKILL_PROFILE(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.createSkillProfile,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* UPDATE_SKILL_PROFILE(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.updateSkillProfile,
    action.payload.id,
    action.payload.update
  );
  if (resultHasError(result)) yield cancel();
}

function* DELETE_SKILL_PROFILE(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.deleteSkillProfile,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}

function* UPSERT_SKILL_PROFILE(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.upsertSkillProfile,
    action.payload.userId,
    action.payload.customerId,
    action.payload.skillProfile
  );
  if (resultHasError(result)) yield cancel();
}

function* BULK_UPSERT_SKILL_PROFILES(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.bulkUpsertSkillProfiles,
    action.payload.userId,
    action.payload.customerId,
    action.payload.skillProfiles
  );
  if (resultHasError(result)) yield cancel();
}

function* VALIDATE_SKILL_PROFILE(action) {
  const result = yield call(
    runEffect,
    action,
    UserEffects.validateSkillProfile,
    action.payload.id,
    action.payload.validatedBy
  );
  if (resultHasError(result)) yield cancel();
}

export default function* userSaga() {
  yield takeLatest(UserActions.GET_USERS, GET_USERS);
  yield takeLatest(UserActions.ADD_USER, ADD_USER);
  yield takeLatest(UserActions.DELETE_USER, DELETE_USER);
  yield takeLatest(UserActions.UPDATE_USER, UPDATE_USER);
  yield takeLatest(UserActions.GET_USER, GET_USER);
  yield takeLatest(
    UserActions.GET_USER_SKILL_PROFILES,
    GET_USER_SKILL_PROFILES
  );
  yield takeLatest(UserActions.CREATE_SKILL_PROFILE, CREATE_SKILL_PROFILE);
  yield takeLatest(UserActions.UPDATE_SKILL_PROFILE, UPDATE_SKILL_PROFILE);
  yield takeLatest(UserActions.DELETE_SKILL_PROFILE, DELETE_SKILL_PROFILE);
  yield takeLatest(UserActions.UPSERT_SKILL_PROFILE, UPSERT_SKILL_PROFILE);
  yield takeLatest(
    UserActions.BULK_UPSERT_SKILL_PROFILES,
    BULK_UPSERT_SKILL_PROFILES
  );
  yield takeLatest(UserActions.VALIDATE_SKILL_PROFILE, VALIDATE_SKILL_PROFILE);
}
