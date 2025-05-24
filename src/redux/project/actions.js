import { createAction } from "@/utilities/actionUtility";

const ProjectActions = {
  GET_PROJECTS: "project/GET_PROJECTS",
  GET_PROJECTS_FINISHED: "project/GET_PROJECTS_FINISHED",
  ADD_PROJECT: "project/ADD_PROJECT",
  ADD_PROJECT_FINISHED: "project/ADD_PROJECT_FINISHED",
  DELETE_PROJECT: "project/DELETE_PROJECT",
  DELETE_PROJECT_FINISHED: "project/DELETE_PROJECT_FINISHED",
  UPDATE_PROJECT: "project/UPDATE_PROJECT",
  UPDATE_PROJECT_FINISHED: "project/UPDATE_PROJECT_FINISHED",
  GET_PROJECT: "project/GET_PROJECT",
  GET_PROJECT_FINISHED: "project/GET_PROJECT_FINISHED",
  SELECT_PROJECT: "project/SELECT_PROJECT",
  getProjects: () => createAction(ProjectActions.GET_PROJECTS),
  addProject: (project) => createAction(ProjectActions.ADD_PROJECT, project),
  deleteProject: (projectId) =>
    createAction(ProjectActions.DELETE_PROJECT, projectId),
  updateProject: (projectId, project) =>
    createAction(ProjectActions.UPDATE_PROJECT, { projectId, project }),
  getProject: (projectId) =>
    createAction(ProjectActions.GET_PROJECT, projectId),
  selectProject: (project) =>
    createAction(ProjectActions.SELECT_PROJECT, project),
};

export default ProjectActions;
