import React from "react";
import { Layout } from "antd";
import EmployeeSidebar from "../layout/Sidebar";
import EmployeeHeader from "@/components/common/Header";
import DashboardCard from "./DashboardCard";
import AssignedSkillsTable from "../skillsProfile/AssignedSkillsTable";

const { Content } = Layout;

const EmployeeDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <EmployeeSidebar />
      <Layout style={{ background: "#F9FAFB" }}>
        <EmployeeHeader breadcrumbPath="Dashboard" />
        <Content
          style={{
            padding: "24px",
            margin: 0,
            minHeight: 280,
            backgroundColor: "#FFFFFF",
          }}
        >
          <DashboardCard />
          <AssignedSkillsTable isDashboard={true} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default EmployeeDashboard;
