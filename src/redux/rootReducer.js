import { combineReducers } from "redux";
import requesting from "./requesting/requestingReducer";
import AppActions from "./action";
import error from "./error/errorReducer";

const appReducer = combineReducers({
  requesting,
  error,
});

const rootReducer = (state, action) => {
  if (action.type === AppActions.RESET_STORE) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
