import api from "@/utilities/api";
import { del, get, patch, post } from "@/utilities/httpClient";

export default class ProjectEffects {
  static getProjectById(id) {
    return get(`${api.PROJECTS}/${id}`);
  }
  static getProjects() {
    return get(`${api.PROJECTS}`);
  }

  static createProject(project) {
    return post(`${api.PROJECTS}`, project);
  }

  static updateProject(id, update) {
    return patch(`${api.PROJECTS}/${id}`, update);
  }

  static deleteProject(id) {
    return del(`${api.PROJECTS}/${id}`);
  }
}
