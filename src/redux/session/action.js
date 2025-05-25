import { createAction } from "@/utilities/actionUtility";

// Update the import path
const SessionActions = {
  REQUEST_LOGIN: "session/REQUEST_LOGIN",
  REQUEST_LOGIN_FINISHED: "session/REQUEST_LOGIN_FINISHED",
  SET_CURRENT_CUSTOMER: "session/SET_CURRENT_CUSTOMER",
  // Assuming logout might be defined here or elsewhere and might also need createAction
  // LOGOUT: "session/LOGOUT",

  login: (values) => createAction(SessionActions.REQUEST_LOGIN, values),
  setCurrentCustomer: () => {
    return createAction(SessionActions.SET_CURRENT_CUSTOMER);
  },
  // logout: (clearData = true) => createAction(SessionActions.LOGOUT, { clearData }),
};

export default SessionActions;
