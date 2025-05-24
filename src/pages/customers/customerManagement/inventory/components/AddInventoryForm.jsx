import React, { useEffect, useState } from "react";
import { Form, Input, Button, Flex } from "antd";
import { useSelector } from "react-redux";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";

const AddInventoryForm = ({ onSubmit, onCancel, selectedType }) => {
  const selectedItem = useSelector();
  const [isEdit, setIsEdit] = useState(false);
  const labels = useSelector(SkillArchitectureSelectors.getLabels);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (isEdit && selectedItem) {
        onSubmit?.({ itemId: selectedItem._id, ...values });
      } else {
        onSubmit?.(values);
      }
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setIsEdit(true);
      form.setFieldsValue({
        name: selectedItem.name,
        description: selectedItem.description,
      });
    } else {
      setIsEdit(false);
      form.resetFields();
    }
  }, [selectedItem, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ height: "100%" }}
      requiredMark={false}
      initialValues={
        !isEdit
          ? {
              name: "",
              description: "",
            }
          : {}
      }
    >
      <div
        style={{
          height: "calc(100% - 80px)",
          overflowY: "auto",
          padding: "0 24px",
        }}
      >
        <Form.Item
          label={labels[selectedType]?.label || selectedType}
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
            Cancel
          </Button>
          <Button
            type="primary"
            style={{ width: "50%" }}
            onClick={handleSubmit}
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default AddInventoryForm;
