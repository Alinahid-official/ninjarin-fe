import React from "react";
import { Modal, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import InventorySelectors from "@/redux/inventory/selectors";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";

const SelectInventoryModal = ({
  open,
  onCancel,
  onAdd,
  inventoryType,
  value,

  recordColumnKey,
}) => {
  const inventories = useSelector(InventorySelectors.getInventories);
  const [selectedInventory, setSelectedInventory] = React.useState(value);
  const labels = useSelector(SkillArchitectureSelectors.getLabels);
  const handleAdd = () => {
    if (selectedInventory) {
      onAdd({ [recordColumnKey]: selectedInventory });
      setSelectedInventory(null);
    }
  };
  if (!labels) return null;

  return (
    <Modal
      title={labels[inventoryType]?.label || inventoryType}
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
          placeholder={`Select ${
            labels[inventoryType]?.label || inventoryType
          }`}
          style={{ width: "100%" }}
          onChange={(value) => setSelectedInventory(value)}
          value={selectedInventory || value}
          showSearch
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
