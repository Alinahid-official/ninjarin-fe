import BaseReducer from "@/utilities/baseReducer";
import ProjectActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";

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
});
