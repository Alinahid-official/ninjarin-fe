import React, { useEffect } from "react";
import { Modal, Button, Select, Upload, Input, Typography, Flex } from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import InventorySelectors from "@/redux/inventory/selectors";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";
import { useDispatch } from "react-redux";
import InventoryActions from "@/redux/inventory/actions";

const SelectInventoryModal = ({
  open,
  onCancel,
  onAdd,
  inventoryType,
  value,
  recordColumnKey,
}) => {
  console.log("selectedInventory", recordColumnKey);
  const dispatch = useDispatch();
  const inventories = useSelector(InventorySelectors.getInventories);
  const [selectedInventory, setSelectedInventory] = React.useState(value);
  const [searchTerm, setSearchTerm] = React.useState("");
  const labels = useSelector(SkillArchitectureSelectors.getLabels);

  const handleAdd = () => {
    console.log("recordColumnKey", recordColumnKey);
    if (recordColumnKey) {
      onAdd({ [recordColumnKey]: selectedInventory });
      setSelectedInventory(null);
    } else {
      onAdd({ [inventoryType]: selectedInventory });
    }
  };

  const handleAddNew = () => {
    dispatch(
      InventoryActions.addInventory({
        type: inventoryType || recordColumnKey,
        name: searchTerm,
      })
    );
  };
  useEffect(() => {
    if (inventoryType) {
      dispatch(
        InventoryActions.getInventories({
          type: inventoryType,
        })
      );
    }
    if (recordColumnKey) {
      dispatch(
        InventoryActions.getInventories({
          type: recordColumnKey,
        })
      );
    }
  }, [inventoryType, recordColumnKey]);

  if (!labels) return null;

  const typeLabel = labels[inventoryType]?.label || inventoryType;
  const customNotFoundContent = (
    <Flex align="center" style={{ padding: 16 }}>
      <div>Couldn't find the Industry?</div>
      <Button type="link" onClick={handleAddNew}>
        Add New
      </Button>
    </Flex>
  );
  return (
    <Modal
      title={typeLabel}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="add"
          type="primary"
          onClick={handleAdd}
          style={{ backgroundColor: "#9D43FE" }}
        >
          {value ? "Update" : "Add"}
        </Button>,
      ]}
    >
      <p style={{ marginBottom: 16 }}>Select only one industry at a time</p>

      <div style={{ marginBottom: 24 }}>
        <p style={{ marginBottom: 8 }}>
          {labels[inventoryType]?.label || inventoryType}
        </p>
        <Select
          onSearch={(value) => setSearchTerm(value)}
          placeholder={"Search or Add New"}
          style={{ width: "100%" }}
          onChange={(value) => setSelectedInventory(value)}
          value={selectedInventory || value}
          showSearch
          notFoundContent={customNotFoundContent}
        >
          {inventories?.map((inventory) => (
            <Select.Option key={inventory._id} value={inventory.name}>
              {inventory.name}
            </Select.Option>
          ))}
          {/* Add more industries as needed */}
        </Select>
      </div>

      <div style={{ marginBottom: 24 }}>
        <p style={{ textAlign: "center", color: "#666" }}>OR</p>
      </div>

      <div
        style={{
          border: "2px dashed #EDE9FE",
          borderRadius: 8,
          padding: 24,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <Upload.Dragger
          accept=".csv"
          beforeUpload={(file) => {
            // Handle CSV file upload here
            console.log("Uploaded file:", file);
            return false; // Prevent automatic upload
          }}
        >
          <p>
            <UploadOutlined /> Upload CSV file*
          </p>
        </Upload.Dragger>
      </div>

      <div
        style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}
      >
        <span role="img" aria-label="light bulb" style={{ fontSize: 24 }}>
          💡
        </span>
        <div>
          <p style={{ margin: 0 }}>Need help importing data?</p>
          <p style={{ margin: 0, color: "#666" }}>
            We can help you get started, and get your data into Ninzarin.
          </p>
        </div>
        <Button type="link" style={{ marginLeft: "auto", color: "#9D43FE" }}>
          Download template
        </Button>
      </div>
    </Modal>
  );
};

export default SelectInventoryModal;
