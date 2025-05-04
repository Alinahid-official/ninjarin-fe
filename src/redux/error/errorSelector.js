import set from "lodash/set";
import { getKeyForAction } from "@/utilities/actionUtility";
import XMLToJSON from "@/utilities/XMLToJSON";
import { createSelector } from "@reduxjs/toolkit";
import { exceptions } from "@/config/consts";

function hasErrorsFn(errorState, actionTypes, scope) {
  return (
    actionTypes
      .map((actionType) => errorState[getKeyForAction(actionType, scope)])
      .filter(Boolean).length > 0
  );
}

export const getErrorModelFromState = (state, actionType, scope) =>
  state.error[getKeyForAction(actionType, scope)];

export const getErrorState = (state) => state.error;

export const makeSelectErrorModel = () =>
  createSelector(
    [
      getErrorState,
      (_, actionType, scope = "") => getKeyForAction(actionType, scope),
    ],
    (errorState, key) => errorState[key]
  );

export const SelectHasErrors = createSelector(
  (state) => state.error,
  (_, actionTypes) => actionTypes,
  (_, __, scope) => scope,
  hasErrorsFn
);

export const getFieldErrors = (errorModel) => {
  const fieldErrors = {};
  if (
    errorModel &&
    errorModel.exception === exceptions.FieldValidationException &&
    errorModel.errors
  )
    errorModel.errors.forEach((err) => {
      if (err.location && err.message) fieldErrors[err.location] = err.message;
    });
  return fieldErrors;
};

export const getFieldErrorsInNestedForm = (errorModel) => {
  const fieldErrors = {};
  if (errorModel && errorModel.errors)
    errorModel.errors.forEach((err) => {
      if (err.location && err.message)
        set(fieldErrors, err.location, err.message);
    });
  return fieldErrors;
};

export const makeSelectFieldErrors = () =>
  createSelector(makeSelectErrorModel(), getFieldErrors);

export const makeSelectRowWiseError = () =>
  createSelector(makeSelectErrorModel(), (error) => {
    if (!error?.errors) return [];

    let colonIndex = -1;
    return error?.errors.reduce((result, err) => {
      if (!err?.location.startsWith("row:")) return result;
      colonIndex = err?.location.indexOf(";");
      return [
        ...result,
        {
          lineNo:
            colonIndex === -1
              ? Number(err?.location.substring(5))
              : Number(err?.location.substring(5, colonIndex)),
          message: err?.message,
          solution: err?.solution,
          ...(colonIndex !== -1
            ? { columnNo: Number(err?.location.substring(colonIndex + 6)) }
            : {}),
        },
      ];
    }, []);
  });

export const getFieldCounts = (error) => {
  const errorCount = {};
  if (
    error?.exception !== exceptions.FieldValidationException ||
    !error?.errors
  ) {
    return errorCount;
  }
  error.errors.forEach((err) => {
    if (err?.location && !err?.location.startsWith("Line:")) {
      const index = err.location.indexOf(".");
      const fieldName = err.location.substring(
        0,
        index !== -1 ? index : undefined
      );
      errorCount[fieldName] = (errorCount[fieldName] || 0) + 1;
    }
  });
  return errorCount;
};

export const makeSelectFieldErrorCount = () =>
  createSelector(makeSelectErrorModel(), getFieldCounts);

const getLeavesCountRecursively = (val) => {
  return typeof val === "object"
    ? Object.entries(val).reduce(
        (total, [child]) => total + getLeavesCountRecursively(child),
        0
      )
    : 1;
};

export const getFieldCountsFromNestedErrors = (errorObj) =>
  Object.entries(errorObj || {}).reduce(
    (result, [fieldName, field]) => ({
      ...result,
      [fieldName]: getLeavesCountRecursively(field),
    }),
    {}
  );

export const getCountOfFields = (fieldCount, ...fields) => {
  if (fields.length === 0)
    return Object.values(fieldCount).reduce((sum, count) => sum + count, 0);
  return fields.reduce((prevCount, field) => {
    return prevCount + (fieldCount[field] || 0);
  }, 0);
};

export const makeSelectFieldErrorsInNestedForm = () =>
  createSelector(makeSelectErrorModel(), getFieldErrorsInNestedForm);

export const getErrorsFromModel = (errorModel) => {
  if (errorModel && errorModel.errors) {
    const errors = {};
    errorModel.errors.forEach((err) => {
      errors[err.error] = new Error(err.message);
    });
    return errors;
  }
  return null;
};

const selectError = makeSelectErrorModel();

export const makeSelectErrorFields = () =>
  createSelector(selectError, (error) => {
    const errorFieldsSet = new Set();
    if (error?.exception !== exceptions.FieldValidationException)
      return errorFieldsSet;
    error.errors.map((err) => {
      if (err.location) errorFieldsSet.add(err.location);
      return null;
    });
    return errorFieldsSet;
  });

export const makeSelectErrorsArray = () =>
  createSelector(getErrorModelFromState, getErrorsFromModel);

export function makeSelectAwsXmlError() {
  return createSelector(makeSelectErrorModel(), (error) => {
    if (!error || !error.XMLResponse) return null;
    const parser = new DOMParser();
    const dom = parser.parseFromString(error.XMLResponse, "application/xml");
    const errJSON = XMLToJSON(dom);
    switch (errJSON.Error.Code) {
      case "AccessDenied":
        return "Access Denied";
      case "ExpiredToken":
        return "URL Expired try again.";
      case "InternalError":
        return "Internal server error";
      case "EntityTooLarge":
        return "File Size Too Large";
      case "SignatureDoesNotMatch":
        return "Could not verify upload signature.";
      default:
        return "Upload Failed";
    }
  });
}

export function makeSelectUploadXmlError() {
  return createSelector(makeSelectErrorModel(), (error) => {
    if (!error || !error.XMLResponse) return null;
    const parser = new DOMParser();
    const dom = parser.parseFromString(error.XMLResponse, "application/xml");
    const errJSON = XMLToJSON(dom);
    switch (errJSON.Error.Code) {
      case "AccessDenied":
        return "Upload Failed: Access Denied";
      case "ExpiredToken":
        return "Upload Failed: URL Expired try again.";
      case "InternalError":
        return "Upload Failed: Internal server error";
      case "EntityTooLarge":
        return "Upload Failed: File Size Too Large";
      case "SignatureDoesNotMatch":
        return "Upload Failed: Could not verify upload signature.";
      default:
        return "Upload Failed";
    }
  });
}
