import { getKeyForAction } from "../../utilities/actionUtility";
import { createSelector } from "@reduxjs/toolkit";

function selectRequesting(requestingState, actionTypes, scope) {
  return actionTypes.some((actionType) => {
    return !!requestingState[getKeyForAction(actionType, scope)];
  });
}

const requestingSelector = createSelector(
  (state) => state.requesting,
  (_, actionTypes) => actionTypes,
  (_, __, scope = "") => scope,
  selectRequesting
);

export default requestingSelector;
export const makeRequestingSelector = () => requestingSelector;
