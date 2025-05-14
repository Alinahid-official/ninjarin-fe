import React, { useState } from "react";
import { Table, Button, Typography, Flex, Input, Tabs } from "antd";
import {
  SyncOutlined,
  PlusOutlined,
  MoreOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CommonDrawer from "@/components/common/Drawer";
import AddInventoryForm from "./AddInventoryForm";

const { Title } = Typography;

const InventoryTable = () => {
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      width: 50,
      render: () => <input type="checkbox" />,
    },
    {
      title: "Function",
      dataIndex: "function",
      key: "function",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Creation Date",
      dataIndex: "creationDate",
      key: "creationDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Flex gap={8}>
          <Button type="text" icon={<MoreOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Flex>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      function: "Technology (IT)",
      description: "Helps businesses to launch SaaS product",
      creationDate: "May 25, 2023",
    },
    // Add more data as needed
  ];

  const items = [
    { label: "Function", key: "function" },
    { label: "Verticals", key: "verticals" },
    { label: "Bands", key: "bands" },
    { label: "Grades", key: "grades" },
    { label: "Roles", key: "roles" },
    { label: "Skills", key: "skills" },
    { label: "Sub-Skills", key: "subSkills" },
    { label: "Description", key: "description" },
    { label: "Type of Roles", key: "typeOfRoles" },
  ];

  const handleAddFunction = (values) => {
    console.log("New function values:", values);
    setIsAddDrawerOpen(false);
  };

  return (
    <div>
      <Tabs items={items} />

      <div style={{ padding: "16px 0" }}>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16 }}
        >
          <Flex gap={16} align="center">
            <Button>Bulk Action</Button>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
          </Flex>
          <Flex gap={16}>
            <Button>Import</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddDrawerOpen(true)}
            >
              Add Function
            </Button>
          </Flex>
        </Flex>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: 240,
            pageSize: 10,
            current: 1,
            showTotal: (total, range) =>
              `Showing ${range[0]} of ${range[1]} of ${total} Projects`,
          }}
        />
        <CommonDrawer
          title="Add Function"
          subTitle="Fill all the required field to add function."
          open={isAddDrawerOpen}
          onClose={() => setIsAddDrawerOpen(false)}
        >
          <AddInventoryForm
            onSubmit={handleAddFunction}
            onCancel={() => setIsAddDrawerOpen(false)}
          />
        </CommonDrawer>
      </div>
    </div>
  );
};

export default InventoryTable;
