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

  getUsers: () => createAction(UserActions.GET_USERS),
  addUser: (user) => createAction(UserActions.ADD_USER, user),
  deleteUser: (userId) => createAction(UserActions.DELETE_USER, userId),
  updateUser: (user) => createAction(UserActions.UPDATE_USER, user),
  getUser: (userId) => createAction(UserActions.GET_USER, userId),
};

export default UserActions;