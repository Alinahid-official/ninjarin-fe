import React from "react";
import { Form, Input, Button, Flex, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const AddUserForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // Convert moment object to string for Start Date
      if (values.startDate) {
        values.startDate = values.startDate.format("YYYY-MM-DD");
      }
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
          height: "calc(100% - 80px)", // Adjust based on footer height
          overflowY: "auto",
          padding: "0 24px",
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName">
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Email ID"
          name="email"
          rules={[
            { required: true, message: "Please enter email ID" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email ID" />
        </Form.Item>

        <Form.Item label="Employee ID" name="employeeId">
          <Input placeholder="Enter employee ID" />
        </Form.Item>

        <Form.Item label="Job Title" name="jobTitle">
          <Input placeholder="Enter job title" />
        </Form.Item>

        <Form.Item label="Department" name="department">
          <Input placeholder="Enter department" />
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item label="Client" name="client">
          <Input placeholder="Enter client name" />
        </Form.Item>

        <Form.Item label="Start Date" name="startDate">
          <DatePicker style={{ width: "100%" }} placeholder="Select start date" />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select placeholder="Select role">
            <Option value="Employee">Employee</Option>
            <Option value="Admin">Admin</Option>
            {/* Add other roles as needed */}
          </Select>
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
          textAlign: "right",
        }}
      >
        <Flex justify="flex-end" gap={12}>
          <Button
            onClick={() => {
              onCancel?.();
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default AddUserForm;