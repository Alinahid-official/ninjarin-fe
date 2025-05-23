import React from "react";
import { Form, Input, Button, Flex } from "antd";

const AddInventoryForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      onSubmit?.(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ height: "100%" }}
      requiredMark={false}
    >
      <div
        style={{
          height: "calc(100% - 80px)",
          overflowY: "auto",
          padding: "0 24px",
        }}
      >
        <Form.Item
          label="Function"
          name="name"
          rules={[{ required: true, message: "Please enter function name" }]}
        >
          <Input placeholder="Add Function" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter description"
            style={{ resize: "none" }}
          />
        </Form.Item>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #f0f0f0",
          padding: "24px",
          background: "#fff",
          right: 0,
        }}
      >
        <Flex gap={12}>
          <Button
            style={{ width: "50%" }}
            onClick={() => {
              onCancel?.();
              form.resetFields();
            }}
          >
            Save & Add New
          </Button>
          <Button
            type="primary"
            style={{ width: "50%" }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default AddInventoryForm;
