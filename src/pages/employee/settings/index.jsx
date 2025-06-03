import React from "react";
import {
  Layout,
  Card,
  Avatar,
  Typography,
  Button,
  Input,
  DatePicker,
  Form,
  Row,
  Col,
  Space,
} from "antd";
import { UserOutlined } from "@ant-design/icons"; // Placeholder for avatar
import EmployeeSidebar from "../layout/Sidebar"; // Assuming this is the main header for the employee section
import MainHeader from "@/components/common/Header"; // Renamed to avoid conflict, assuming this is for breadcrumbs// We will create this CSS file

const { Title, Text } = Typography;

// Inline Style Definitions
const settingsContainerStyle = {
  width: "100%",
  margin: "0 auto",
  padding: "24px", // Moved from .employee-settings-layout .ant-layout-content
};

const settingsCardStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow:
    "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
  marginBottom: "24px",
  border: "none",
};

const updateButtonStyle = {
  backgroundColor: "#4F46E5",
  borderColor: "#4F46E5",
  borderRadius: "8px",
  fontWeight: 500,
};

const formItemLabelStyle = {
  color: "#374151",
  fontWeight: 500,
  fontSize: "14px",
};

const inputStyle = {
  borderRadius: "8px",
  border: "1px solid #D1D5DB",
  padding: "8px 12px",
  fontSize: "14px",
  width: "100%", // Ensure inputs take full width of their column
};

const passwordCardHeaderStyle = {
  backgroundColor: "#F9FAFB",
  padding: "16px 24px",
  margin: "-24px -24px 24px -24px", // Adjusts to card edges
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};

const EmployeeSettings = () => {
  const [formDetails] = Form.useForm();
  const [formPassword] = Form.useForm();

  const onFinishDetails = (values) => {
    console.log("Received values of form: ", values);
    // Handle form submission logic here
  };

  const onFinishPassword = (values) => {
    console.log("Received values of password form: ", values);
    // Handle password update logic here
  };

  // Placeholder data - replace with actual data
  const userData = {
    name: "Jane Smith",
    id: "0225",
    avatarUrl: "URL_TO_AVATAR_IMAGE", // Replace with actual image URL
    jobTitle: "Software Engineer",
    department: "IT",
    email: "example@domain.com",
    phone: "+91 xxxx xxx xxx",
    location: "Noida, UP",
    startDate: "25 May 2025", // This will be handled by DatePicker, consider moment object for initialValue
  };

  const renderFormItemLabel = (text) => (
    <Text style={formItemLabelStyle}>{text}</Text>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <EmployeeSidebar />
      <Layout
        style={{ background: "#FFFFFF" }}
        className="employee-settings-layout"
      >
        <MainHeader breadcrumbPath="Settings" />

        <div style={settingsContainerStyle}>
          {/* User Details Card */}
          <Card style={settingsCardStyle} className="nz-no-shadow">
            <Row
              justify="space-between"
              align="top"
              style={passwordCardHeaderStyle}
            >
              <Col>
                <Space align="center" size="middle">
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    src={userData.avatarUrl}
                  />
                  <div>
                    <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                      {userData.name}
                    </Title>
                    <Text style={{ color: "#667085", fontSize: "14px" }}>
                      {userData.id}
                    </Text>
                  </div>
                </Space>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => formDetails.submit()}
                  style={updateButtonStyle}
                >
                  Update Details
                </Button>
              </Col>
            </Row>

            <Form
              form={formDetails}
              layout="vertical"
              onFinish={onFinishDetails}
              initialValues={userData}
            >
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={renderFormItemLabel("Job Title")}
                    name="jobTitle"
                  >
                    <Input style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={renderFormItemLabel("Department")}
                    name="department"
                  >
                    <Input style={inputStyle} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item label={renderFormItemLabel("Email")} name="email">
                    <Input type="email" style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label={renderFormItemLabel("Phone")} name="phone">
                    <Input style={inputStyle} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={renderFormItemLabel("Location")}
                    name="location"
                  >
                    <Input style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={renderFormItemLabel("Start Date")}
                    name="startDate"
                  >
                    {/* For DatePicker, initialValues should be a moment object if not using string parsing */}
                    {/* <DatePicker style={{ width: '100%' }} format="DD MMMM YYYY" /> */}
                    <Input style={inputStyle} />{" "}
                    {/* Using Input as per image, DatePicker can be subbed in */}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>

          {/* Password Card */}
          <Card style={settingsCardStyle} className="nz-no-shadow">
            <Row
              justify="space-between"
              align="middle"
              style={passwordCardHeaderStyle}
            >
              <Col>
                <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
                  Password
                </Title>
                <Text style={{ color: "#667085" }}>Change your password</Text>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => formPassword.submit()}
                  style={updateButtonStyle}
                >
                  Update Password
                </Button>
              </Col>
            </Row>
            <Form
              form={formPassword}
              layout="vertical"
              onFinish={onFinishPassword}
            >
              <Row gutter={24} style={{ marginTop: "24px" }}>
                {" "}
                {/* Added marginTop to separate from styled header*/}
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={renderFormItemLabel("New Password")}
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                    ]}
                  >
                    <Input.Password style={inputStyle} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label={renderFormItemLabel("Repeat Password")}
                    name="repeatPassword"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password style={inputStyle} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </div>
      </Layout>
    </Layout>
  );
};

export default EmployeeSettings;
