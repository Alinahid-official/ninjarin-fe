import api from "@/utilities/api";
import { post } from "@/utilities/httpClient";

export default class SessionEffects {
  static login(values) {
    return post(api.USER_LOGIN, values);
  }
  static resetPassword(values) {
    return post(api.USER_RESET_PASSWORD, values);
  }
}
