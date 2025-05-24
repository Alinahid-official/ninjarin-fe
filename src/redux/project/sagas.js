import { all, call, cancel, takeEvery } from "redux-saga/effects";
import ProjectActions from "./actions";
import { runEffect } from "@/utilities/actionUtility";
import ProjectEffects from "./effects";
import { resultHasError } from "@/utilities/onError";

function* ADD_PROJECT(action) {
  const result = yield call(
    runEffect,
    action,
    ProjectEffects.createProject,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}
function* GET_PROJECTS(action) {
  const result = yield call(runEffect, action, ProjectEffects.getProjects);
  if (resultHasError(result)) yield cancel();
}
function* DELETE_PROJECT(action) {
  const result = yield call(
    runEffect,
    action,
    ProjectEffects.deleteProject,
    action.payload
  );
  if (resultHasError(result)) yield cancel();
}
function* UPDATE_PROJECT(action) {
  const result = yield call(
    runEffect,
    action,
    ProjectEffects.updateProject,
    action.payload.projectId,
    action.payload.project
  );
  if (resultHasError(result)) yield cancel();
}
export default function* ProjectSaga() {
  yield all([
    takeEvery(ProjectActions.ADD_PROJECT, ADD_PROJECT),
    takeEvery(ProjectActions.GET_PROJECTS, GET_PROJECTS),
    takeEvery(ProjectActions.DELETE_PROJECT, DELETE_PROJECT),
    takeEvery(ProjectActions.UPDATE_PROJECT, UPDATE_PROJECT),
  ]);
}
