import FullAlertError from "@/components/error/FullAlertError";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import CustomerActions from "@/redux/customer/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { Form, Input, Select, Button, Upload, Flex } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

const selectError = makeSelectErrorModel();

const CustomerForm = ({ onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const loading = useSelector((state) =>
    requestingSelector(state, [CustomerActions.ADD_CUSTOMER])
  );
  const error = useSelector((state) =>
    selectError(state, [CustomerActions.ADD_CUSTOMER_FINISHED])
  );

  const industries = [
    { value: "Technology", label: "Technology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Finance", label: "Finance" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Retail", label: "Retail" },
    { value: "Education", label: "Education" },
  ];

  const users = [
    { value: "Om prakash sao", label: "Om prakash sao" },
    { value: "Neilsan mando", label: "Neilsan mando" },
    { value: "Tivonty priya", label: "Tivonty priya" },
    { value: "Martie hannery", label: "Martie hannery" },
    { value: "Sukamar rao", label: "Sukamar rao" },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (loading !== false && !error) {
      onCancel();
    }
  }, [loading]);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ height: "100%" }}
      requiredMark={false}
      initialValues={{
        name: "Wipro",
        industry: "Technology",
        cxAdmin: "Om prakash sao",
        adminEmail: "admin@gmail.com",
      }}
    >
      {error && <FullAlertError error={error} />}
      <div style={{ height: "calc(100% - 80px)", overflowY: "auto" }}>
        <div style={{ marginBottom: 24 }}>
          <Upload
            name="logo"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          <div style={{ textAlign: "center", color: "#757575" }}>
            Customer logo
          </div>
        </div>

        <Form.Item
          label="Customer Name"
          name="name"
          rules={[{ required: true, message: "Please enter customer name" }]}
        >
          <Input size="large" placeholder="Enter customer legal name" />
        </Form.Item>

        <Form.Item
          label="Industry"
          name="industry"
          rules={[{ required: true, message: "Please select industry" }]}
        >
          <Select
            size="large"
            placeholder="Select Industry"
            options={industries}
          />
        </Form.Item>

        <Form.Item
          label="Admin Name"
          name="cxAdmin"
          rules={[{ required: true, message: "Please select admin name" }]}
        >
          <Select
            size="large"
            placeholder="Enter admin name"
            options={users}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="Admin Email"
          name="adminEmail"
          rules={[
            { required: true, message: "Please enter admin email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input size="large" placeholder="Enter official ID" />
        </Form.Item>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: "1px solid #f0f0f0",
          padding: "24px 0",
          right: 0,
          backgroundColor: "#F7F7F7",
        }}
      >
        <Flex
          style={{
            padding: "0px 48px 0px 48px",
          }}
          gap={20}
        >
          <Button size="large" block onClick={onCancel}>
            Cancel
          </Button>
          <Button
            loading={loading}
            size="large"
            block
            type="primary"
            onClick={handleSubmit}
          >
            Add Customer
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default CustomerForm;
