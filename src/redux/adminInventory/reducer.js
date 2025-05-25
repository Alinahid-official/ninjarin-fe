import BaseReducer from "@/utilities/baseReducer";
import AdminInventoryActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";
import { produce } from "immer";

export const initialState = {
  adminInventories: null,
  selectedAdminInventory: null,
};

const adminInventoryList = new schema.Entity(
  "AdminInventories",
  {},
  { idAttribute: "_id" }
);
const adminInventoryListSchema = [adminInventoryList];

export default BaseReducer(initialState, {
  [AdminInventoryActions.GET_ADMIN_INVENTORIES_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      adminInventories: normalizeSchema(data, adminInventoryListSchema),
    };
  },

  [AdminInventoryActions.ADD_ADMIN_INVENTORY_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      adminInventories: addNormalizeSchema(state.adminInventories, data, "AdminInventories"),
    };
  },

  [AdminInventoryActions.DELETE_ADMIN_INVENTORY_FINISHED](state, action) {
    const data = action.payload.data;
    const updatedInventories = produce(state.adminInventories, (draft) => {
      delete draft.entities.AdminInventories[data._id];
      draft.result = draft.result.filter((item) => item !== data._id);
    });

    return {
      ...state,
      adminInventories: updatedInventories,
    };
  },

  [AdminInventoryActions.UPDATE_ADMIN_INVENTORY_FINISHED](state, action) {
    const data = action.payload.data;
    return produce(state, (draft) => {
      draft.adminInventories.entities.AdminInventories[data._id] = data;
    });
  },

  [AdminInventoryActions.SET_SELECTED_ADMIN_INVENTORY](state, action) {
    return {
      ...state,
      selectedAdminInventory: action.payload,
    };
  },
});