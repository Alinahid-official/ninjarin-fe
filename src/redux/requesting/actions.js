const RequestingActions = {
  SET_REQUESTING: "requesting/SET_REQUESTING",

  setRequesting: (type, value) => {
    return {
      type: RequestingActions.SET_REQUESTING,
      payload: { type, value },
      error: false,
      meta: null,
    };
  },
};
export default RequestingActions;
