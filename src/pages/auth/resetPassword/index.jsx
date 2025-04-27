import React from 'react';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import styles from '../login/Login.module.css'; // Reuse login styles for layout
import Illustration from '../../../assets/images/login/Data Base 3.png'; // Change to your illustration if needed
import Logo from '../../../assets/images/logo/Logo.png';
const { Title, Text } = Typography;

const ResetPassword = () => {
  const onFinish = (values) => {
    // Handle password reset logic here
    console.log('Password reset values:', values);
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
          <img src={Illustration} alt="Create New Password Illustration" />
        </div>
          <Title level={2} style={{ color: '#757575', marginBottom: 0, fontWeight: 600, lineHeight: 1.1 }}>
            Hire Smarter & Upskill Faster<br />to Optimize Performance
          </Title>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} className={styles.rightSection}>
        <div className={styles.loginWrapper}>
          
          <div className={styles.formSection}>
            <Title level={3} style={{ color: '#757575', fontWeight: 600, marginBottom: 0 }}>Create New Password</Title>
            <Form
              name="create_new_password"
              className={styles.loginForm}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  { required: true, message: 'Please input your new password!' }
                ]}
              >
                <Input.Password placeholder="************" size="large" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="Reconfirm Password"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="************" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" style={{ background: '#757575', borderColor: '#757575' }}>
                  Save password
                </Button>
              </Form.Item>
            </Form>
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

export default ResetPassword;