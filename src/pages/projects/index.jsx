import React, { useEffect, useState } from "react";
import { Layout } from "antd";
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
const ProjectHeader = () => (
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
      Projects
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

const Projects = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const loading = useSelector((state) =>
    requestingSelector(state, [ProjectActions.GET_PROJECTS])
  );
  // const loading = true;
  const error = useSelector((state) =>
    selectError(state, [ProjectActions.GET_PROJECTS_FINISHED])
  );
  const dispatch = useDispatch();
  const handleAddProject = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleProjectSubmit = (values) => {
    dispatch(ProjectActions.addProject(values));
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
        title="Add Projects"
        subTitle="Fill all the required field to add project."
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <ProjectForm
          onSubmit={handleProjectSubmit}
          onCancel={handleDrawerClose}
        />
      </CommonDrawer>
    </Layout>
  );
};

export default Projects;
