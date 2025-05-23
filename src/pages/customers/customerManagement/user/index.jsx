import React, { useState } from "react";
import CMLayout from "../CMLayout";
import Header from "../../../../components/common/Header";
import {
  Table,
  Input,
  Button,
  Select,
  Tabs,
  Space,
  Tag,
  Dropdown,
  Menu,
  DatePicker,
  Form,
} from "antd";
import {
  SearchOutlined,
  ExportOutlined,
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import CommonDrawer from "../../../../components/common/Drawer";
import AddUserForm from "./components/AddUserForm";

const { TabPane } = Tabs;

const projectStageOptions = [
  { label: "Consulting", value: "Consulting" },
  { label: "Design", value: "Design" },
  { label: "Development", value: "Development" },
  { label: "Delivered", value: "Delivered" },
  { label: "Services", value: "Services" },
  { label: "Maintenance", value: "Maintenance" },
];

const User = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddUser = (values) => {
    console.log("New User Data:", values);
    // Add logic to actually add the user to your data source
    setIsDrawerOpen(false); // Close drawer after submission
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Project Stage",
      dataIndex: "projectStage",
      key: "projectStage",
      render: (text) => (
        <Select
          defaultValue={text}
          style={{ width: 120 }}
          bordered={false}
          suffixIcon={<DownOutlined />}
        >
          {projectStageOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <Tag>{option.label}</Tag>
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="link" icon={<DeleteOutlined />} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <CMLayout>
      <Header breadcrumbPath="Customer Management/Users" />
      <div style={{ padding: "24px" }}>
        <Tabs defaultActiveKey="all">
          <TabPane tab="All 50,000" key="all" />
          <TabPane tab="Sales 10,000" key="sales" />
          <TabPane tab="Marketing 15,000" key="marketing" />
          <TabPane tab="Human Resources 15,000" key="hr" />
          <TabPane tab="Finance 15,000" key="finance" />
        </Tabs>
        <div
          style={{
            margin: "16px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space size="middle">
            <Select
              defaultValue="all"
              style={{ width: 150 }}
              options={[
                { value: "all", label: "Status: All" },
                // Add other status options here
              ]}
            />
            <Button>Bulk Action</Button>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </Space>
          <Space size="middle">
            <Button icon={<ExportOutlined />}>Export</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsDrawerOpen(true)} // Open drawer on click
            >
              Add Users
            </Button>
            <Button icon={<UploadOutlined />}>Import Users</Button>
          </Space>
        </div>
        <Table
          style={{ overflow: "auto" }}
          columns={columns}
          dataSource={null}
          rowSelection={{ type: "checkbox" }}
          pagination={{
            total: 240,
            pageSize: 10,
            showTotal: (total, range) =>
              `Showing ${range[0]}-${range[1]} of ${total} Projects`,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
        />
      </div>
      <CommonDrawer
        title="Add User"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width={480} // Adjust width as needed
      >
        <AddUserForm
          onSubmit={handleAddUser}
          onCancel={() => setIsDrawerOpen(false)}
        />
      </CommonDrawer>
    </CMLayout>
  );
};

export default User;
