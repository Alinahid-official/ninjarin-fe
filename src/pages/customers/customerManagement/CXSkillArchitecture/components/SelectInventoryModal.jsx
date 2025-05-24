import React from "react";
import { Modal, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const SelectInventoryModal = ({ open, onCancel, onAdd }) => {
  const [selectedInventory, setSelectedInventory] = React.useState(null);

  const handleAdd = () => {
    if (selectedInventory) {
      onAdd(selectedInventory);
      setSelectedInventory(null);
    }
  };

  return (
    <Modal
      title="Add Industry"
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
          Add
        </Button>,
      ]}
    >
      <p style={{ marginBottom: 16 }}>Select only one industry at a time</p>

      <div style={{ marginBottom: 24 }}>
        <p style={{ marginBottom: 8 }}>Industry</p>
        <Select
          placeholder="Select industry"
          style={{ width: "100%" }}
          onChange={(value) => setSelectedInventory(value)}
          value={selectedInventory}
        >
          <Select.Option value="technology">Technology</Select.Option>
          <Select.Option value="healthcare">Healthcare</Select.Option>
          <Select.Option value="finance">Finance</Select.Option>
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
