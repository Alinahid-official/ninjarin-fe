import { denormalizeSchema } from "@/utilities/normalizer";
import { schema } from "normalizr";

const adminInventoryList = new schema.Entity(
  "AdminInventories",
  {},
  { idAttribute: "_id" }
);
const adminInventoryListSchema = [adminInventoryList];

class AdminInventorySelectors {
  static getAdminInventories(state) {
    return denormalizeSchema(
      state.adminInventories.adminInventories,
      adminInventoryListSchema
    );
  }

  static getSelectedAdminInventory(state) {
    return state.adminInventories.selectedAdminInventory;
  }
}

export default AdminInventorySelectors;