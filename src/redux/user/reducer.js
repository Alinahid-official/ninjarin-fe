import BaseReducer from "@/utilities/baseReducer";
import UserActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";
import { produce } from "immer";

export const initialState = {
  users: null,
  selectedUser: null,
  skillProfiles: null,
  userSkillProfiles: null,
  selectedSkillProfile: null,
};

const userList = new schema.Entity("Users", {}, { idAttribute: "_id" });
const userListSchema = [userList];

const skillProfile = new schema.Entity(
  "SkillProfiles",
  {},
  { idAttribute: "_id" }
);
const skillProfileListSchema = [skillProfile];

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

  // SkillProfile Reducers
  [UserActions.GET_USER_SKILL_PROFILES_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      userSkillProfiles: normalizeSchema(data.data, skillProfileListSchema),
    };
  },

  [UserActions.CREATE_SKILL_PROFILE_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      userSkillProfiles: addNormalizeSchema(
        state.userSkillProfiles,
        data.data,
        "SkillProfiles"
      ),
    };
  },

  [UserActions.UPDATE_SKILL_PROFILE_FINISHED](state, action) {
    const data = action.payload.data;
    return produce(state, (draft) => {
      if (
        draft.userSkillProfiles &&
        draft.userSkillProfiles.entities.SkillProfiles
      ) {
        draft.userSkillProfiles.entities.SkillProfiles[data.data._id] =
          data.data;
      }
    });
  },

  [UserActions.DELETE_SKILL_PROFILE_FINISHED](state, action) {
    const data = action.payload.data;
    const updatedSkillProfiles = produce(state.userSkillProfiles, (draft) => {
      if (draft && draft.entities.SkillProfiles) {
        delete draft.entities.SkillProfiles[data.data._id];
        draft.result = draft.result.filter((item) => item !== data.data._id);
      }
    });

    return {
      ...state,
      userSkillProfiles: updatedSkillProfiles,
    };
  },

  [UserActions.UPSERT_SKILL_PROFILE_FINISHED](state, action) {
    const data = action.payload.data;
    return produce(state, (draft) => {
      if (
        draft.userSkillProfiles &&
        draft.userSkillProfiles.entities.SkillProfiles
      ) {
        draft.userSkillProfiles.entities.SkillProfiles[data.data._id] =
          data.data;
        if (!draft.userSkillProfiles.result.includes(data.data._id)) {
          draft.userSkillProfiles.result.push(data.data._id);
        }
      } else {
        draft.userSkillProfiles = normalizeSchema(
          [data.data],
          skillProfileListSchema
        );
      }
    });
  },

  [UserActions.BULK_UPSERT_SKILL_PROFILES_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      userSkillProfiles: normalizeSchema(data.data, skillProfileListSchema),
    };
  },

  [UserActions.VALIDATE_SKILL_PROFILE_FINISHED](state, action) {
    const data = action.payload.data;
    return produce(state, (draft) => {
      if (
        draft.userSkillProfiles &&
        draft.userSkillProfiles.entities.SkillProfiles
      ) {
        draft.userSkillProfiles.entities.SkillProfiles[data.data._id] =
          data.data;
      }
    });
  },

  [UserActions.SET_SELECTED_SKILL_PROFILE](state, action) {
    return {
      ...state,
      selectedSkillProfile: action.payload,
    };
  },
});
