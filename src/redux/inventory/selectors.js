import { denormalizeSchema } from "@/utilities/normalizer";
import { schema } from "normalizr";

const inventoryList = new schema.Entity(
  "Inventories",
  {},
  { idAttribute: "_id" }
);
const inventoryListSchema = [inventoryList];

class InventorySelectors {
  static getInventories(state) {
    return denormalizeSchema(
      state.inventories.inventories,
      inventoryListSchema
    );
  }

  static getInventoryTypeCounts(state) {
    const inventories = InventorySelectors.getInventories(state);
    const types = {
      Hardware: 0,
      Software: 0,
      Network: 0,
      Office: 0,
      Other: 0,
    };

    if (!inventories) return types;

    return inventories.reduce((acc, inventory) => {
      const type = inventory.inventoryType;
      if (type) {
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, types);
  }

  static getSelectedInventory(state) {
    return state.inventories.selectedInventory;
  }
}

export default InventorySelectors;
