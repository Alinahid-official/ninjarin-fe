import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  ProjectOutlined,
  BookOutlined,
  CrownOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import Logo from '../../assets/images/logo/Logo.png';
import { BellOutlined } from '@ant-design/icons';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select } from 'antd';
const { Sider } = Layout;

const Sidebar = () => (
  <Sider
    width={240}
    style={{
      background: '#fff',
      minHeight: '100vh',
      borderRight: '1px solid #f0f0f0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 0,
    }}
  >
    <div style={{ padding: '24px 0 0 24px', display: 'flex', alignItems: 'center' }}>
      <img
        src={Logo}
        alt="Ninzarin Logo"
        
      />
      </div>
    <Menu
      mode="inline"
      defaultSelectedKeys={['dashboard']}
      style={{ borderRight: 0, marginTop: 32, flex: 1 }}
      items={[
        {
          key: 'dashboard',
          icon: <AppstoreOutlined />,
          label: <span style={{ fontWeight: 600 }}>Dashboard</span>,
        },
        {
          key: 'customers',
          icon: <UserOutlined />,
          label: 'Customers',
        },
        {
          key: 'projects',
          icon: <ProjectOutlined />,
          label: 'Projects',
        },
        {
          key: 'reports',
          icon: <BookOutlined />,
          label: 'Reports',
        },
        {
          key: 'manage-access',
          icon: <CrownOutlined />,
          label: 'Mange Access',
        },
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: 'Settings',
        },
      ]}
    />
    <div style={{ padding: 24 }}>
      <Button
        icon={<QuestionCircleOutlined />}
        style={{
          width: '100%',
          background: '#f5f5f5',
          color: '#757575',
          fontWeight: 600,
          height: 64,
          fontSize: 18,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disabled
      >
        <div>Need Help</div>
      </Button>
    </div>
  </Sider>
);

const DashboardHeader = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 32px 0 32px',
      background: '#fff',
    }}
  >
    <span style={{ fontSize: 22, color: '#757575', fontWeight: 500 }}>Dashboard</span>
    <div style={{ display: 'flex', gap: 16 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
        }}
      >
        <BellOutlined style={{ fontSize: 22, color: '#757575' }} />
      </div>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <UserOutlined style={{ fontSize: 22, color: '#fff' }} />
      </div>
    </div>
  </div>
);

const CustomerStatsCard = () => (
  <div
    style={{
      border: '2px solid #e5e5e5',
      borderRadius: 24,
      padding: 24,
      background: '#fff',
      width: 370,
      boxSizing: 'border-box',
      boxShadow: '0 0 0 0 transparent',
      margin: '0 auto'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <UserOutlined style={{ fontSize: 24, color: '#bdbdbd' }} />
        <span style={{ fontWeight: 600, color: '#9e9e9e', fontSize: 22 }}>Total Customers</span>
        <InfoCircleOutlined style={{ color: '#bdbdbd', marginLeft: 4 }} />
      </div>
      <span style={{ color: '#bdbdbd', fontSize: 28, fontWeight: 400 }}>{'>'}</span>
    </div>
    <div style={{ marginTop: 16, marginBottom: 8 }}>
      <span style={{ fontSize: 48, fontWeight: 700, color: '#444' }}>53</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <span style={{ color: '#2979ff', fontWeight: 600, fontSize: 18, marginRight: 4 }}>
        <span style={{ fontSize: 18, verticalAlign: 'middle' }}>↑</span> 12%
      </span>
      <span style={{ color: '#9e9e9e', fontWeight: 500, marginLeft: 8 }}>vs last 7 days</span>
    </div>
    <div style={{ marginTop: 16 }}>
      {/* Simple SVG line chart */}
      <svg width="100%" height="60" viewBox="0 0 320 60" fill="none">
        <defs>
          <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2979ff" stopOpacity="0.2"/>
            <stop offset="1" stopColor="#2979ff" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q40,20 80,30 T160,35 T240,25 T320,40"
          stroke="#2979ff"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M0,40 Q40,20 80,30 T160,35 T240,25 T320,40 V60 H0 Z"
          fill="url(#blue-gradient)"
          stroke="none"
        />
      </svg>
    </div>
  </div>
);

const OverviewHeader = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '32px 32px 0 32px',
      background: '#fff',
    }}
  >
    <span style={{ fontWeight: 600, color: '#757575', fontSize: 16 }}>Overview</span>
    <Select
      defaultValue="last7"
      style={{
        width: 150,
        background: '#fafafa',
        borderRadius: 8,
        fontWeight: 600,
      }}
      dropdownStyle={{ borderRadius: 8 }}
      bordered={false}
      options={[
        { value: 'last7', label: <span style={{ fontWeight: 600, color: '#757575' }}>Last 7 Days</span> },
        { value: 'last30', label: <span style={{ fontWeight: 600, color: '#757575' }}>Last 30 Days</span> },
        { value: 'thisMonth', label: <span style={{ fontWeight: 600, color: '#757575' }}>This Month</span> },
      ]}
    />
  </div>
);

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <DashboardHeader />
        <OverviewHeader />
        <div style={{ padding: 32, backgroundColor:'#fff'}}>
          <CustomerStatsCard />
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;