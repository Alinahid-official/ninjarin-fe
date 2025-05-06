import React, { useEffect, useState } from "react";
import { Table, Select, Input, Space, Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TableFooter from "./TableFooter";
import { useDispatch, useSelector } from "react-redux";
import ProjectSelectors from "@/redux/project/selectors";
import requestingSelector from "@/redux/requesting/requestingSelector";
import ProjectActions from "@/redux/project/actions";
import { formatToMonthDayYear } from "@/utilities/time";
import ProjectActivityHistory from "../projects/components/ProjectActivityHistory";

const ProjectTable = () => {
  const dispatch = useDispatch();
  const projects = useSelector(ProjectSelectors.getProjects);
  const loading = useSelector((state) =>
    requestingSelector(state, [ProjectActions.GET_PROJECTS])
  );
  const [selectedProject, setSelectedProject] = useState(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const columns = [
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      width: 150,
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "CX Owner",
      dataIndex: "cxOwner",
      key: "cxOwner",
      width: 150,
    },
    {
      title: "Program Manager",
      dataIndex: "programManager",
      key: "programManager",
      width: 180,
    },
    {
      title: "Project Stage",
      dataIndex: "projectStage",
      key: "projectStage",
      width: 120,
      render: (stage) => (
        <span
          style={{
            background: "#f5f5f5",
            padding: "4px 12px",
            borderRadius: "16px",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {stage}
        </span>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 150,
      render: (date) => formatToMonthDayYear(date),
    },
    {
      title: "Activity History",
      dataIndex: "activityHistory",
      key: "activityHistory",
      width: 150,
      render: (_, record) => (
        <Button
          type="link"
          style={{ color: "#1677ff", padding: 0 }}
          onClick={() => {
            setSelectedProject(record);
            setIsActivityModalOpen(true);
          }}
        >
          View all activity
        </Button>
      ),
    },
    {
      title: "Project Type",
      dataIndex: "projectType",
      key: "projectType",
      width: 180,
      render: (type) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "16px",
            color: "#fff",
            background: getProjectTypeColor(type),
          }}
        >
          {type}
        </span>
      ),
    },
    {
      title: "CX Admin",
      dataIndex: "cxAdmin",
      key: "cxAdmin",
      width: 150,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 150,
    },
  ];

  // Helper function to get background color for project type
  const getProjectTypeColor = (type) => {
    const colors = {
      "Career Mapping": "#4CAF50",
      Recruitment: "#FFA000",
      "Learning & Development": "#F44336",
      "Leadership Development": "#FF9800",
      "Succession Planning": "#E91E63",
      "Change Management": "#FFC107",
      Assessment: "#FF5252",
    };
    return colors[type] || "#757575";
  };

  // const data = [
  //   {
  //     key: "1",
  //     organization: "Accenture",
  //     projectName: "Wipro Supernova",
  //     cxOwner: "Om prakash sao",
  //     programManager: "Om prakash sao",
  //     projectStage: "Consulting",
  //     dueDate: "May 25, 2023",
  //     projectType: "Career Mapping",
  //     cxAdmin: "Om prakash sao",
  //     startDate: "May 25, 2023",
  //   },
  //   {
  //     key: "2",
  //     organization: "Deloitte Consulting",
  //     projectName: "West Bengal Data Center",
  //     cxOwner: "Neilsan mando",
  //     programManager: "Neilsan mando",
  //     projectStage: "Design",
  //     dueDate: "May 25, 2023",
  //     projectType: "Recruitment",
  //     cxAdmin: "Neilsan mando",
  //     startDate: "May 25, 2023",
  //   },
  //   // Add more data as needed
  // ];
  useEffect(() => {
    dispatch(ProjectActions.getProjects());
  }, []);
  return (
    <div
      className="nz-border nz-border-radius"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          padding: "10px 10px",
        }}
      >
        <Select
          className="nz-select-square"
          defaultValue="All"
          style={{ width: 200 }}
          options={[{ value: "All", label: "Project Type: All" }]}
        />
        <Select
          className="nz-select-square"
          defaultValue="All"
          style={{ width: 200 }}
          options={[{ value: "All", label: "Project Stage: All" }]}
        />
        <Select
          className="nz-select-square"
          defaultValue="All"
          style={{ width: 200 }}
          options={[{ value: "All", label: "Filter: All" }]}
        />
        <Input
          className="nz-input-square"
          placeholder="Search"
          style={{ width: 200, marginLeft: "auto", borderRadius: "0" }}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          className="nz-no-shadow"
        />
      </div>
      <div style={{ overflow: "auto" }}>
        <Table
          loading={loading}
          className="nz-table nz-table-footer"
          bordered
          columns={columns}
          dataSource={projects}
          pagination={false}
          footer={() => <TableFooter />}
          scroll={{ x: 1500 }}
        />
      </div>
      <Modal
        className="nz-project-modal"
        title="Activity History"
        open={isActivityModalOpen}
        onCancel={() => setIsActivityModalOpen(false)}
        footer={null}
        width={500}
        height={600}
        style={{ top: 150 }}
        styles={{
          header: {
            padding: 20,
            backgroundColor: "#0000000D",
          },
        }}
      >
        {selectedProject && (
          <ProjectActivityHistory project={selectedProject} />
        )}
      </Modal>
    </div>
  );
};

export default ProjectTable;
