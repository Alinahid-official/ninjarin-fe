import React from "react";
import CMLayout from "../../CMLayout"; // Adjust path as necessary
import Header from "../../../../../components/common/Header"; // Adjust path as necessary
import { Table, Button, Input, Select, Checkbox, Typography, Flex } from "antd"; // Import Ant Design components
import { SearchOutlined } from "@ant-design/icons";
import TableFooter from "@/pages/dashboard/TableFooter";

const { Title } = Typography;

// Mock data - replace with actual data source and logic
const dataSource = [
  {
    key: "1",
    checkbox: false,
    firstName: "Jane",
    lastName: "Smith",
    email: "saurabh@gmail.com",
    employeeId: "001",
    jobTitle: "Software Engineer",
    department: "Sales",
    projectStage: "Consulting",
    location: "New York",
    startDate: "May 25, 2023",
    role: "Employee",
  },
  {
    key: "2",
    checkbox: false,
    firstName: "John",
    lastName: "Johnson",
    email: "saurabh@gmail.com",
    employeeId: "002",
    jobTitle: "Product Manager",
    department: "Marketing",
    projectStage: "Design",
    location: "Los Angeles",
    startDate: "May 28, 2023",
    role: "Employee",
  },
  {
    key: "3",
    checkbox: false,
    firstName: "Alice",
    lastName: "Williams",
    email: "saurabh@gmail.com",
    employeeId: "003",
    jobTitle: "UX Designer",
    department: "Human Resources",
    projectStage: "Development",
    location: "Chicago",
    startDate: "May 20, 2023",
    role: "Employee",
  },
  {
    key: "4",
    checkbox: false,
    firstName: "Michael",
    lastName: "Jones",
    email: "saurabh@gmail.com",
    employeeId: "004",
    jobTitle: "Data Scientist",
    department: "Finance",
    projectStage: "Delivered",
    location: "Houston",
    startDate: "Dec 20, 2023",
    role: "Employee",
  },
  {
    key: "5",
    checkbox: false,
    firstName: "Emma",
    lastName: "Brown",
    email: "saurabh@gmail.com",
    employeeId: "005",
    jobTitle: "Marketing Specialist",
    department: "Product Development",
    projectStage: "Services",
    location: "Phoenix",
    startDate: "Mar 10, 2024",
    role: "Employee",
  },
  {
    key: "6",
    checkbox: false,
    firstName: "David",
    lastName: "Davis",
    email: "saurabh@gmail.com",
    employeeId: "006",
    jobTitle: "Sales Executive",
    department: "Customer Support",
    projectStage: "Maintenance",
    location: "Philadelphia",
    startDate: "Mar 10, 2024",
    role: "Employee",
  },
  {
    key: "7",
    checkbox: false,
    firstName: "Sophia",
    lastName: "Garcia",
    email: "saurabh@gmail.com",
    employeeId: "007",
    jobTitle: "Programmer",
    department: "IT",
    projectStage: "Design",
    location: "San Antonio",
    startDate: "Mar 10, 2024",
    role: "Employee",
  },
  {
    key: "8",
    checkbox: false,
    firstName: "Daniel",
    lastName: "Martinez",
    email: "saurabh@gmail.com",
    employeeId: "008",
    jobTitle: "Business Analyst",
    department: "Legal",
    projectStage: "Design",
    location: "San Diego",
    startDate: "Mar 10, 2024",
    role: "Employee",
  },
];

const columns = [
  {
    title: <Checkbox />,
    dataIndex: "checkbox",
    key: "checkbox",
    render: () => <Checkbox />,
  },
  { title: "First Name", dataIndex: "firstName", key: "firstName" },
  { title: "Last Name", dataIndex: "lastName", key: "lastName" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Employee ID", dataIndex: "employeeId", key: "employeeId" },
  { title: "Job Title", dataIndex: "jobTitle", key: "jobTitle" },
  { title: "Department", dataIndex: "department", key: "department" },
  {
    title: "Project Stage",
    dataIndex: "projectStage",
    key: "projectStage",
    render: (text) => (
      <Select defaultValue={text} style={{ width: 120 }} bordered={false}>
        <Select.Option value="Consulting">Consulting</Select.Option>
        <Select.Option value="Design">Design</Select.Option>
        <Select.Option value="Development">Development</Select.Option>
        <Select.Option value="Delivered">Delivered</Select.Option>
        <Select.Option value="Services">Services</Select.Option>
        <Select.Option value="Maintenance">Maintenance</Select.Option>
      </Select>
    ),
  },
  { title: "Location", dataIndex: "location", key: "location" },
  { title: "Start Date", dataIndex: "startDate", key: "startDate" },
  { title: "Role", dataIndex: "role", key: "role" },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <span>
        <Button type="link">Edit</Button>
        <Button type="link" danger>
          Delete
        </Button>
      </span>
    ),
  },
];

const CXSkillArchitectureAssign = () => {
  return (
    <CMLayout>
      <Header breadcrumbPath="Customer Management / CX Skill Architecture / Assign" />
      <div style={{ padding: "24px" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 24 }}
        >
          <div>
            <Select
              defaultValue="Status: All"
              style={{ width: 120, marginRight: 16 }}
            >
              <Select.Option value="all">Status: All</Select.Option>
              {/* Add other status options */}
            </Select>
            <Button style={{ marginRight: 16 }}>Bulk Action</Button>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
            <Button type="primary" style={{ marginLeft: 8 }}>
              Search
            </Button>
          </div>
          <Button style={{ background: "#8C5BF2", color: "white" }}>
            Help 360 Assesment
          </Button>
        </Flex>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          footer={() => <TableFooter />}
        />
      </div>
    </CMLayout>
  );
};

export default CXSkillArchitectureAssign;
