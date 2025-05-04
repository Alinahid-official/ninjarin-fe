import ErrorModel from "../models/error/errorModel";
import RequestingActions from "../redux/requesting/actions";
import logger from "./logger";
import SessionActions from "../redux/session/action";
import { store } from "../redux/store";

export function createAction(type, payload = {}, error = false, meta = null) {
  return { type, payload, error, meta };
}

export async function runEffectAndGetMeta(action, effect, ...args) {
  const { meta, type: actionType } = action;

  const { dispatch } = store;
  logger.debug(`request effect called with type ${actionType}`);
  // Set Requesting of the action to true
  dispatch(
    createAction(
      RequestingActions.SET_REQUESTING,
      { type: actionType, value: true },
      false,
      meta
    )
  );
  const model = await effect(...args);
  const isError = model instanceof ErrorModel;

  if (isError) {
    model.actionType = `${actionType}_FINISHED`;
    model.scope = action.meta?.scope;

    if (model.code === 401) {
      dispatch(SessionActions.logout(false));
      return;
    }
  }

  dispatch(
    createAction(`${actionType}_FINISHED`, model?.payload || model, isError, {
      ...model?.metadata,
      ...meta,
    })
  );
  // Set Requesting of the action to false
  dispatch(
    createAction(
      RequestingActions.SET_REQUESTING,
      { type: actionType, value: false },
      false,
      meta
    )
  );

  return model;
}

export async function runEffect(action, effect, ...args) {
  const model = await runEffectAndGetMeta(action, effect, ...args);
  return model?.payload || model;
}

export const getKeyForAction = (actionType, scope) =>
  `${scope ? `[scope:${scope}]` : ""}${actionType}`;
