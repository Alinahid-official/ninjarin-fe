import api from "@/utilities/api";
import { del, get, patch, post, put } from "@/utilities/httpClient";

export default class UserEffects {
  static getUserById(id) {
    return get(`${api.USERS}/${id}`);
  }

  static getUsers(params) {
    return get(`${api.USERS}`, params);
  }

  static createUser(user) {
    return post(`${api.USERS}`, user);
  }

  static updateUser(id, update) {
    return patch(`${api.USERS}/${id}`, update);
  }

  static deleteUser(id) {
    return del(`${api.USERS}/${id}`);
  }

  // SkillProfile Effects
  static getSkillProfile(id) {
    return get(`${api.SKILL_PROFILES}/${id}`);
  }

  static getUserSkillProfiles(params) {
    const user = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(user);
    return get(`${api.USERS}/${userDetails._id}/skill-profiles`, params);
  }

  static createSkillProfile(skillProfile) {
    return post(`${api.SKILL_PROFILES}`, skillProfile);
  }

  static updateSkillProfile(id, update) {
    return patch(`${api.SKILL_PROFILES}/${id}`, update);
  }

  static deleteSkillProfile(id) {
    return del(`${api.SKILL_PROFILES}/${id}`);
  }

  static upsertSkillProfile(userId, customerId, skillProfile) {
    return put(
      `${api.USERS}/${userId}/${customerId}/skill-profile`,
      skillProfile
    );
  }

  static bulkUpsertSkillProfiles(userId, customerId, skillProfiles) {
    return put(`${api.USERS}/${userId}/${customerId}/skill-profiles/bulk`, {
      skillProfiles,
    });
  }

  static validateSkillProfile(id, validatedBy) {
    return patch(`${api.SKILL_PROFILES}/${id}/validate`, { validatedBy });
  }
}
