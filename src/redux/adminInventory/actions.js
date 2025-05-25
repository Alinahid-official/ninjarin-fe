import { createAction } from "@/utilities/actionUtility";

const AdminInventoryActions = {
  GET_ADMIN_INVENTORIES: "adminInventory/GET_ADMIN_INVENTORIES",
  GET_ADMIN_INVENTORIES_FINISHED: "adminInventory/GET_ADMIN_INVENTORIES_FINISHED",
  ADD_ADMIN_INVENTORY: "adminInventory/ADD_ADMIN_INVENTORY",
  ADD_ADMIN_INVENTORY_FINISHED: "adminInventory/ADD_ADMIN_INVENTORY_FINISHED",
  DELETE_ADMIN_INVENTORY: "adminInventory/DELETE_ADMIN_INVENTORY",
  DELETE_ADMIN_INVENTORY_FINISHED: "adminInventory/DELETE_ADMIN_INVENTORY_FINISHED",
  UPDATE_ADMIN_INVENTORY: "adminInventory/UPDATE_ADMIN_INVENTORY",
  UPDATE_ADMIN_INVENTORY_FINISHED: "adminInventory/UPDATE_ADMIN_INVENTORY_FINISHED",
  GET_ADMIN_INVENTORY: "adminInventory/GET_ADMIN_INVENTORY",
  GET_ADMIN_INVENTORY_FINISHED: "adminInventory/GET_ADMIN_INVENTORY_FINISHED",
  SET_SELECTED_ADMIN_INVENTORY: "adminInventory/SET_SELECTED_ADMIN_INVENTORY",

  getAdminInventories: (params) =>
    createAction(AdminInventoryActions.GET_ADMIN_INVENTORIES, params),
  addAdminInventory: (inventory) =>
    createAction(AdminInventoryActions.ADD_ADMIN_INVENTORY, inventory),
  deleteAdminInventory: (inventoryId) =>
    createAction(AdminInventoryActions.DELETE_ADMIN_INVENTORY, inventoryId),
  updateAdminInventory: (inventoryId, inventory) =>
    createAction(AdminInventoryActions.UPDATE_ADMIN_INVENTORY, {
      inventoryId,
      inventory,
    }),
  getAdminInventory: (inventoryId) =>
    createAction(AdminInventoryActions.GET_ADMIN_INVENTORY, inventoryId),
  setSelectedAdminInventory: (inventory) =>
    createAction(AdminInventoryActions.SET_SELECTED_ADMIN_INVENTORY, inventory),
};

export default AdminInventoryActions;