import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import Sidebar from "../../components/layout/Sidebar";
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

const CustomersHeader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 32px 0 32px",
      background: "#fff",
    }}
  >
    <span style={{ fontSize: 22, color: "#757575", fontWeight: 500 }}>
      Customers
    </span>
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <BellOutlined style={{ fontSize: 22, color: "#757575" }} />
      </div>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "#ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserOutlined style={{ fontSize: 22, color: "#fff" }} />
      </div>
    </div>
  </div>
);

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
        <CustomersHeader />
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
