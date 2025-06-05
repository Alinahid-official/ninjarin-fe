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
import requestingSelector from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import AlertError from "@/components/error/AlertError";

const { Title } = Typography;

const excludedKeys = [
  "_id",
  "customerId",
  "createdAt",
  "updatedAt",
  "__v",
  "assigned",
];
const selectError = makeSelectErrorModel();
const InventoryTable = () => {
  const dispatch = useDispatch();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [selectedType, setSelectedType] = useState();
  const loading = useSelector((state) =>
    requestingSelector(state, [InventoryActions.GET_INVENTORIES])
  );
  const error = useSelector((state) =>
    selectError(state, [InventoryActions.GET_INVENTORIES_FINISHED])
  );
  // Add state for selected type
  const inventories = useSelector(InventorySelectors.getInventories);
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  const labels = useSelector(SkillArchitectureSelectors.getLabels);
  const selectedInventory = useSelector(
    InventorySelectors.getSelectedInventory
  );
  const pagination = useSelector(InventorySelectors.getPagination);
  const columns = [
    {
      title: labels[selectedType]?.label || selectedType,
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Creation Date",
      dataIndex: "createdAt",
      key: "creationDate",
      width: 150,
      render: (date) => formatToMonthDayYear(date),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Flex gap={8}>
          <Button
            type="text"
            icon={<GoPencil style={{ color: "#9D43FE" }} />}
            onClick={() => {
              dispatch(InventoryActions.setSelectedInventory(record));
            }}
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

  const handleCloseDrawer = () => {
    setIsAddDrawerOpen(false);
    dispatch(InventoryActions.setSelectedInventory(null));
  };
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
    if (selectedInventory) {
      dispatch(InventoryActions.updateInventory(selectedInventory._id, values));
      dispatch(InventoryActions.setSelectedInventory(null)); // Clear selected inventory after update
      return;
    }
    values.type = selectedType; // Use the selected type from state
    dispatch(InventoryActions.addInventory(values));
    setIsAddDrawerOpen(false);
  };

  const handlePageChange = (page) => {
    dispatch(
      InventoryActions.getInventories({
        type: selectedType,
        page,
        limit: pagination?.limit,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    dispatch(
      InventoryActions.getInventories({
        type: selectedType,
        limit: pageSize,
        page: pagination?.page,
      })
    );
  };
  useEffect(() => {
    if (!inventories && currentCustomer) {
      dispatch(InventoryActions.getInventories({ type: selectedType }));
    }
  }, [currentCustomer]);

  useEffect(() => {
    if (selectedType) {
      dispatch(InventoryActions.getInventories({ type: selectedType }));
    }
  }, [selectedType]);
  useEffect(() => {
    if (items?.length > 0) {
      handleTabChange(items[0].key);
    }
  }, []);
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
        {error && <AlertError error={error} />}
        <Table
          loading={loading}
          style={{ height: "70vh", display: "flex", flexDirection: "column" }}
          columns={columns}
          dataSource={inventories}
          pagination={false}
          scroll={{ y: "calc(70vh - 120px)" }}
          footer={() => (
            <TableFooter
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              totalItems={pagination?.total}
              pageSize={pagination?.limit}
              currentPage={pagination?.page}
              pageCount={pagination?.pages}
              name={labels[selectedType]?.label || selectedType}
            />
          )}
          className="inventory-table-with-footer"
          rowSelection={{ type: "checkbox" }}
        />
        <CommonDrawer
          title={`Add ${
            selectedType?.charAt(0).toUpperCase() + selectedType?.slice(1)
          }`}
          subTitle={`Fill all the required field to add ${selectedType}.`}
          open={isAddDrawerOpen || selectedInventory}
          onClose={handleCloseDrawer}
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
