import BaseReducer from "@/utilities/baseReducer";
import InventoryActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";
import { produce } from "immer";

export const initialState = {
  inventories: null,
  selectedInventory: null,
  inventoryTypeCounts: null,
};

const inventoryList = new schema.Entity(
  "Inventories",
  {},
  { idAttribute: "_id" }
);
const inventoryListSchema = [inventoryList];

export default BaseReducer(initialState, {
  [InventoryActions.GET_INVENTORIES_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      inventories: normalizeSchema(data.data, inventoryListSchema),
      pagination: data.pagination,
    };
  },

  [InventoryActions.ADD_INVENTORY_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      inventories: addNormalizeSchema(state.inventories, data, "Inventories"),
    };
  },

  [InventoryActions.DELETE_INVENTORY_FINISHED](state, action) {
    const data = action.payload.data;
    const updatedInventories = produce(state.inventories, (draft) => {
      delete draft.entities.Inventories[data._id];
      draft.result = draft.result.filter((item) => item !== data._id);
    });

    return {
      ...state,
      inventories: updatedInventories,
    };
  },

  [InventoryActions.UPDATE_INVENTORY_FINISHED](state, action) {
    const data = action.payload.data;
    return produce(state, (draft) => {
      draft.inventories.entities.Inventories[data._id] = data;
    });
  },
  [InventoryActions.SET_SELECTED_INVENTORY](state, action) {
    return {
      ...state,
      selectedInventory: action.payload,
    };
  },
});
