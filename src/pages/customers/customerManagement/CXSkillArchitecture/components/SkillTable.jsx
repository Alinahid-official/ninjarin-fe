import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Typography,
  Flex,
  Card,
  Dropdown,
  Menu,
  Popconfirm,
  Spin,
} from "antd"; // Added Dropdown and Menu
import {
  SyncOutlined,
  PlusOutlined,
  MoreOutlined,
  ApartmentOutlined, // Import the icon
  CopyOutlined, // Added for Duplicate
  EditOutlined, // Added for Edit
  DeleteOutlined, // Added for Delete
} from "@ant-design/icons";
import CommonDrawer from "@/components/common/Drawer";
import OrganizationDesignForm from "./OrganizationDesignForm";
import AddOrganizationDesignForm from "./AddOrganizationDesignForm"; // Ensure this is correctly imported
import { useSelector } from "react-redux";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";
import EditableInputField from "@/components/common/EditableInputField";
import EditableLabelField from "./EditableLabelField";
import LabelIcon from "@/assets/images/skillManagement/skill-table-label-icon.png";
import styled from "styled-components"; // Import styled-components
import CustomerActions from "@/redux/customer/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import SkillArchitectureActions from "@/redux/skillArchitecture/actions";
import BlankList from "@/components/common/BlankList";
import { useDispatch } from "react-redux";
import CustomerSelectors from "@/redux/customer/selectors";
import SelectInventoryModal from "./SelectInventoryModal";
import { router } from "@/utilities/routes";
const { Title } = Typography;

// Define the StyledTableCard component
const StyledTableCard = styled(Card)`
  // Target header cells
  .ant-table-thead > tr > th {
    height: 60px; // Set your desired header cell height
    padding: 8px 16px; // Adjust padding as needed
    vertical-align: middle; // Optional: align header text vertically
  }

  // Target body cells
  .ant-table-tbody > tr > td {
    height: 50px; // Set your desired body cell height
    padding: 0px 15px; // Adjust padding as needed
    vertical-align: middle; // Align content vertically in the cell
  }

  // You can also set a height for the entire row if needed
  .ant-table-tbody > tr {
    // height: 50px; // This would be redundant if td height is set
  }
`;

