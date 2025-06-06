import { createAction } from "@/utilities/actionUtility";

const UserActions = {
  GET_USERS: "user/GET_USERS",
  GET_USERS_FINISHED: "user/GET_USERS_FINISHED",
  ADD_USER: "user/ADD_USER",
  ADD_USER_FINISHED: "user/ADD_USER_FINISHED",
  DELETE_USER: "user/DELETE_USER",
  DELETE_USER_FINISHED: "user/DELETE_USER_FINISHED",
  UPDATE_USER: "user/UPDATE_USER",
  UPDATE_USER_FINISHED: "user/UPDATE_USER_FINISHED",
  GET_USER: "user/GET_USER",
  GET_USER_FINISHED: "user/GET_USER_FINISHED",
  SET_SELECTED_USER: "user/SET_SELECTED_USER",

  // SkillProfile Actions
  GET_SKILL_PROFILES: "user/GET_SKILL_PROFILES",
  GET_SKILL_PROFILES_FINISHED: "user/GET_SKILL_PROFILES_FINISHED",
  GET_USER_SKILL_PROFILES: "user/GET_USER_SKILL_PROFILES",
  GET_USER_SKILL_PROFILES_FINISHED: "user/GET_USER_SKILL_PROFILES_FINISHED",
  CREATE_SKILL_PROFILE: "user/CREATE_SKILL_PROFILE",
  CREATE_SKILL_PROFILE_FINISHED: "user/CREATE_SKILL_PROFILE_FINISHED",
  UPDATE_SKILL_PROFILE: "user/UPDATE_SKILL_PROFILE",
  UPDATE_SKILL_PROFILE_FINISHED: "user/UPDATE_SKILL_PROFILE_FINISHED",
  DELETE_SKILL_PROFILE: "user/DELETE_SKILL_PROFILE",
  DELETE_SKILL_PROFILE_FINISHED: "user/DELETE_SKILL_PROFILE_FINISHED",
  UPSERT_SKILL_PROFILE: "user/UPSERT_SKILL_PROFILE",
  UPSERT_SKILL_PROFILE_FINISHED: "user/UPSERT_SKILL_PROFILE_FINISHED",
  BULK_UPSERT_SKILL_PROFILES: "user/BULK_UPSERT_SKILL_PROFILES",
  BULK_UPSERT_SKILL_PROFILES_FINISHED:
    "user/BULK_UPSERT_SKILL_PROFILES_FINISHED",
  VALIDATE_SKILL_PROFILE: "user/VALIDATE_SKILL_PROFILE",
  VALIDATE_SKILL_PROFILE_FINISHED: "user/VALIDATE_SKILL_PROFILE_FINISHED",
  SET_SELECTED_SKILL_PROFILE: "user/SET_SELECTED_SKILL_PROFILE",

  getUsers: (params) => createAction(UserActions.GET_USERS, params),
  addUser: (user) => createAction(UserActions.ADD_USER, user),
  deleteUser: (userId) => createAction(UserActions.DELETE_USER, userId),
  updateUser: (userId, user) =>
    createAction(UserActions.UPDATE_USER, { id: userId, update: user }),
  getUser: (userId) => createAction(UserActions.GET_USER, userId),
  setSelectedUser: (user) => createAction(UserActions.SET_SELECTED_USER, user),

  // SkillProfile Action Creators
  getSkillProfiles: (params) =>
    createAction(UserActions.GET_SKILL_PROFILES, params),
  getUserSkillProfiles: (params) =>
    createAction(UserActions.GET_USER_SKILL_PROFILES, params),
  createSkillProfile: (skillProfile) =>
    createAction(UserActions.CREATE_SKILL_PROFILE, skillProfile),
  updateSkillProfile: (skillProfileId, update) =>
    createAction(UserActions.UPDATE_SKILL_PROFILE, {
      id: skillProfileId,
      update,
    }),
  deleteSkillProfile: (skillProfileId) =>
    createAction(UserActions.DELETE_SKILL_PROFILE, skillProfileId),
  upsertSkillProfile: (userId, customerId, skillProfile) =>
    createAction(UserActions.UPSERT_SKILL_PROFILE, {
      userId,
      customerId,
      skillProfile,
    }),
  bulkUpsertSkillProfiles: (userId, customerId, skillProfiles) =>
    createAction(UserActions.BULK_UPSERT_SKILL_PROFILES, {
      userId,
      customerId,
      skillProfiles,
    }),
  validateSkillProfile: (skillProfileId, validatedBy) =>
    createAction(UserActions.VALIDATE_SKILL_PROFILE, {
      id: skillProfileId,
      validatedBy,
    }),
  setSelectedSkillProfile: (skillProfile) =>
    createAction(UserActions.SET_SELECTED_SKILL_PROFILE, skillProfile),
};

export default UserActions;
