import React from "react";
import { Row, Col, Typography, Form, Input, Button } from "antd";
import styles from "../login/Login.module.css"; // Reuse login styles for layout
import Illustration from "../../../assets/images/login/Data Base 2.png"; // Change to your illustration if needed
import Logo from "../../../assets/images/logo/Logo.png";
import { useDispatch } from "react-redux";
import SessionActions from "@/redux/session/action";
const { Title, Text, Link } = Typography;

const ResetPassword = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const token = location.pathname.split("/reset-password/")[1];
    values.token = token;
    dispatch(SessionActions.resetPassword(values));
  };

  return (
    <div
      style={{
        background: "linear-gradient(0deg, #EEE6FF 0%, #FFFFFF 100%)",
        minHeight: "100vh",
      }}
    >
      <Row style={{ padding: "20px 30px" }}>
        <img src={Logo} alt="Growth Illustration" />
      </Row>
      <Row
        className={styles.loginContainer}
        style={{
          height: "75vh",
        }}
      >
        <Col xs={24} sm={24} md={12} className={styles.leftSection}>
          <div style={{ textAlign: "left", marginTop: "2rem" }}>
            <div
              className={styles.illustration}
              style={{
                marginTop: 100,
              }}
            >
              <img src={Illustration} alt="Create New Password Illustration" />
            </div>
            <Title
              level={2}
              style={{
                marginTop: 50,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              Hire Smarter & Upskill Faster
              <br />
              to Optimize Performance
            </Title>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} className={styles.rightSection}>
          <div className={styles.loginWrapper}>
            <div className={styles.formSection}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                }}
              >
                <Title
                  level={3}
                  style={{ color: "#757575", fontWeight: 600, marginBottom: 0 }}
                >
                  Create New Password
                </Title>
              </div>
              <Form
                name="create_new_password"
                className={styles.loginForm}
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="************" size="large" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Reconfirm Password"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="************" size="large" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block size="large">
                    Save password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ padding: "20px 0px" }}>
        <Col xs={24} sm={24} md={12}></Col>
        <Col xs={24} sm={24} md={12}>
          <div className={styles.footer}>
            <Text className={styles.copyright}>
              © 2025 Ninzarin, All rights reserved{" "}
              <Link
                style={{
                  fontWeight: 600,
                  textDecoration: "underline",
                  color: "#FD9AB0",
                }}
                href="/terms"
              >
                Terms
              </Link>
              <span className={styles.dot}>, </span>
              <Link
                style={{
                  fontWeight: 600,
                  textDecoration: "underline",
                  color: "#FD9AB0",
                }}
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
