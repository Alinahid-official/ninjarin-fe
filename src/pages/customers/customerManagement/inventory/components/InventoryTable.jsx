import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Flex, Input, Tabs, Popconfirm } from "antd";
import {
  SyncOutlined,
  PlusOutlined,
  MoreOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CommonDrawer from "@/components/common/Drawer";
import AddInventoryForm from "./AddInventoryForm";
import { useDispatch } from "react-redux";
import InventoryActions from "@/redux/inventory/actions";
import { useSelector } from "react-redux";
import InventorySelectors from "@/redux/inventory/selectors";
import CustomerSelectors from "@/redux/customer/selectors";

const { Title } = Typography;

const InventoryTable = () => {
  const dispatch = useDispatch();
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const inventories = useSelector(InventorySelectors.getInventories);
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
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
      dataIndex: "name",
      key: "name",
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
      render: (_, record) => (
        <Flex gap={8}>
          <Button type="text" icon={<MoreOutlined />} />
          <Popconfirm
            title={"Are you sure?"}
            okText={"Yes"}
            cancelText={"No"}
            onConfirm={() => {
              dispatch(InventoryActions.deleteInventory(record._id));
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
        </Flex>
      ),
    },
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
    values.type = "function";
    dispatch(InventoryActions.addInventory(values));
    setIsAddDrawerOpen(false);
  };

  useEffect(() => {
    if (!inventories || (inventories.length === 0 && currentCustomer)) {
      dispatch(InventoryActions.getInventories());
    }
  });

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
          dataSource={inventories}
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
