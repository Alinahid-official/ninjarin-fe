import React, { useState, useEffect } from "react";
import { Form, Input, Button, Flex, DatePicker, Select } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import CustomerSelectors from "@/redux/customer/selectors";
import UserSelectors from "@/redux/user/selectors";
import requestingSelector from "@/redux/requesting/requestingSelector";
import UserActions from "@/redux/user/actions";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import FullAlertError from "@/components/error/FullAlertError";

const { Option } = Select;
const selectError = makeSelectErrorModel();
const AddUserForm = ({ onSubmit, onCancel, form }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [prevLoading, setPrevLoading] = useState(false);
  const loading = useSelector((state) =>
    requestingSelector(state, [
      isEdit ? UserActions.UPDATE_USER : UserActions.ADD_USER,
    ])
  );
  const error = useSelector((state) =>
    selectError(state, [
      isEdit ? UserActions.UPDATE_USER_FINISHED : UserActions.ADD_USER_FINISHED,
    ])
  );
  const selectedUser = useSelector(UserSelectors.getSelectedUser);
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit && selectedUser) {
        onSubmit?.(values);
      } else {
        onSubmit?.(values);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (prevLoading && !loading && !error) {
      onCancel();
    }
    setPrevLoading(loading);
  }, [loading, form]);

  useEffect(() => {
    if (selectedUser) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [selectedUser]);

  // Set form values when selectedUser changes
  useEffect(() => {
    if (isEdit && selectedUser) {
      form.setFieldsValue({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        employeeId: selectedUser.employeeId,
        jobTitle: selectedUser.jobTitle,
        department: selectedUser.department,
        location: selectedUser.location,
        client: selectedUser.client,
        startDate: selectedUser.startDate
          ? moment(selectedUser.startDate)
          : undefined,
        role: selectedUser.role,
      });
    }
  }, [isEdit, selectedUser, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ height: "100%" }}
      requiredMark={false}
    >
      {error && <FullAlertError error={error} />}
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
          <Input
            placeholder="Enter email ID"
            disabled={isEdit && selectedUser}
          />
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
            <Option value="hr">Hr</Option>
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
          <Button type="primary" onClick={handleSubmit} loading={loading}>
            {isEdit ? "Update" : "Add"}
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default AddUserForm;
