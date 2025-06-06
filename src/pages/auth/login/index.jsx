import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, Typography } from "antd";
import styles from "./Login.module.css";
import TeamWorkImage from "../../../assets/images/login/Team_Work.png";
import Logo from "../../../assets/images/logo/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import SessionActions from "../../../redux/session/action";
import requestingSelector from "@/redux/requesting/requestingSelector";
import { makeSelectErrorModel } from "@/redux/error/errorSelector";
import AlertError from "@/components/error/AlertError";

const { Title, Text, Link } = Typography;
const selectError = makeSelectErrorModel();
const LoginPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) =>
    requestingSelector(state, [SessionActions.REQUEST_LOGIN])
  );
  const error = useSelector((state) =>
    selectError(state, [SessionActions.REQUEST_LOGIN_FINISHED])
  );
  const onFinish = (values) => {
    dispatch(SessionActions.login(values));
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
          {/* <div className={styles.illustration}>
          
          <div className={styles.tagline}>
            <Title level={2}>The Future of Talent</Title>
            <Title level={2} className={styles.hashtag}>#EverythingSkills</Title>
          </div>
        </div> */}
          <div style={{ textAlign: "left", marginTop: "2rem" }}>
            <div className={styles.illustration}>
              <img src={TeamWorkImage} alt="Growth Illustration" />
            </div>
            <Title
              level={2}
              style={{
                marginBottom: 0,
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              The Future of Talent is
              <br />
              #EverythingSkills
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
                <Title level={3} className={styles.welcomeTitle}>
                  Welcome to Ninzarin
                </Title>
                <Text className={styles.subtitle}>
                  Log in to your account & transform<br></br> your workforce.
                </Text>
              </div>
              {error && <AlertError error={error} />}
              <Form
                requiredMark={false}
                name="login"
                className={styles.loginForm}
                onFinish={onFinish}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input.Password size="large" />
                </Form.Item>

                <div className={styles.remember}>
                  <Checkbox
                    style={{
                      color: "#961FFF",
                    }}
                  >
                    Remember me
                  </Checkbox>
                </div>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  className={styles.loginButton}
                  loading={loading}
                >
                  Login
                </Button>
                <div className={styles.forgot}>
                  <Link href="/forgot-password" className={styles.forgotLink}>
                    Forgot password?
                  </Link>
                </div>
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

export default LoginPage;