const SkillTable = ({ isEmployee }) => {
  const dispatch = useDispatch();
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isInventoryModalVisible, setIsInventoryModalVisible] = useState(false);
  const [selectedColumnKey, setSelectedColumnKey] = useState(null);
  const [selectedRecordColumnKey, setSelectedRecordColumnKey] = useState(null);
  const [selectedRecordValue, setSelectedRecordValue] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  // Add this before the return statement

  const handleInventoryModalCancel = () => {
    setIsInventoryModalVisible(false);
    setSelectedRecordId(null);
    setSelectedRecordColumnKey(null);
    setSelectedRecordValue(null);
  };

  const handleIndustryAdd = (data) => {
    if (selectedRecordId) {
      dispatch(
        SkillArchitectureActions.updateRecord(
          currentCustomer._id,
          selectedRecordId,
          data
        )
      );
      setIsInventoryModalVisible(false);
      setSelectedRecordId(null);
      setSelectedRecordColumnKey(null);
      setSelectedRecordValue(null);
    } else {
      dispatch(SkillArchitectureActions.saveRecord(currentCustomer._id, data));
      setIsInventoryModalVisible(false);
    }
    // Add your industry handling logic here
    setIsInventoryModalVisible(false);
  };
  const labels = useSelector(SkillArchitectureSelectors.getLabels);
  const labelsLoading = useSelector((state) =>
    requestingSelector(state, [SkillArchitectureActions.GET_LABELS])
  );
  const records = useSelector(SkillArchitectureSelectors.getRecords);
  const recordsLoading = useSelector((state) =>
    requestingSelector(state, [SkillArchitectureActions.GET_RECORDS])
  );
  const customers = useSelector(CustomerActions.getCustomers);
  const customerLoading = useSelector((state) =>
    requestingSelector(state, [CustomerActions.GET_CUSTOMERS])
  );
  const deleteLoading = useSelector((state) =>
    requestingSelector(state, [SkillArchitectureActions.DELETE_RECORD])
  );
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  const handleUpdateDesign = () => {
    setIsUpdateDrawerOpen(true);
  };

  const handleUpdateDrawerClose = () => {
    setIsUpdateDrawerOpen(false);
  };

  const handleUpdateDesignSubmit = (values) => {
    dispatch(
      SkillArchitectureActions.updateLabel(
        labels._id,
        currentCustomer._id,
        values
      )
    );
    setIsUpdateDrawerOpen(false);
  };

  const handleOpenAddDesignDrawer = () => {
    // Renamed from handleAddDesign
    setIsAddDrawerOpen(true);
  };

  const handleAddDrawerClose = () => {
    setIsAddDrawerOpen(false);
  };

  const handleAddDesignSubmit = (values) => {
    dispatch(SkillArchitectureActions.saveRecord(currentCustomer._id, values));
    // setIsAddDrawerOpen(false); // Decide if drawer should close on submit
  };

  const handleMenuClick = (e, record, keyType) => {
    if (e.key === "delete") {
      dispatch(
        SkillArchitectureActions.deleteRecord(currentCustomer._id, record._id)
      );
    } else if (e.key === "duplicate") {
      // Create a new record object without _id, __v, and createdAt
      const { _id, __v, _, ...recordToDuplicate } = record;

      dispatch(
        SkillArchitectureActions.saveRecord(
          currentCustomer._id,
          recordToDuplicate
        )
      );
    } else if (e.key === "edit") {
      setIsInventoryModalVisible(true);
      setSelectedRecordColumnKey(keyType);
      setSelectedRecordValue(record[keyType]);
      setSelectedRecordId(record._id);
      setSelectedColumnKey(keyType);
    }
    // e.key will be 'duplicate', 'edit', or 'delete'
    // record will be the data for the current row
    // keyType will be the dataIndex of the column (e.g., 'industry', 'organization')
    console.log(`Clicked ${e.key} for ${keyType}:`, record);
    // Implement actual logic for duplicate, edit, delete here
    // For example:
    // if (e.key === 'edit') { /* open edit modal with record data */ }
    // if (e.key === 'delete') { /* show confirmation and delete record */ }
  };

  const getMenuItems = (record, keyType) => (
    <Menu onClick={(e) => handleMenuClick(e, record, keyType)}>
      <Menu.Item key="duplicate" icon={<CopyOutlined />}>
        Duplicate
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        <Popconfirm
          title="Delete Record"
          description="Are you sure you want to delete this record?"
          onConfirm={() =>
            dispatch(
              SkillArchitectureActions.deleteRecord(
                currentCustomer._id,
                record[keyType]
              )
            )
          }
          okText="Yes"
          cancelText="No"
        >
          Delete
          {deleteLoading && (
            <span>
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            </span>
          )}
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const commonRender = (text, record, dataIndex) => (
    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
      <span
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "calc(100% - 30px)", // Adjust maxWidth to leave space for the button
        }}
        title={text} // Show full text on hover
      >
        {text}
      </span>
      {!isEmployee && (
        <Dropdown
          placement="bottomRight"
          overlay={() => getMenuItems(record, dataIndex)}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} size="small" />
        </Dropdown>
      )}
    </Flex>
  );

  const getColumns = () => {
    if (!labels) {
      return []; // Use default columns if labels is null
    }

    // Filter out unwanted keys and create columns dynamically
    const excludedKeys = ["_id", "customerId", "createdAt", "updatedAt", "__v"];
    return Object.entries(labels)
      .filter(
        ([key, value]) =>
          !excludedKeys.includes(key) && value !== null && value["isActive"]
      )
      .map(([key, value]) => {
        // 'value' here is the label's text, not the row data's value for this key
        return {
          title: (
            <Flex
              align="center"
              style={{
                padding: "5px 5px",
                background: "#FFFFFF",
                borderRadius: "15px",
                width: "200px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#F1FAFE",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  borderRadius: "10px",
                  marginRight: "10px",
                  border: "1px solid #E5EDF1",
                }}
              >
                <div>
                  <img
                    src={LabelIcon}
                    style={{
                      marginRight: 8,

                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </div>
              </div>

              <div>
                <div
                  style={{ color: "#6B7280", fontSize: 12, marginBottom: 2 }}
                >
                  Label
                </div>
                <div style={{ fontWeight: 600 }}>
                  {isEmployee ? (
                    value.label
                  ) : (
                    <EditableLabelField
                      name={key}
                      value={value.label}
                      customerId={labels.customerId}
                      labelId={labels._id}
                    />
                  )}
                  {/* <EditableLabelField
                    name={key}
                    value={value.label}
                    customerId={labels.customerId}
                    labelId={labels._id}
                  /> */}
                </div>
              </div>
            </Flex>
          ),
          dataIndex: key,
          key: key,
          render: (cellData, record) => {
            if (key === "assigned") {
              return (
                <Button
                  disabled={isEmployee}
                  onClick={() => {
                    router.navigate(
                      `/customers/${currentCustomer._id}/cx-skills-architecture/${record._id}/assign`
                    );
                  }}
                  type="default"
                  style={{
                    border: "1px solid #8C5BF2",
                    color: "#8C5BF2",
                    backgroundColor: "#F6F1FF",

                    width: "100%",
                  }}
                >
                  Assigned 2K+
                </Button>
              );
            }

            // For other columns, use the existing rendering logic
            const displayValue =
              cellData && cellData !== undefined ? (
                String(cellData)
              ) : (
                <span style={{ color: "#FEC8D4", fontSize: "14px" }}>NA</span>
              );
            // 'key' is the dataIndex for this dynamically generated column.
            // Pass it to commonRender as the dataIndex argument.
            return commonRender(displayValue, record, key);
          },
        };
      });
  };
  // Add row component for the "add" buttons
  const AddRow = () => {
    return (
      <tr>
        {getColumns().map((column) => {
          return (
            <td key={column.key}>
              <Button
                onClick={() => {
                  setIsInventoryModalVisible(true);
                  setSelectedColumnKey(column.key); // Add state for selected column key
                }}
                type="text"
                icon={<PlusOutlined />}
                style={{
                  color: "#8C5BF2",
                  background: "#EDE9FE",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                {labels ? labels[column.key]["label"] : column.key}
              </Button>
            </td>
          );
        })}
      </tr>
    );
  };
  useEffect(() => {
    if (currentCustomer) {
      dispatch(SkillArchitectureActions.getLabels(currentCustomer._id));
      dispatch(SkillArchitectureActions.getRecords(currentCustomer._id));
    }
  }, [currentCustomer]);
  if (customerLoading || !customers || labelsLoading || recordsLoading) {
    return <BlankList isLoading={true} />;
  }

  return (
    <div>
      <Flex
        justify="space-between"
        align="center"
        style={{
          padding: "20px",
          border: "1px solid #0000001A",
          borderBottom: "none",
          borderRadius: "10px 10px 0 0",
          marginTop: "30px",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {isEmployee ? "Skills Map" : "Ninjarin Skills Architecture"}
        </Title>
        {isEmployee ? (
          <Button
            style={{
              background: "#FFFFFF",
              color: "#8C5BF2",
              borderColor: "#8C5BF2",
            }}
          >
            Suggest update?
          </Button>
        ) : (
          <Flex gap={12}>
            <Button
              onClick={handleUpdateDesign}
              icon={<EditOutlined />}
              style={{
                background: "#FFFFFF",
                color: "#8C5BF2",
                borderColor: "#8C5BF2",
              }}
            >
              Update
            </Button>
            <Button
              onClick={handleOpenAddDesignDrawer}
              style={{
                color: "#8C5BF2",
                borderColor: "#8C5BF2",
              }}
            >
              Add Organization Design
            </Button>
          </Flex>
        )}
      </Flex>

      {/* Use the StyledTableCard here instead of the regular Card */}
      <StyledTableCard
        bodyStyle={{ padding: 0 }}
        bordered={false}
        style={{ borderRadius: "0 0 8 8", overflowX: "auto", height: "70vh" }}
      >
        <Table
          bordered
          columns={getColumns()}
          dataSource={records}
          pagination={false}
          components={{
            body: {
              wrapper: (props) => (
                <tbody {...props}>
                  {!isEmployee && <AddRow />}

                  {props.children}
                </tbody>
              ),
            },
          }}
          style={{ borderRadius: 8 }}
          // className="custom-height-table" // This className is not needed if using StyledTableCard
        />
      </StyledTableCard>

      <CommonDrawer
        title="Update Organization Design"
        open={isUpdateDrawerOpen}
        onClose={handleUpdateDrawerClose}
        width={520}
      >
        <OrganizationDesignForm
          onSubmit={handleUpdateDesignSubmit}
          onCancel={handleUpdateDrawerClose}
        />
      </CommonDrawer>

      {/* New Drawer for Adding Organization Design */}
      <CommonDrawer
        title="Add Organization Design"
        // subTitle="Fill in the details to add a new organization design." // Optional: Add a subtitle if needed
        open={isAddDrawerOpen}
        onClose={handleAddDrawerClose}
        width={520} // Or adjust width as needed, image looks like a standard drawer width
      >
        <AddOrganizationDesignForm
          onSubmit={handleAddDesignSubmit}
          onCancel={handleAddDrawerClose}
        />
      </CommonDrawer>
      <SelectInventoryModal
        open={isInventoryModalVisible || selectedRecordColumnKey}
        onCancel={handleInventoryModalCancel}
        onAdd={handleIndustryAdd}
        inventoryType={selectedColumnKey}
        value={selectedRecordValue}
        recordId={selectedRecordId}
        recordColumnKey={selectedRecordColumnKey}
      />
    </div>
  );
};

export default SkillTable;
