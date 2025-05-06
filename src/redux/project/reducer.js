import BaseReducer from "@/utilities/baseReducer";
import ProjectActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";
import { produce } from "immer";

export const initialState = {
  projects: null,
  selectedProject: null,
};
const projectList = new schema.Entity("Projects", {}, { idAttribute: "_id" });
const projectListSchema = [projectList];
export default BaseReducer(initialState, {
  [ProjectActions.GET_PROJECTS_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      projects: normalizeSchema(data.data, projectListSchema),
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

    console.log(updatedProjects);

    return {
      ...state,
      projects: updatedProjects,
    };
  },
});
