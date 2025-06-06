import { denormalizeSchema } from "@/utilities/normalizer";
import { schema } from "normalizr";

const userList = new schema.Entity("Users", {}, { idAttribute: "_id" });
const userListSchema = [userList];

const skillProfile = new schema.Entity(
  "SkillProfiles",
  {},
  { idAttribute: "_id" }
);
const skillProfileListSchema = [skillProfile];

class UserSelectors {
  static getUsers(state) {
    return denormalizeSchema(state.users.users, userListSchema);
  }
  static getSelectedUser(state) {
    return state.users.selectedUser;
  }

  // SkillProfile Selectors
  static getUserSkillProfiles(state) {
    return state.users.userSkillProfiles
      ? denormalizeSchema(state.users.userSkillProfiles, skillProfileListSchema)
      : [];
  }

  static getSelectedSkillProfile(state) {
    return state.users.selectedSkillProfile;
  }

  static getSkillProfileById(state, skillProfileId) {
    if (
      !state.users.userSkillProfiles ||
      !state.users.userSkillProfiles.entities.SkillProfiles
    ) {
      return null;
    }
    return (
      state.users.userSkillProfiles.entities.SkillProfiles[skillProfileId] ||
      null
    );
  }

  static getSkillProfilesBySkill(state, skillName) {
    const skillProfiles = UserSelectors.getUserSkillProfiles(state);
    return skillProfiles.filter((profile) => profile.skill === skillName);
  }

  static getValidatedSkillProfiles(state) {
    const skillProfiles = UserSelectors.getUserSkillProfiles(state);
    return skillProfiles.filter((profile) => profile.isValidated);
  }

  static getUnvalidatedSkillProfiles(state) {
    const skillProfiles = UserSelectors.getUserSkillProfiles(state);
    return skillProfiles.filter((profile) => !profile.isValidated);
  }

  static getSkillProfilesGroupedBySkill(state) {
    const skillProfiles = UserSelectors.getUserSkillProfiles(state);
    return skillProfiles.reduce((grouped, profile) => {
      const skillName = profile.skill;
      if (!grouped[skillName]) {
        grouped[skillName] = [];
      }
      grouped[skillName].push(profile);
      return grouped;
    }, {});
  }

  static getSkillProfilesBySelfAssessment(state, selfAssessment) {
    const skillProfiles = UserSelectors.getUserSkillProfiles(state);
    return skillProfiles.filter(
      (profile) => profile.selfAssessment === selfAssessment
    );
  }

  static getUserSkillsCount(state) {
    const skillProfiles = UserSelectors.getUserSkillProfiles(state);
    return skillProfiles.length;
  }

  static getValidatedSkillsCount(state) {
    const validatedProfiles = UserSelectors.getValidatedSkillProfiles(state);
    return validatedProfiles.length;
  }
}

export default UserSelectors;
