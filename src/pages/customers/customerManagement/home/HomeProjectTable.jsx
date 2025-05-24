import React, { useState } from "react";
import {
  Table,
  Select,
  Input,
  Button,
  Flex,
  Tabs,
  Modal,
  Popconfirm,
} from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import TableFooter from "@/pages/dashboard/TableFooter";
import { useDispatch, useSelector } from "react-redux";
import ProjectSelectors from "@/redux/project/selectors";
import BlankList from "@/components/common/BlankList";
import { formatToMonthDayYear } from "@/utilities/time";
import ProjectActivityHistory from "@/pages/projects/components/ProjectActivityHistory";
import { GoPencil } from "react-icons/go";
import ProjectActions from "@/redux/project/actions";

const HomeProjectTable = () => {
  const dispatch = useDispatch();
  const stageCounts = useSelector(ProjectSelectors.getProjectStageCounts);
  const [selectionType, _] = useState("checkbox");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const projects = useSelector(ProjectSelectors.getProjects);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columns = [
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      width: 150,
      render: (organization) => organization?.name,
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
      width: 230,
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
      key: "createdAt",
      width: 150,
      render: (date) => formatToMonthDayYear(date),
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (record) => (
        <div style={{ display: "flex", gap: 16 }}>
          <Button
            icon={<GoPencil />}
            type="link"
            style={{ padding: 0, color: "#1677ff" }}
          >
            Edit
          </Button>
          <Popconfirm
            title={"Are you sure?"}
            okText={"Yes"}
            cancelText={"No"}
            onConfirm={() => {
              dispatch(ProjectActions.deleteProject(record._id));
            }}
          >
            <Button
              icon={<DeleteOutlined />}
              type="link"
              style={{ padding: 0, color: "#1677ff" }}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

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

  return (
    <>
      <div className="nz-border nz-border-radius">
        <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
          <Flex gap="middle" align="center" style={{ marginTop: 16 }}>
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
              options={[{ value: "All", label: "Filter: All" }]}
            />
            <Input
              className="nz-input-square"
              placeholder="Search"
              style={{ width: 200, marginLeft: "auto" }}
            />
            <Button
              type="primary"
              icon={<SearchOutlined />}
              className="nz-no-shadow"
            />
          </Flex>
        </div>
        <div style={{ overflow: "auto" }}>
          <Table
            rowSelection={Object.assign({ type: selectionType }, rowSelection)}
            className="nz-table nz-table-footer"
            bordered
            columns={columns}
            dataSource={projects}
            pagination={false}
            footer={() => <TableFooter />}
            scroll={{ x: 1500 }}
          />
        </div>
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
    </>
  );
};

export default HomeProjectTable;
