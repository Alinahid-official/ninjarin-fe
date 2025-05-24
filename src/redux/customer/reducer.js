import BaseReducer from "@/utilities/baseReducer";
import CustomerActions from "./actions";
import { schema } from "normalizr";
import { addNormalizeSchema, normalizeSchema } from "@/utilities/normalizer";
import { produce } from "immer";

export const initialState = {
  customers: null,
  selectedCustomer: null,
  currentCustomer: null,
};

const customerList = new schema.Entity("Customers", {}, { idAttribute: "_id" });
const customerListSchema = [customerList];

export default BaseReducer(initialState, {
  [CustomerActions.GET_CUSTOMERS_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      customers: normalizeSchema(data.data, customerListSchema),
    };
  },
  [CustomerActions.ADD_CUSTOMER_FINISHED](state, action) {
    const data = action.payload.data;
    return {
      ...state,
      customers: addNormalizeSchema(state.customers, data, "Customers"),
    };
  },
  [CustomerActions.DELETE_CUSTOMER_FINISHED](state, action) {
    const data = action.payload.data;
    const updatedCustomers = produce(state.customers, (draft) => {
      delete draft.entities.Customers[data._id];
      draft.result = draft.result.filter((item) => item !== data._id);
    });

    return {
      ...state,
      customers: updatedCustomers,
    };
  },
  [CustomerActions.SET_CURRENT_CUSTOMER](state, action) {
    const data = action.payload;
    return {
      ...state,
      currentCustomer: data,
    };
  },
  [CustomerActions.SELECT_CUSTOMER](state, action) {
    const data = action.payload;
    return {
      ...state,
      selectedCustomer: data,
    };
  },
  [CustomerActions.UPDATE_CUSTOMER_FINISHED](state, action) {
    const data = action.payload.data;
    const updatedCustomers = produce(state.customers, (draft) => {
      draft.entities.Customers[data._id] = data;
    });
    return {
      ...state,
      customers: updatedCustomers,
    };
  },
});
