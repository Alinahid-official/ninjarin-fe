import api from "@/utilities/api";
import { del, get, patch, post } from "@/utilities/httpClient";
import { store } from "../store";

export default class InventoryEffects {
  static getCurrentCustomer() {
    const reduxStore = store.getState();
    return reduxStore.customers.currentCustomer?._id;
  }
  static getInventoryById(id) {
    return get(
      `${
        api.CUSTOMERS
      }/${InventoryEffects.getCurrentCustomer()}/inventories/${id}`
    );
  }

  static getInventories(params) {
    return get(
      `${api.CUSTOMERS}/${InventoryEffects.getCurrentCustomer()}/inventories`,
      params
    );
  }

  static createInventory(inventory) {
    return post(
      `${api.CUSTOMERS}/${InventoryEffects.getCurrentCustomer()}/inventories`,
      inventory
    );
  }

  static updateInventory(id, update) {
    return patch(
      `${
        api.CUSTOMERS
      }/${InventoryEffects.getCurrentCustomer()}/inventories/${id}`,
      update
    );
  }

  static deleteInventory(id) {
    return del(
      `${
        api.CUSTOMERS
      }/${InventoryEffects.getCurrentCustomer()}/inventories/${id}`
    );
  }
}
