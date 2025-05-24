import BaseReducer from "@/utilities/baseReducer";
import UserActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";
import { produce } from "immer";

export const initialState = {
  users: null,
  selectedUser: null,
};

const userList = new schema.Entity("Users", {}, { idAttribute: "_id" });
const userListSchema = [userList];

export default BaseReducer(initialState, {
  [UserActions.GET_USERS_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      users: normalizeSchema(data.data, userListSchema),
    };
  },

  [UserActions.ADD_USER_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      users: addNormalizeSchema(state.users, data, "Users"),
    };
  },

  [UserActions.DELETE_USER_FINISHED](state, action) {
    const data = action.payload.data;
    const updatedUsers = produce(state.users, (draft) => {
      delete draft.entities.Users[data._id];
      draft.result = draft.result.filter((item) => item !== data._id);
    });

    return {
      ...state,
      users: updatedUsers,
    };
  },
  [UserActions.UPDATE_USER_FINISHED](state, action) {
    const data = action.payload.data;
    return produce(state, (draft) => {
      draft.users.entities.Users[data._id] = data;
    });
  },

  [UserActions.SET_SELECTED_USER](state, action) {
    return {
      ...state,
      selectedUser: action.payload,
    };
  },
});
