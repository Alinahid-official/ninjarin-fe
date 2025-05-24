import { createAction } from "@/utilities/actionUtility";

const InventoryActions = {
  GET_INVENTORIES: "inventory/GET_INVENTORIES",
  GET_INVENTORIES_FINISHED: "inventory/GET_INVENTORIES_FINISHED",
  ADD_INVENTORY: "inventory/ADD_INVENTORY",
  ADD_INVENTORY_FINISHED: "inventory/ADD_INVENTORY_FINISHED",
  DELETE_INVENTORY: "inventory/DELETE_INVENTORY",
  DELETE_INVENTORY_FINISHED: "inventory/DELETE_INVENTORY_FINISHED",
  UPDATE_INVENTORY: "inventory/UPDATE_INVENTORY",
  UPDATE_INVENTORY_FINISHED: "inventory/UPDATE_INVENTORY_FINISHED",
  GET_INVENTORY: "inventory/GET_INVENTORY",
  GET_INVENTORY_FINISHED: "inventory/GET_INVENTORY_FINISHED",
  SET_SELECTED_INVENTORY: "inventory/SET_SELECTED_INVENTORY",
  getInventories: (params) =>
    createAction(InventoryActions.GET_INVENTORIES, params),
  addInventory: (inventory) =>
    createAction(InventoryActions.ADD_INVENTORY, inventory),
  deleteInventory: (inventoryId) =>
    createAction(InventoryActions.DELETE_INVENTORY, inventoryId),
  updateInventory: (inventoryId, inventory) =>
    createAction(InventoryActions.UPDATE_INVENTORY, {
      inventoryId,
      inventory,
    }),
  getInventory: (inventoryId) =>
    createAction(InventoryActions.GET_INVENTORY, inventoryId),
  setSelectedInventory: (inventory) =>
    createAction(InventoryActions.SET_SELECTED_INVENTORY, inventory),
};

export default InventoryActions;
