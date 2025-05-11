import { denormalizeSchema } from "@/utilities/normalizer";
import { schema } from "normalizr";

const recordSchema = new schema.Entity(
  "SkillArchitectureRecords",
  {},
  { idAttribute: "_id" }
);
const recordListSchema = [recordSchema];

class SkillArchitectureSelectors {
  static getLabels(state) {
    return state.skillArchitecture.labels;
  }

  static getRecords(state) {
    return denormalizeSchema(state.skillArchitecture.records, recordListSchema);
  }
}

export default SkillArchitectureSelectors;
