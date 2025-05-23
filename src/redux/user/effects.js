import api from "@/utilities/api";
import { del, get, post } from "@/utilities/httpClient";

export default class UserEffects {
  static getUserById(id) {
    return get(`${api.USERS}/${id}`);
  }

  static getUsers() {
    return get(`${api.USERS}`);
  }

  static createUser(user) {
    return post(`${api.USERS}`, user);
  }

  static updateUser(id, update) {
    return post(`${api.USERS}/${id}`, update);
  }

  static deleteUser(id) {
    return del(`${api.USERS}/${id}`);
  }
}