import React, { useState, useEffect } from "react";
import { Form, Switch, Button, Typography } from "antd";

const initialItems = [
  { id: "industry", label: "Industry", defaultChecked: true },
  { id: "organization", label: "Organization", defaultChecked: true },
  { id: "lineOfBusiness", label: "Line of Business", defaultChecked: true },
  {
    id: "subFunction",
    label: "Sub-function / Verticals",
    defaultChecked: true,
  },
  { id: "bands", label: "Bands", defaultChecked: true },
  { id: "roles", label: "Roles", defaultChecked: true },
  { id: "typeOfRole", label: "Type of Role", defaultChecked: true },
  { id: "skills", label: "Skills", defaultChecked: true },
  { id: "subSkills", label: "Sub-Skills", defaultChecked: true },
  { id: "description", label: "Description", defaultChecked: true },
  { id: "assigned", label: "Assigned", defaultChecked: false },
];

const FormItem = ({ id, label, checked, toggleSwitch }) => {
  const style = {
    marginBottom: 16,
    padding: "12px 16px",
    backgroundColor: "white",
    borderRadius: 8,
    border: "1px solid #f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  };

  return (
    <div style={style}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography.Text>{label}</Typography.Text>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography.Text
          style={{ marginRight: 12, color: "#555", fontSize: "13px" }}
        >
          Enable
        </Typography.Text>
        <Switch
          checked={checked}
          onChange={(isChecked) => toggleSwitch(id, isChecked)}
        />
      </div>
    </div>
  );
};

const OrganizationDesignForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [formItems] = useState(initialItems);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const initialValues = {};
    initialItems.forEach((item) => {
      initialValues[item.id] = item.defaultChecked;
    });
    setFormValues(initialValues);
    form.setFieldsValue(initialValues);
  }, [form]);

  const handleSubmit = async () => {
    try {
      const orderedValues = formItems.map((item) => ({
        id: item.id,
        label: item.label,
        enabled: formValues[item.id],
      }));
      onSubmit(orderedValues);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const toggleSwitch = (id, newCheckedState) => {
    const newFormValues = { ...formValues, [id]: newCheckedState };
    setFormValues(newFormValues);
    form.setFieldsValue({ [id]: newCheckedState });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      requiredMark={false}
    >
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        {formItems.map((item) => (
          <FormItem
            key={item.id}
            id={item.id}
            label={item.label}
            checked={
              formValues[item.id] !== undefined
                ? formValues[item.id]
                : item.defaultChecked
            }
            toggleSwitch={toggleSwitch}
          />
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid #E5E7EB",
          paddingTop: 24,
          marginTop: 24,
          display: "flex",
          gap: 12,
        }}
      >
        <Button size="large" block onClick={onCancel} style={{ height: 40 }}>
          Cancel
        </Button>
        <Button
          size="large"
          block
          type="primary"
          onClick={handleSubmit}
          style={{
            background: "#7C3AED",
            borderColor: "#7C3AED",
            height: 40,
          }}
        >
          Update
        </Button>
      </div>
    </Form>
  );
};

export default OrganizationDesignForm;
