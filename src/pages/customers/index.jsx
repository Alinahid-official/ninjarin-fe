import React, { useEffect, useState } from "react";
import { Form, Layout } from "antd";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/common/Header";
import CustomerTable from "./components/CustomerTable";
import BlankList from "@/components/common/BlankList";
import { useDispatch, useSelector } from "react-redux";
import CustomerActions from "@/redux/customer/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FullAlertError from "@/components/error/FullAlertError";
import CommonDrawer from "@/components/common/Drawer";
import CustomerForm from "./components/CustomerForm";
import CustomerSelectors from "@/redux/customer/selectors";
import AdminInventoryActions from "@/redux/adminInventory/actions";

const selectError = makeSelectErrorModel();

const Customers = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const loading = useSelector((state) =>
    requestingSelector(state, [CustomerActions.GET_CUSTOMERS])
  );
  const error = useSelector((state) =>
    selectError(state, [CustomerActions.GET_CUSTOMERS_FINISHED])
  );
  const customer = useSelector(CustomerSelectors.getSelectedCustomer);
  const dispatch = useDispatch();

  const handleAddCustomer = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    form.resetFields();
    if (customer) {
      dispatch(CustomerActions.selectCustomer(null));
    }
    setIsDrawerOpen(false);
  };

  const handleCustomerSubmit = (values) => {
    if (customer) {
      dispatch(CustomerActions.updateCustomer(customer._id, values));
    } else dispatch(CustomerActions.addCustomer(values));
  };

  useEffect(() => {
    dispatch(CustomerActions.getCustomers());
    dispatch(AdminInventoryActions.getAdminInventories());
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        {error && <FullAlertError error={error} />}
        <Header breadcrumbPath="Customers" />
        <div className="nz-padding-p nz-bg-w">
          {loading && <BlankList isLoading />}
          {!loading && <CustomerTable handleAddCustomer={handleAddCustomer} />}
        </div>
      </Layout>

      <CommonDrawer
        title="Add Customer"
        subTitle="Fill all the required field to add client."
        open={isDrawerOpen || customer}
        onClose={handleDrawerClose}
      >
        <CustomerForm
          onSubmit={handleCustomerSubmit}
          onCancel={handleDrawerClose}
          form={form}
        />
      </CommonDrawer>
    </Layout>
  );
};

export default Customers;
