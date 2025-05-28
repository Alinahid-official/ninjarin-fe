import FullAlertError from "@/components/error/FullAlertError";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import CustomerActions from "@/redux/customer/actions";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { Form, Input, Select, Button, Upload, Flex, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  PlusOutlined,
  LoadingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import CustomerSelectors from "@/redux/customer/selectors";
import SearchableSelect from "@/components/common/SearchableSelect";
import { API_BASE } from "@/config/config";
import AdminSearchableSelect from "@/components/common/AdminSearchableSelect";

const selectError = makeSelectErrorModel();

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const CustomerForm = ({ onSubmit, onCancel, form }) => {
  const [prevLoading, setPrevLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const customer = useSelector(CustomerSelectors.getSelectedCustomer);
  const logo = Form.useWatch("logo", form);

  const handleRemoveImage = () => {
    form.setFieldValue("logo", "");
  };
  const handleChange = async (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    setUploadLoading(true);
    try {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        message.error("Please upload an image file");
        return;
      }

      // Create an image object to get dimensions
      const img = new Image();
      const originalBase64 = await getBase64(file);

      img.src = originalBase64;
      await new Promise((resolve) => (img.onload = resolve));

      // If file size is less than 1MB, use original
      if (file.size <= 1024 * 1024) {
        form.setFieldValue("logo", originalBase64);
        return;
      }

      // Downsize image if larger than 1MB
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      const maxDimension = 1024; // Reasonable max dimension
      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress image
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const downsizedBase64 = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality as needed
      form.setFieldValue("logo", downsizedBase64);
    } catch (error) {
      message.error("Failed to process image");
      console.error("Error processing image:", error);
    } finally {
      setUploadLoading(false);
    }
  };

  const loading = useSelector((state) =>
    requestingSelector(state, [
      isEdit ? CustomerActions.UPDATE_CUSTOMER : CustomerActions.ADD_CUSTOMER,
    ])
  );
  const error = useSelector((state) =>
    selectError(state, [
      isEdit
        ? CustomerActions.UPDATE_CUSTOMER_FINISHED
        : CustomerActions.ADD_CUSTOMER_FINISHED,
    ])
  );

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (prevLoading && !loading && !error) {
      onCancel();
      form.resetFields();
      setIsEdit(false);
    }
    setPrevLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (customer) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [customer]);

  // Set form values when initialData changes
  useEffect(() => {
    if (isEdit && customer) {
      form.setFieldsValue({
        name: customer.name,
        industry: customer.industry,
        serviceType: customer.serviceType,
        cxAdminName: `${customer.cxAdmin.firstName} ${customer.cxAdmin.lastName}`,
        cxAdminEmail: customer.cxAdmin.email,
        logo: customer.logo || "",
      });
    }
  }, [isEdit, customer, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ height: "100%" }}
      requiredMark={false}
    >
      <Form.Item label="Customer Name" name="logo" style={{ display: "none" }}>
        <Input size="large" placeholder="Enter customer legal name" />
      </Form.Item>
      {error && <FullAlertError error={error} />}
      <div style={{ height: "calc(100% - 80px)", overflowY: "auto" }}>
        <div style={{ marginBottom: 24 }}>
          <Upload
            name="logo"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("You can only upload image files!");
                return false;
              }
              return true;
            }}
            onChange={handleChange}
          >
            {logo ? (
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <img
                  src={logo}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "#fff",
                    borderRadius: "50%",
                    padding: 4,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                />
              </div>
            ) : (
              <div>
                {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
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
          label="Service Type"
          name="serviceType"
          rules={[{ required: true, message: "Please select service type" }]}
        >
          {/* <Select
            size="large"
            placeholder="Select Type"
            options={serviceTypes}
            mode="multiple"
            maxTagCount="responsive"
          /> */}
          <AdminSearchableSelect
            onChange={(value) => form.setFieldValue("serviceType", value)}
            value={form.getFieldValue("serviceType")}
            type={"service"}
            url={`${API_BASE}/admin-inventories`}
          />
        </Form.Item>

        <Form.Item
          label="Industry"
          name="industry"
          rules={[{ required: true, message: "Please select industry" }]}
        >
          {/* <Select
            size="large"
            placeholder="Select Industry"
            options={industries}
          /> */}
          <AdminSearchableSelect
            onChange={(value) => form.setFieldValue("industry", value)}
            value={form.getFieldValue("industry")}
            type={"industry"}
            url={`${API_BASE}/admin-inventories`}
          />
        </Form.Item>

        <Form.Item
          label="Admin Name"
          name="cxAdminName"
          rules={[{ required: true, message: "Please enter admin name" }]}
        >
          <Input
            size="large"
            placeholder="Enter admin name"
            disabled={isEdit}
          />
        </Form.Item>

        <Form.Item
          label="Admin Email"
          name="cxAdminEmail"
          rules={[
            { required: true, message: "Please enter admin email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter official ID"
            disabled={isEdit}
          />
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
            {isEdit ? "Update Customer" : "Add Customer"}
          </Button>
        </Flex>
      </div>
    </Form>
  );
};

export default CustomerForm;
