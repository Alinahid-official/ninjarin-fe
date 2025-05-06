import { denormalizeSchema } from "@/utilities/normalizer";
import { schema } from "normalizr";

const customerList = new schema.Entity("Customers", {}, { idAttribute: "_id" });
const customerListSchema = [customerList];

class CustomerSelectors {
  static getCustomers(state) {
    return denormalizeSchema(state.customers.customers, customerListSchema);
  }
}

export default CustomerSelectors;
