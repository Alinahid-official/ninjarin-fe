import api from "@/utilities/api";
import { del, get, patch, post } from "@/utilities/httpClient";

export default class CustomerEffects {
  static getCustomerById(id) {
    return get(`${api.CUSTOMERS}/${id}`);
  }
  static getCustomers() {
    return get(`${api.CUSTOMERS}`);
  }

  static createCustomer(customer) {
    return post(`${api.CUSTOMERS}`, customer);
  }

  static updateCustomer(id, update) {
    return patch(`${api.CUSTOMERS}/${id}`, update);
  }

  static deleteCustomer(id) {
    return del(`${api.CUSTOMERS}/${id}`);
  }
}
