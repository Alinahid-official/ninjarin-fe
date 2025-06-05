import { Button, Layout, Menu, Typography, Avatar } from "antd";
import {
  AppstoreOutlined, // For Dashboard
  SettingOutlined,
  LogoutOutlined, // For Logout
  // MenuFoldOutlined, // Not immediately needed, can add later if collapse functionality is desired
  // MenuUnfoldOutlined, // Not immediately needed
} from "@ant-design/icons";
import { VscOrganization } from "react-icons/vsc"; // For Skills Map/Profile (alternative)
import { HiOutlineShare } from "react-icons/hi"; // For Skills Map/Profile
import { IoSettingsOutline } from "react-icons/io5"; // For Settings (alternative)
import { CgProfile } from "react-icons/cg"; // For Skills Profile

import NinjarinLogo from "@/assets/images/logo/Logo-s.png"; // Assuming this is the correct path

import { router } from "@/utilities/routes"; // Assuming router utility exists
import { useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;
const { Title } = Typography;

const EmployeeSidebar = () => {
  const [collapsed, setCollapsed] = useState(false); // Basic collapse state
  const location = useLocation();
  const currentPath = location.pathname;

  // Simplified getSelectedKey for employee sidebar
  const getSelectedKey = (path) => {
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    // TODO: Adjust these keys and paths as per actual employee routes
    switch (lastSegment) {
      case "dashboard":
        return "dashboard";
      case "skills-map":
        return "skills-map";
      case "skills-profile":
        return "skills-profile";
      case "settings":
        return "settings";
      default:
        // Determine a sensible default, perhaps 'dashboard'
        if (path.includes("/employee/dashboard")) return "dashboard";
        return "dashboard"; // Default to dashboard
    }
  };

  const menuItems = [
    // {
    //   key: "dashboard",
    //   icon: <AppstoreOutlined />,
    //   label: "Dashboard",
    //   onClick: () => {
    //     router.navigate("/employee/dashboard"); // Placeholder path
    //   },
    // },
    {
      key: "skills-map",
      icon: <HiOutlineShare />, // Using Share icon for Skills Map
      label: "Skills Map",
      onClick: () => {
        router.navigate("/employee/skills-map"); // Placeholder path
      },
    },
    {
      key: "skills-profile",
      icon: <CgProfile />, // Using User icon for Skills Profile, or HiOutlineShare again if preferred
      label: "Skills Profile",
      onClick: () => {
        router.navigate("/employee/skills-profile"); // Placeholder path
      },
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => {
        router.navigate("/employee/settings"); // Placeholder path
      },
    },
  ];

  const handleLogout = () => {
    // Placeholder for logout logic
    console.log("Logout clicked");
    router.navigate("/login"); // Navigate to login page
  };

  return (
    <Sider
      width={260} // Adjusted width slightly based on image
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null} // Hiding the default trigger, will add a custom one if needed or rely on external control
      style={{
        background: "#FFFFFF", // White background as per image
        minHeight: "100vh",
        borderRight: "1px solid #F0F0F0", // Light border
        display: "flex",
        flexDirection: "column",
      }}
      className={`dashboard-sidebar ${
        collapsed ? "employee-sidebar-collapsed" : ""
      }`} // Custom class for styling
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          paddingBottom: "20px", // Space for logout button
        }}
      >
        <div>
          <div
            style={{
              padding: "24px 20px", // Adjusted padding
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between", // Removed for now as no collapse button inside
            }}
            className="sidebar-header"
          >
            <img
              src={NinjarinLogo}
              alt="Ninzarim"
              style={{
                width: 36, // Adjust size as needed
                height: 36,
                marginRight: 12,
              }}
            />
            {!collapsed && (
              <Title level={4} style={{ margin: 0, color: "#1F1F1F" }}>
                {" "}
                {/* Darker text color */}
                Ninzarin
              </Title>
            )}
          </div>
          <Menu
            mode="inline"
            className="nz-menu-item" // Custom class for menu items
            selectedKeys={[getSelectedKey(currentPath)]}
            style={{ borderRight: 0, marginTop: "20px" }} // Adjusted margin
            items={menuItems}
          />
        </div>

        {/* Logout Button Area */}
        <div style={{ padding: "0 20px" }}>
          <Menu mode="inline" className="nz-employee-menu-logout">
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="logout-menu-item"
            >
              Logout
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

export default EmployeeSidebar;
