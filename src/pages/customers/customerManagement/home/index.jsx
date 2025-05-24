import React from "react";
import CMLayout from "../CMLayout";
import Header from "../../../../components/common/Header";
import OverviewHeader from "../../../../components/common/OverviewHeader";
import ProjectStatsCard from "../cards/ProjectStatsCard";
import CustomerStatsCard from "../cards/CustomerStatsCard";
import { Flex } from "antd";
import HomeProjectTable from "./HomeProjectTable";

const CustomerManagementHome = () => {
  const handleTimeChange = (value) => {
    console.log("Selected time period:", value);
  };

  return (
    <CMLayout>
      <Header breadcrumbPath="Customer Management/Home" />
      <div style={{ padding: "24px" }}>
        <OverviewHeader title="Customer Stats" onChange={handleTimeChange} />
        <Flex
          gap={24}
          vertical={false}
          align="stretch"
          style={{ height: "340px", marginBottom: 15 }}
        >
          <ProjectStatsCard />

          <CustomerStatsCard />
        </Flex>
        <HomeProjectTable />
      </div>
    </CMLayout>
  );
};

export default CustomerManagementHome;
