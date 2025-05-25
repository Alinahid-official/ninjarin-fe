import React, { useEffect, useState } from "react";

import BlankList from "@/components/common/BlankList";
import CommonDrawer from "@/components/common/Drawer";

import { useDispatch, useSelector } from "react-redux";
import ProjectActions from "@/redux/project/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import ProjectSelectors from "@/redux/project/selectors";
import CMLayout from "../CMLayout";
import Header from "@/components/common/Header";
import CustomerSelectors from "@/redux/customer/selectors";
import ProjectForm from "@/pages/projects/components/ProjectForm";
import ProjectTable from "@/pages/projects/components/ProjectTable";

const CustomerProject = ({ isAdmin }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const loading = useSelector((state) =>
    requestingSelector(state, [ProjectActions.GET_PROJECTS])
  );

  const dispatch = useDispatch();
  const selectedProject = useSelector(ProjectSelectors.getSelectedProject);
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  const handleAddProject = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    dispatch(ProjectActions.selectProject(null));
  };

  const handleProjectSubmit = (values) => {
    if (selectedProject) {
      dispatch(ProjectActions.updateProject(values.projectId, values.project));
    } else {
      dispatch(ProjectActions.addProject(values));
    }
  };

  useEffect(() => {
    if (currentCustomer) {
      dispatch(
        ProjectActions.getProjects({ organization: currentCustomer?._id })
      );
    }
  }, [currentCustomer]);

  return (
    <CMLayout isAdmin={isAdmin}>
      <Header breadcrumbPath="Customer Management/Projects" />
      <div className="nz-padding-p nz-bg-w">
        {loading && <BlankList isLoading />}
        {!loading && <ProjectTable handleAddProject={handleAddProject} />}
      </div>
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
        />
      </CommonDrawer>
    </CMLayout>
  );
};

export default CustomerProject;
