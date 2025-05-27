import React, { useEffect, useState } from "react";
import { Form, Layout } from "antd";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/common/Header";
import BlankList from "@/components/common/BlankList";
import CommonDrawer from "@/components/common/Drawer";
import ProjectForm from "./components/ProjectForm";
import ProjectTable from "./components/ProjectTable";
import { useDispatch, useSelector } from "react-redux";
import ProjectActions from "@/redux/project/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FullAlertError from "@/components/error/FullAlertError";
import ProjectSelectors from "@/redux/project/selectors";

const selectError = makeSelectErrorModel();

const Projects = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const loading = useSelector((state) =>
    requestingSelector(state, [ProjectActions.GET_PROJECTS])
  );
  const error = useSelector((state) =>
    selectError(state, [ProjectActions.GET_PROJECTS_FINISHED])
  );
  const dispatch = useDispatch();
  const selectedProject = useSelector(ProjectSelectors.getSelectedProject);

  const handleAddProject = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    dispatch(ProjectActions.selectProject(null));
    form.resetFields();
  };

  const handleProjectSubmit = (values) => {
    if (selectedProject) {
      dispatch(ProjectActions.updateProject(values.projectId, values.project));
    } else {
      dispatch(ProjectActions.addProject(values));
    }
  };

  useEffect(() => {
    dispatch(ProjectActions.getProjects());
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        {error && <FullAlertError error={error} />}
        <Header breadcrumbPath="Projects" />
        <div className="nz-padding-p nz-bg-w">
          {loading && <BlankList isLoading />}
          {!loading && <ProjectTable handleAddProject={handleAddProject} />}
        </div>
      </Layout>

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
    </Layout>
  );
};

export default Projects;
