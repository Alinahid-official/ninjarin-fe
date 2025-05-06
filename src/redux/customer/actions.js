import { createAction } from "@/utilities/actionUtility";

const CustomerActions = {
  GET_CUSTOMERS: "customer/GET_CUSTOMERS",
  GET_CUSTOMERS_FINISHED: "customer/GET_CUSTOMERS_FINISHED",
  ADD_CUSTOMER: "customer/ADD_CUSTOMER",
  ADD_CUSTOMER_FINISHED: "customer/ADD_CUSTOMER_FINISHED",
  DELETE_CUSTOMER: "customer/DELETE_CUSTOMER",
  DELETE_CUSTOMER_FINISHED: "customer/DELETE_CUSTOMER_FINISHED",
  UPDATE_CUSTOMER: "customer/UPDATE_CUSTOMER",
  UPDATE_CUSTOMER_FINISHED: "customer/UPDATE_CUSTOMER_FINISHED",
  GET_CUSTOMER: "customer/GET_CUSTOMER",
  GET_CUSTOMER_FINISHED: "customer/GET_CUSTOMER_FINISHED",
  getCustomers: () => createAction(CustomerActions.GET_CUSTOMERS),
  addCustomer: (customer) =>
    createAction(CustomerActions.ADD_CUSTOMER, customer),
  deleteCustomer: (customerId) =>
    createAction(CustomerActions.DELETE_CUSTOMER, customerId),
  updateCustomer: (customer) =>
    createAction(CustomerActions.UPDATE_CUSTOMER, customer),
  getCustomer: (customerId) =>
    createAction(CustomerActions.GET_CUSTOMER, customerId),
};

export default CustomerActions;
