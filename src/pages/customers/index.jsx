import React, { useEffect, useState } from "react";
import { Layout } from "antd";
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

const selectError = makeSelectErrorModel();

const Customers = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const loading = useSelector((state) =>
    requestingSelector(state, [CustomerActions.GET_CUSTOMERS])
  );
  const error = useSelector((state) =>
    selectError(state, [CustomerActions.GET_CUSTOMERS_FINISHED])
  );
  const dispatch = useDispatch();

  const handleAddCustomer = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleCustomerSubmit = (values) => {
    dispatch(CustomerActions.addCustomer(values));
  };

  useEffect(() => {
    dispatch(CustomerActions.getCustomers());
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
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <CustomerForm
          onSubmit={handleCustomerSubmit}
          onCancel={handleDrawerClose}
        />
      </CommonDrawer>
    </Layout>
  );
};

export default Customers;
