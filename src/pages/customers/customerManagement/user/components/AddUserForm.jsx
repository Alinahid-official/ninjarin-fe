import React from "react";
import { Form, Input, Button, Flex, DatePicker, Select } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import UserActions from "@/redux/user/actions";
import CustomerSelectors from "@/redux/customer/selectors";

const { Option } = Select;

const AddUserForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  // Set initial values for the form
  const initialValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    employeeId: "EMP-001",
    jobTitle: "Software Engineer",
    department: "Engineering",
    location: "New York",
    client: "Acme Corp",
    startDate: moment(), // Current date
    role: "employee",
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values, currentCustomer);
      values.customerId = currentCustomer?._id;
      // Convert moment object to string for Start Date
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
      initialValues={initialValues} // Set the initial values here
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
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select start date"
          />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select placeholder="Select role">
            <Option value="employee">Employee</Option>
            <Option value="admin">Admin</Option>
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
