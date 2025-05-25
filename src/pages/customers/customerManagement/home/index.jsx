import React, { useEffect } from "react";
import CMLayout from "../CMLayout";
import Header from "../../../../components/common/Header";
import OverviewHeader from "../../../../components/common/OverviewHeader";
import ProjectStatsCard from "../cards/ProjectStatsCard";
import CustomerStatsCard from "../cards/CustomerStatsCard";
import { Flex } from "antd";
import HomeProjectTable from "./HomeProjectTable";
import { useSelector } from "react-redux";
import CustomerSelectors from "@/redux/customer/selectors";
import { useDispatch } from "react-redux";
import ProjectActions from "@/redux/project/actions";
import AdminInventoryActions from "@/redux/adminInventory/actions";

const CustomerManagementHome = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const handleTimeChange = (value) => {
    console.log("Selected time period:", value);
  };
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  useEffect(() => {
    dispatch(AdminInventoryActions.getAdminInventories());
    if (currentCustomer) {
      dispatch(
        ProjectActions.getProjects({ organization: currentCustomer?._id })
      );
    }
  }, [currentCustomer]);
  return (
    <CMLayout isAdmin={isAdmin}>
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
