import { createAction, getKeyForAction } from "@/utilities/actionUtility";

export const REMOVE = "ErrorAction.REMOVE";

export function removeByActionType(id, scope = "") {
  return createAction(REMOVE, getKeyForAction(id, scope));
}

export const REMOVE_FIELD_ERROR = "ErrorAction.REMOVE_FIELD_ERROR";

export function removeFieldError(id, scope, fieldName) {
  return createAction(REMOVE_FIELD_ERROR, {
    actionId: getKeyForAction(id, scope),
    fieldName,
  });
}

export const CLEAR_ALL = "ErrorAction.CLEAR_ALL";

export function clearAll() {
  return createAction(CLEAR_ALL);
}