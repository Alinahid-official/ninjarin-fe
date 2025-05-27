import React, { useEffect, useState } from "react";
import CMLayout from "../CMLayout";
import Header from "../../../../components/common/Header";
import OverviewHeader from "../../../../components/common/OverviewHeader";
import ProjectStatsCard from "../cards/ProjectStatsCard";
import CustomerStatsCard from "../cards/CustomerStatsCard";
import { Flex, Form } from "antd";
import HomeProjectTable from "./HomeProjectTable";
import { useSelector } from "react-redux";
import CustomerSelectors from "@/redux/customer/selectors";
import { useDispatch } from "react-redux";
import ProjectActions from "@/redux/project/actions";
import AdminInventoryActions from "@/redux/adminInventory/actions";
import ProjectSelectors from "@/redux/project/selectors";
import CommonDrawer from "@/components/common/Drawer";
import ProjectForm from "@/pages/projects/components/ProjectForm";

const CustomerManagementHome = ({ isAdmin }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const selectedProject = useSelector(ProjectSelectors.getSelectedProject);
  const handleTimeChange = (value) => {
    console.log("Selected time period:", value);
  };
  const handleProjectSubmit = (values) => {
    if (selectedProject) {
      dispatch(ProjectActions.updateProject(values.projectId, values.project));
    } else {
      dispatch(ProjectActions.addProject(values));
    }
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    dispatch(ProjectActions.selectProject(null));
    form.resetFields();
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
        <CommonDrawer
          title={selectedProject ? "Edit Project" : "Add Project"}
          subTitle={
            selectedProject
              ? "Update the project details."
              : "Fill all the required field to add project."
          }
          open={isDrawerOpen || selectedProject}
          onClose={handleDrawerClose}
        >
          <ProjectForm
            onSubmit={handleProjectSubmit}
            onCancel={handleDrawerClose}
            form={form}
          />
        </CommonDrawer>
      </div>
    </CMLayout>
  );
};

export default CustomerManagementHome;
