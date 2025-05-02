import React from "react";
import { Table, Select, Input, Button, Flex, Tabs } from "antd";
import {
  SearchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const CustomerTable = () => {
  const tabItems = [
    {
      key: 'all',
      label: <span>All Customers <span style={{ marginLeft: 4 }}>12</span></span>,
    },
    {
      key: 'consulting',
      label: <span>Consulting <span style={{ marginLeft: 4 }}>4</span></span>,
    },
    {
      key: 'career',
      label: <span>Career Mapping <span style={{ marginLeft: 4 }}>4</span></span>,
    },
    {
      key: 'recruitment',
      label: <span>Recruitment <span style={{ marginLeft: 4 }}>4</span></span>,
    },
    {
      key: 'learning',
      label: <span>Learning & Development <span style={{ marginLeft: 4 }}>4</span></span>,
    },
    {
      key: 'succession',
      label: <span>Succession Planning <span style={{ marginLeft: 4 }}>4</span></span>,
    },
  ];

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {text.charAt(0)}
          </div>
          <span style={{ color: "#1677ff" }}>{text}</span>
        </div>
      ),
    },
    {
      title: "Projects",
      dataIndex: "projects",
      key: "projects",
      render: (projects) => (
        <div>
          {projects.map((project, index) => (
            <div key={index} style={{ color: "#1677ff" }}>
              {project}
            </div>
          ))}
          {projects.length > 3 && (
            <div style={{ color: "#1677ff" }}>+ {projects.length - 3} more</div>
          )}
        </div>
      ),
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
    },
    {
      title: "CX Admin",
      dataIndex: "cxAdmin",
      key: "cxAdmin",
      render: (admin) => (
        <div>
          <div>{admin.name}</div>
          <div style={{ color: "#9e9e9e", fontSize: 12 }}>{admin.email}</div>
        </div>
      ),
    },
    {
      title: "Project Type",
      dataIndex: "projectType",
      key: "projectType",
      render: (types) => (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {types.map((type, index) => (
            <span
              key={index}
              style={{
                padding: "4px 12px",
                borderRadius: "16px",
                background: getTypeColor(type).bg,
                color: getTypeColor(type).text,
              }}
            >
              {type}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div style={{ display: "flex", gap: 16 }}>
          <Button type="link" style={{ padding: 0 }}>
            Edit
          </Button>
          <Button type="link" style={{ padding: 0, color: "#ff4d4f" }}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const getTypeColor = (type) => {
    const colors = {
      "Career Mapping": { bg: "#e8f5e9", text: "#2e7d32" },
      Assessment: { bg: "#ffebee", text: "#c62828" },
      "Succession Planning": { bg: "#fce4ec", text: "#c2185b" },
      Consulting: { bg: "#fff3e0", text: "#ef6c00" },
      Services: { bg: "#e8f5e9", text: "#2e7d32" },
      "Change Management": { bg: "#fff8e1", text: "#f9a825" },
    };
    return colors[type] || { bg: "#f5f5f5", text: "#757575" };
  };

  const data = [
    {
      key: "1",
      customer: "Wipro",
      projects: [
        "Wipro Supernova",
        "West Bengal Data Center",
        "State Data Center",
      ],
      industry: "Technology",
      cxAdmin: { name: "Prathik Chaudhari", email: "prathik@wipro.com" },
      projectType: ["Career Mapping", "Assessment"],
    },
    // Add more data as needed
  ];

  return (
    <div className="nz-border nz-border-radius">
      <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
        <Tabs
          items={tabItems}
          defaultActiveKey="all"
          onChange={(key) => console.log(key)}
        />
        <Flex gap="middle" align="center" style={{ marginTop: 16 }}>
          <Select
            defaultValue="All"
            style={{ width: 200 }}
            options={[{ value: "All", label: "Project Type: All" }]}
          />
          <Select
            defaultValue="All"
            style={{ width: 200 }}
            options={[{ value: "All", label: "Filter: All" }]}
          />
          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <div style={{ marginLeft: "auto" }}>
            <Button.Group>
              <Button icon={<UnorderedListOutlined />}>List</Button>
              <Button icon={<AppstoreOutlined />}>Grid</Button>
            </Button.Group>
          </div>
        </Flex>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          total: 30,
          pageSize: 10,
          showTotal: (total, range) =>
            `Showing ${range[0]} of ${total} Customers`,
        }}
      />
    </div>
  );
};

export default CustomerTable;
