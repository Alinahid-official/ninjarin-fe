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
import {
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import TableFooter from "../../dashboard/TableFooter";
import { useDispatch, useSelector } from "react-redux";
import ProjectSelectors from "@/redux/project/selectors";
import BlankList from "@/components/common/BlankList";
import { formatToMonthDayYear } from "@/utilities/time";
import ProjectActivityHistory from "./ProjectActivityHistory";
import { GoPencil } from "react-icons/go";
import ProjectActions from "@/redux/project/actions";
const OverviewHeader = ({ onClick }) => (
  <Flex justify="space-between" style={{ padding: 16 }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <span style={{ color: "#000000", fontSize: 16 }}>Overview</span>
      <Select
        defaultValue="last7"
        style={{
          width: 120,
          border: "none",
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
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onClick}
      style={{
        background: "#595959",
        borderColor: "#595959",
      }}
    >
      Add Project
    </Button>
  </Flex>
);
const ProjectTable = ({ handleAddProject }) => {
  const dispatch = useDispatch();
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
  const tabItems = [
    {
      key: "all",
      label: (
        <span>
          All Projects <span style={{ marginLeft: 4 }}>24</span>
        </span>
      ),
    },
    {
      key: "consulting",
      label: (
        <span>
          Consulting <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "design",
      label: (
        <span>
          Design <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "development",
      label: (
        <span>
          Development <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "delivered",
      label: (
        <span>
          Delivered <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "service",
      label: (
        <span>
          Service <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
    {
      key: "servicing",
      label: (
        <span>
          Servicing <span style={{ marginLeft: 4 }}>4</span>
        </span>
      ),
    },
  ];

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
      key: "startDate",
      width: 150,
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

  if (!projects?.length) {
    return <BlankList onClick={handleAddProject} />;
  }

  return (
    <>
      <OverviewHeader onClick={handleAddProject} />
      <div className="nz-border nz-border-radius">
        <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
          <Tabs
            items={tabItems}
            defaultActiveKey="all"
            onChange={(key) => console.log(key)}
          />
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

export default ProjectTable;
