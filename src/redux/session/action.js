import { createAction } from "@/utilities/actionUtility";

// Update the import path
const SessionActions = {
  REQUEST_LOGIN: "session/REQUEST_LOGIN",
  REQUEST_LOGIN_FINISHED: "session/REQUEST_LOGIN_FINISHED",
  // Assuming logout might be defined here or elsewhere and might also need createAction
  // LOGOUT: "session/LOGOUT",

  login: (values) => createAction(SessionActions.REQUEST_LOGIN, values),
  // logout: (clearData = true) => createAction(SessionActions.LOGOUT, { clearData }),
};

export default SessionActions;
