import { combineReducers } from "redux";
import requesting from "./requesting/requestingReducer";
import AppActions from "./action";
import error from "./error/errorReducer";
import session from "./session/reducer";
import projects from "./project/reducer";
import customers from "./customer/reducer";
import skillArchitecture from "./skillArchitecture/reducer";
import users from "./user/reducer";
import inventories from "./inventory/reducer";
import adminInventory from "./adminInventory/reducer";

const appReducer = combineReducers({
  requesting,
  error,
  session,
  projects,
  customers,
  skillArchitecture,
  users,
  inventories,
  adminInventory,
});

const rootReducer = (state, action) => {
  if (action.type === AppActions.RESET_STORE) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
