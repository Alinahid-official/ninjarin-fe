import React from "react";
import { Row, Col, Typography, Form, Input, Button } from "antd";
import styles from "../login/Login.module.css"; // Reuse login styles for layout
import Illustration from "../../../assets/images/login/Data Base 3.png"; // Change to your forgot password illustration if needed
import Logo from "../../../assets/images/logo/Logo.png";
const { Title, Text, Link } = Typography;

const ForgotPassword = () => {
  const onFinish = (values) => {
    // Handle forgot password logic here
    console.log("Forgot password values:", values);
  };

  return (
    <>
      <Row style={{ padding: "20px 30px" }}>
        <img src={Logo} alt="Growth Illustration" />
      </Row>
      <Row className={styles.loginContainer}>
        <Col xs={24} sm={24} md={12} className={styles.leftSection}>
          <div style={{ textAlign: "left", marginTop: "2rem" }}>
            <div className={styles.illustration}>
              <img src={Illustration} alt="Forgot Password Illustration" />
            </div>
            <Title
              level={2}
              style={{
                color: "#757575",
                marginBottom: 0,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              All-In-One{" "}
              <span style={{ color: "#757575" }}>#EverythingSkills</span>
              <br />
              Ecosystem.
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
                  style={{
                    color: "#757575",
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  Forgot password
                </Title>
                <Text
                  style={{
                    color: "#757575",
                    display: "block",
                    marginBottom: "2rem",
                    fontSize: "18px",
                  }}
                >
                  Enter your email address and we will send <br /> you a link to
                  get back into your account.
                </Text>
              </div>

              <Form
                name="forgot_password"
                className={styles.loginForm}
                onFinish={onFinish}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email address!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block size="large">
                    Send Login Link
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <Link href="/login" style={{ fontWeight: 500 }}>
                  Back to Login
                </Link>
              </div>
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
                style={{ fontWeight: 600, textDecoration: "underline" }}
                href="/terms"
              >
                Terms
              </Link>
              <span className={styles.dot}>, </span>
              <Link
                style={{ fontWeight: 600, textDecoration: "underline" }}
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </Text>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
