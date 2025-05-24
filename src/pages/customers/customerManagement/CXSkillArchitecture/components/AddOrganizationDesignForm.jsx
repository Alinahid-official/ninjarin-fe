import React from "react";
import { Form, Input, Select, Button, Checkbox, Tag, Flex } from "antd"; // Added Checkbox, Tag, Flex
import { useSelector } from "react-redux";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";

const { TextArea } = Input;
const { Option } = Select;

// Sample options for Sub-function/Verticals - replace with actual data source
const subFunctionOptions = [
  { label: "Sub-function no. 1", value: "sf1" },
  { label: "Sub-function no. 2", value: "sf2" },
  { label: "Sub-function no. 3", value: "sf3" },
  { label: "Sub-function no. 4", value: "sf4" },
  { label: "Sub-function no. 5", value: "sf5" },
];

const AddOrganizationDesignForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const labels = useSelector(SkillArchitectureSelectors.getLabels);
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      // form.resetFields(); // Keep fields or reset based on desired UX after submit
    });
  };
  const excludedKeys = [
    "_id",
    "customerId",
    "createdAt",
    "updatedAt",
    "__v",
    "assigned",
  ];
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ height: "100%" }}
      requiredMark={false} // Assuming labels with '*' are sufficient
    >
      <div
        style={{
          height: "calc(100% - 70px)",
          overflowY: "auto",
          paddingRight: "16px",
        }}
      >
        {Object.entries(labels)
          .filter(
            ([key, value]) =>
              !excludedKeys.includes(key) && value !== null && value["isActive"]
          )
          .map(([key, value]) => {
            return (
              <Form.Item name={key} label={value?.label || key}>
                <Select
                  placeholder={`Enter ${key}`}
                  size="large"
                  options={subFunctionOptions}
                />
              </Form.Item>
            );
          })}{" "}
        {/* Added padding for scrollbar */}
        {/* <Form.Item
          name="industry"
          label={labels["Industry"]?.label || "Industry"}
          rules={[{ required: true, message: "Please input the industry" }]}
        >
          <Input placeholder="Enter industry" size="large" />
        </Form.Item>
        <Form.Item
          name="organization"
          label="Organization"
          rules={[{ required: true, message: "Please input the organization" }]}
        >
          <Input placeholder="Enter organization" size="large" />
        </Form.Item>
        <Form.Item
          name="lineOfBusiness"
          label="Line of Business*"
          rules={[
            { required: true, message: "Please input the line of business" },
          ]}
        >
          <Input placeholder="Enter line of business" size="large" />
        </Form.Item>
        <Form.Item name="function" label="Function">
          <Select placeholder="Select Function" size="large">
            <Option value="function1">Function 1</Option>
            <Option value="function2">Function 2</Option>
            
          </Select>
        </Form.Item>
        <Form.Item name="subFunctionVerticals" label="Sub-function / Verticals">
          <Select
            mode="multiple"
            placeholder="Select Sub-function/Verticals"
            size="large"
            allowClear
            optionLabelProp="label"
            tagRender={(props) => {
              const { label, closable, onClose } = props;
              return (
                <Tag
                  closable={closable}
                  onClose={onClose}
                  style={{
                    marginRight: 3,
                    backgroundColor: "#F3E8FF",
                    color: "#6D28D9",
                    border: "1px solid #D8B4FE",
                  }}
                >
                  {label}
                </Tag>
              );
            }}
          >
            {subFunctionOptions.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                label={option.label}
              >
                <Checkbox
                  checked={form
                    .getFieldValue("subFunctionVerticals")
                    ?.includes(option.value)}
                  style={{ marginRight: 8 }}
                />
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="roles" label="Roles">
          <Select placeholder="Select Roles" size="large">
            <Option value="role1">Role 1</Option>
            <Option value="role2">Role 2</Option>
            
          </Select>
        </Form.Item>
        <Form.Item name="typeOfRole" label="Type of Role">
          <Select placeholder="Select Role Type" size="large">
            <Option value="type1">Type 1</Option>
            <Option value="type2">Type 2</Option>
          
          </Select>
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <Select placeholder="Select Skills" size="large">
            <Option value="skill1">Skill 1</Option>
            <Option value="skill2">Skill 2</Option>
          
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={4} placeholder="Enter description" />
        </Form.Item> */}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #f0f0f0",
          padding: "16px 0px", // Adjusted padding
          backgroundColor: "#fff", // Assuming white background for footer
          right: 0, // Ensure it spans full width if parent has padding
        }}
      >
        <Flex justify="flex-end" gap={12} style={{ paddingRight: "16px" }}>
          {" "}
          {/* Align buttons to right */}
          <Button
            onClick={onCancel}
            style={{
              borderColor: "#D1D5DB",
              color: "#374151", // Darker text for better contrast
              height: 40,
              minWidth: 100, // Ensure buttons have some minimum width
            }}
            size="large"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{
              background: "#7C3AED", // Purple color from image
              borderColor: "#7C3AED",
              height: 40,
              minWidth: 120,
            }}
            size="large"
          >
            Add
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default AddOrganizationDesignForm;
