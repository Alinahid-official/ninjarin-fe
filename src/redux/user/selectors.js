import { denormalizeSchema } from "@/utilities/normalizer";
import { schema } from "normalizr";

const userList = new schema.Entity("Users", {}, { idAttribute: "_id" });
const userListSchema = [userList];

class UserSelectors {
  static getUsers(state) {
    return denormalizeSchema(state.users.users, userListSchema);
  }
}

export default UserSelectors;