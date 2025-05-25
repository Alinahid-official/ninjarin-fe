import api from "@/utilities/api";
import { del, get, patch, post } from "@/utilities/httpClient";

export default class AdminInventoryEffects {
  static getAdminInventoryById(id) {
    return get(`${api.ADMIN_INVENTORIES}/${id}`);
  }

  static getAdminInventories(params) {
    return get(api.ADMIN_INVENTORIES, params);
  }

  static createAdminInventory(inventory) {
    return post(api.ADMIN_INVENTORIES, inventory);
  }

  static updateAdminInventory(id, update) {
    return patch(`${api.ADMIN_INVENTORIES}/${id}`, update);
  }

  static deleteAdminInventory(id) {
    return del(`${api.ADMIN_INVENTORIES}/${id}`);
  }
}
