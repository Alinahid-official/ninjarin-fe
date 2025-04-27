import React from 'react';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import styles from '../login/Login.module.css'; // Reuse login styles for layout
import Illustration from '../../../assets/images/login/Data Base 3.png'; // Change to your forgot password illustration if needed
import Logo from '../../../assets/images/logo/Logo.png';
const { Title, Text } = Typography;

const ForgotPassword = () => {
  const onFinish = (values) => {
    // Handle forgot password logic here
    console.log('Forgot password values:', values);
  };

  return (
    <>
    <Row style={{padding:'20px 30px'}}>
        <img src={Logo} alt="Growth Illustration" />
      </Row>
    <Row className={styles.loginContainer}>
      <Col xs={24} sm={24} md={12} className={styles.leftSection}>
        
        <div style={{ textAlign: 'left', marginTop: '2rem' }}>
        <div className={styles.illustration}>
          <img src={Illustration} alt="Forgot Password Illustration" />
        </div>
          <Title level={2} style={{ color: '#757575', marginBottom: 0, fontWeight: 600, lineHeight: 1.1 }}>
            All-In-One <span style={{ color: '#757575' }}>#EverythingSkills</span><br />Ecosystem.
          </Title>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} className={styles.rightSection}>
        <div className={styles.loginWrapper}>
          
          <div className={styles.formSection}>
            <Title level={3} style={{ color: '#757575', fontWeight: 600, marginBottom: 0 }}>Forgot password</Title>
            <Text style={{ color: '#757575', display: 'block', marginBottom: '2rem' }}>
              Enter your email address and we will send you a link to get back into your account.
            </Text>
            <Form
              name="forgot_password"
              className={styles.loginForm}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email address!' },
                  { type: 'email', message: 'Please enter a valid email address!' }
                ]}
              >
                <Input placeholder="Email" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" style={{ background: '#757575', borderColor: '#757575' }}>
                  Send Login Link
                </Button>
              </Form.Item>
            </Form>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <a href="/login" style={{ color: '#757575', fontWeight: 500 }}>Back to Login</a>
            </div>
          </div>
          <div className={styles.footer}>
            <Text className={styles.copyright}>© 2025 Ninzarin, All rights reserved</Text>
            <div className={styles.links}>
              <a href="/terms">Terms</a>
              <span className={styles.dot}>·</span>
              <a href="/privacy-policy">Privacy Policy</a>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    </>
    
  );
};

export default ForgotPassword;