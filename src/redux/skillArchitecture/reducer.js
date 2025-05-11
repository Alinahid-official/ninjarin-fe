import BaseReducer from "@/utilities/baseReducer";
import SkillArchitectureActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";

export const initialState = {
  labels: null,
  records: null,
};

const recordSchema = new schema.Entity(
  "SkillArchitectureRecords",
  {},
  { idAttribute: "_id" }
);
const recordListSchema = [recordSchema];

export default BaseReducer(initialState, {
  [SkillArchitectureActions.GET_LABELS_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      labels: data,
    };
  },

  [SkillArchitectureActions.GET_RECORDS_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      records: normalizeSchema(data, recordListSchema),
    };
  },

  [SkillArchitectureActions.UPDATE_LABEL_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      labels: data,
    };
  },

  [SkillArchitectureActions.SAVE_RECORD_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      records: addNormalizeSchema(
        state.records,
        data,
        "SkillArchitectureRecords"
      ),
    };
  },

  [SkillArchitectureActions.SAVE_MULTIPLE_RECORDS_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      records: normalizeSchema(data, recordListSchema),
    };
  },
});
