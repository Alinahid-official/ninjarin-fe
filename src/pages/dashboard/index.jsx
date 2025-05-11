import React from "react";
import { Flex, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";
import { Select } from "antd";
import Sidebar from "../../components/layout/Sidebar";
import ProjectTable from "./ProjectTable";
import CustomerStatsCard from "./components/CustomerStatsCard";
import ProjectStatsCard from "./components/ProjectStatsCard";
import Header from "@/components/common/Header";
const OverviewHeader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      background: "#fff",
    }}
  >
    <span style={{ fontWeight: 600, color: "#757575", fontSize: 16 }}>
      Overview
    </span>
    <Select
      className="nz-select-square"
      defaultValue="last7"
      style={{
        width: 150,
        border: "1px solid #e0e0e0",
      }}
      dropdownStyle={{ borderRadius: 8 }}
      bordered={false}
      options={[
        {
          value: "last7",
          label: <span style={{ color: "#757575" }}>Last 7 Days</span>,
        },
        {
          value: "last30",
          label: (
            <span style={{ fontWeight: 600, color: "#757575" }}>
              Last 30 Days
            </span>
          ),
        },
        {
          value: "thisMonth",
          label: (
            <span style={{ fontWeight: 600, color: "#757575" }}>
              This Month
            </span>
          ),
        },
      ]}
    />
  </div>
);

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header breadcrumbPath="Dashboard" />
        <div className="nz-padding-p nz-bg-w">
          <OverviewHeader />
          <Flex
            justify="flex-start"
            style={{
              width: "100%",
              marginBottom: 24,
            }}
            gap={16}
          >
            <CustomerStatsCard />
            <ProjectStatsCard />
          </Flex>
          <ProjectTable />
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
