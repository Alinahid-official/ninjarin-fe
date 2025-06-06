import BaseReducer from "@/utilities/baseReducer";
import ProjectActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";
import { produce } from "immer";

export const initialState = {
  projects: null,
  selectedProject: null,
  projectTypeCounts: null,
  projectStageCounts: null,
};
const projectList = new schema.Entity("Projects", {}, { idAttribute: "_id" });
const projectListSchema = [projectList];
export default BaseReducer(initialState, {
  [ProjectActions.GET_PROJECTS_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      projects: normalizeSchema(data.data, projectListSchema),
      projectTypeCounts: data.projectTypeCounts,
      projectStageCounts: data.projectStageCounts,
    };
  },
  [ProjectActions.ADD_PROJECT_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      projects: addNormalizeSchema(state.projects, data, "Projects"),
    };
  },
  [ProjectActions.DELETE_PROJECT_FINISHED](state, action) {
    const data = action.payload.data;
    const updatedProjects = produce(state.projects, (draft) => {
      delete draft.entities.Projects[data._id];
      draft.result = draft.result.filter((item) => item !== data._id);
    });

    return {
      ...state,
      projects: updatedProjects,
    };
  },
  [ProjectActions.SELECT_PROJECT](state, action) {
    const data = action.payload;
    return {
      ...state,
      selectedProject: data,
    };
  },
  [ProjectActions.UPDATE_PROJECT_FINISHED](state, action) {
    const data = action.payload.data;
    const updatedProjects = produce(state.projects, (draft) => {
      draft.entities.Projects[data._id] = data;
    });
    return {
      ...state,
      projects: updatedProjects,
    };
  },
});
