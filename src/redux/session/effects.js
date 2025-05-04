import { postToModel } from "../../utilities/effectUtility";

export default class SessionEffects {
  static login(values) {
    return postToModel(undefined, "/login", values);
  }
}
