import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import EmployeeSidebar from "./Sidebar";
import EmployeeHeader from "./Header";

const { Content } = Layout;

const EmployeeLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <EmployeeSidebar />
      <Layout
        style={{
          background: "#F9FAFB" /* Light background for content area */,
        }}
      >
        <EmployeeHeader />
        <Content
          style={{
            margin: "24px",
            padding: 0,
            minHeight: 280,
            // background: '#fff', // Content itself could have a white background if needed per page
            // borderRadius: '8px'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmployeeLayout;
