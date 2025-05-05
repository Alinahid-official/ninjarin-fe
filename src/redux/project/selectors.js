import { denormalizeSchema } from "@/utilities/normalizer";
import { schema } from "normalizr";
const projectList = new schema.Entity("Projects", {}, { idAttribute: "_id" });
const projectListSchema = [projectList];
class ProjectSelectors {
  static getProjects(state) {
    return denormalizeSchema(state.projects.projects, projectListSchema);
  }
}

export default ProjectSelectors;
