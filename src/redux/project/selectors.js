import { denormalizeSchema } from "@/utilities/normalizer";
import { schema } from "normalizr";

const projectList = new schema.Entity("Projects", {}, { idAttribute: "_id" });
const projectListSchema = [projectList];

class ProjectSelectors {
  static getProjects(state) {
    return denormalizeSchema(state.projects.projects, projectListSchema);
  }

  static getProjectStageCounts(state) {
    const projects = ProjectSelectors.getProjects(state);
    const stages = {
      Consulting: 0,
      Design: 0,
      Development: 0,
      Delivered: 0,
      Services: 0,
      Maintenance: 0,
    };

    if (!projects) return stages;

    return projects.reduce((acc, project) => {
      const stage = project.projectStage;
      if (stage) {
        acc[stage] = (acc[stage] || 0) + 1;
      }
      return acc;
    }, stages);
  }

  static getSelectedProject(state) {
    return state.projects.selectedProject;
  }
}

export default ProjectSelectors;
