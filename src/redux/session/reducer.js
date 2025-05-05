import BaseReducer from "@/utilities/baseReducer";
import SessionActions from "./action";

export const initialState = {
  accessToken: null,
  userDetails: null,
};

export default BaseReducer(
  initialState,
  {
    ["session/REQUEST_LOGIN_FINISHED"](state, action) {
      const data = action.payload.data;
      return {
        ...state,
        accessToken: data.token,
        userDetails: data.userDetails,
      };
    },
  },
  false
);
