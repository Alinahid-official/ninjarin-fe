import React, { useEffect, useState } from "react";
import { Table, Button, Typography, Flex, Input, Tabs, Popconfirm } from "antd";
import {
  PlusOutlined,
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
import TableFooter from "@/pages/dashboard/TableFooter";
import { formatToMonthDayYear } from "@/utilities/time";
import { GoPencil } from "react-icons/go";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";

const { Title } = Typography;

const excludedKeys = [
  "_id",
  "customerId",
  "createdAt",
  "updatedAt",
  "__v",
  "assigned",
];
const InventoryTable = () => {
  const dispatch = useDispatch();
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("industry"); // Add state for selected type
  const inventories = useSelector(InventorySelectors.getInventories);
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  const labels = useSelector(SkillArchitectureSelectors.getLabels);
  const columns = [
    {
      title: labels[selectedType]?.label || selectedType,
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 500,
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "creationDate",
      render: (date) => formatToMonthDayYear(date),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Flex gap={8}>
          <Button
            type="text"
            icon={<GoPencil style={{ color: "#9D43FE" }} />}
          />
          <Popconfirm
            title={"Are you sure?"}
            okText={"Yes"}
            cancelText={"No"}
            onConfirm={() => {
              dispatch(InventoryActions.deleteInventory(record._id));
            }}
          >
            <Button
              icon={<DeleteOutlined style={{ color: "#9D43FE" }} />}
              type="link"
              style={{ padding: 0, color: "#1677ff" }}
            ></Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const items = Object.entries(labels)
    .filter(
      ([key, value]) =>
        !excludedKeys.includes(key) && value !== null && value["isActive"]
    )
    .map(([key, value], index) => ({
      label:
        index === 0 ? (
          <div style={{ padding: "0 15px" }}>{value?.label || key}</div>
        ) : (
          value?.label || key
        ),
      key,
    }));

  // Handle tab change
  const handleTabChange = (activeKey) => {
    setSelectedType(activeKey);
  };

  const handleAddFunction = (values) => {
    values.type = selectedType; // Use the selected type from state
    dispatch(InventoryActions.addInventory(values));
    setIsAddDrawerOpen(false);
  };

  useEffect(() => {
    if (!inventories && currentCustomer) {
      dispatch(InventoryActions.getInventories());
    }
  });

  return (
    <div className="nz-border nz-border-radius">
      <Tabs
        items={items}
        className="nz-pink-tab"
        activeKey={selectedType}
        onChange={handleTabChange}
      />

      <div>
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 16, padding: "0 18px" }}
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
              Add {labels[selectedType]?.label || selectedType}
            </Button>
          </Flex>
        </Flex>

        <Table
          style={{ height: "70vh", display: "flex", flexDirection: "column" }}
          columns={columns}
          dataSource={inventories}
          pagination={false}
          scroll={{ y: "calc(70vh - 120px)" }}
          footer={() => <TableFooter />}
          className="inventory-table-with-footer"
        />
        <CommonDrawer
          title={`Add ${
            selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
          }`}
          subTitle={`Fill all the required field to add ${selectedType}.`}
          open={isAddDrawerOpen}
          onClose={() => setIsAddDrawerOpen(false)}
        >
          <AddInventoryForm
            onSubmit={handleAddFunction}
            onCancel={() => setIsAddDrawerOpen(false)}
            selectedType={selectedType}
          />
        </CommonDrawer>
      </div>
    </div>
  );
};

export default InventoryTable;
