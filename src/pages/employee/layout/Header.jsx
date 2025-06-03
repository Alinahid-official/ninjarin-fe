import React from "react";
import { Layout, Typography, Avatar, Space, Badge } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const EmployeeHeader = ({ title }) => {
  return (
    <AntHeader
      style={{
        background: "#FFF",
        padding: "0 24px",
        borderBottom: "1px solid #F0F0F0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
      }}
    >
      <div>
        <Text style={{ fontSize: "18px", fontWeight: 600 }}>
          {title || "Dashboard"}
        </Text>
      </div>
      <Space size="large" align="center">
        <Badge count={3} size="small">
          <BellOutlined
            style={{ fontSize: "20px", color: "#595959", cursor: "pointer" }}
          />
        </Badge>
        <Space align="center" style={{ cursor: "pointer" }}>
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#8C5BF2" }}
          />
          <Text style={{ fontWeight: 500, color: "#262626" }}>
            Employee Name
          </Text>
        </Space>
      </Space>
    </AntHeader>
  );
};

export default EmployeeHeader;
