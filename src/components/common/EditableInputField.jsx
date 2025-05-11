import React, { useState } from "react";
import { Form, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const EditableInputField = ({
  type = "text",
  value = "",
  onSubmit,
  rules = [],
  children,
  name,
  active: defaultActive = false,
  loading = true,
}) => {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(defaultActive);

  const handleBlur = async () => {
    try {
      const values = await form.validateFields();
      if (values[name] === value) return setIsActive(false);
      onSubmit(values);
      setIsActive(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleActivate = () => {
    setIsActive(true);
  };

  form.setFieldsValue({ [name]: value });
  return (
    <Form form={form}>
      {isActive ? (
        <Form.Item name={name} rules={rules}>
          <Input
            type={type}
            onBlur={handleBlur}
            style={{ display: "inline-block", minWidth: "100px" }}
            autoFocus
          />
        </Form.Item>
      ) : (
        <div onClick={handleActivate} style={{ cursor: "pointer" }}>
          {children || <span>{value}</span>}
          {loading && (
            <span>
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            </span>
          )}
        </div>
      )}
    </Form>
  );
};

export default EditableInputField;
