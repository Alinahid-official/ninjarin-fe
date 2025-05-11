import { Button, Layout, Menu, Typography } from "antd";
import Logo from "../../assets/images/logo/Logo.png";
import "./layout.css";
import {
  HomeOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { TbUserHexagon } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";
import { PiBookOpenTextBold } from "react-icons/pi";
import { LuCrown } from "react-icons/lu";
import { router } from "@/utilities/routes";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;
const { Title, Text, Link } = Typography;

const CMSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Extract customer ID from URL if it exists
  const customerId = currentPath
    .split("/")
    .find(
      (segment, index, arr) =>
        arr[index - 1] === "customers" && segment !== "customers"
    );

  // Get the selected key based on current path
  const getSelectedKey = (path) => {
    // Extract the last meaningful segment of the path
    const pathSegments = path.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Map path segments to menu keys
    switch (lastSegment) {
      case "home":
        return "home";
      case "cx-skills-architecture":
        return "skill-architecture";
      case "inventory":
        return "inventory";
      case "users":
        return "users";
      case "projects":
        return "projects";
      case "reports":
        return "reports";
      case "manage-access":
        return "manage-access";
      case "settings":
        return "settings";
      default:
        return "home";
    }
  };

  return (
    <Sider
      width={240}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      style={{
        background: "#fff",
        minHeight: "100vh",
        borderRight: "1px solid #FEF0F2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="dashboard-sidebar"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <div
            style={{
              padding: "24px 0 0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src={Logo}
              alt="Ninzarin Logo"
              style={{
                height: collapsed ? "30px" : "auto",
                width: "auto",
              }}
            />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>
          <Menu
            mode="inline"
            className="nz-menu-item"
            selectedKeys={[getSelectedKey(currentPath)]}
            style={{ borderRight: 0, marginTop: 32, flex: 1 }}
            items={[
              {
                key: "home",
                icon: <HomeOutlined />,
                label: <span style={{ fontWeight: 600 }}>Home</span>,
                onClick: () => {
                  router.navigate(
                    customerId ? `/customers/${customerId}/home` : "/"
                  );
                },
              },
              {
                key: "skill-architecture",
                icon: <GoProjectSymlink />,
                label: "CX Skill Architecture",
                onClick: () => {
                  router.navigate(
                    customerId
                      ? `/customers/${customerId}/cx-skills-architecture`
                      : "/skill-architecture"
                  );
                },
              },
              {
                key: "inventory",
                icon: <PiBookOpenTextBold />,
                label: "Inventory",
                onClick: () => {
                  router.navigate(
                    customerId
                      ? `/customers/${customerId}/inventory`
                      : "/inventory"
                  );
                },
              },
              {
                key: "users",
                icon: <TbUserHexagon />,
                label: "Users",
                onClick: () => {
                  router.navigate(
                    customerId ? `/customers/${customerId}/users` : "/users"
                  );
                },
              },
              {
                key: "projects",
                icon: <GoProjectSymlink />,
                label: "Projects",
                onClick: () => {
                  router.navigate(
                    customerId
                      ? `/customers/${customerId}/projects`
                      : "/projects"
                  );
                },
              },
              {
                key: "reports",
                icon: <PiBookOpenTextBold />,
                label: "Reports",
                onClick: () => {
                  router.navigate(
                    customerId ? `/customers/${customerId}/reports` : "/reports"
                  );
                },
              },
              {
                key: "manage-access",
                icon: <LuCrown />,
                label: "Mange Access",
                onClick: () => {
                  router.navigate(
                    customerId
                      ? `/customers/${customerId}/manage-access`
                      : "/manage-access"
                  );
                },
              },
              {
                key: "settings",
                icon: <SettingOutlined />,
                label: "Settings",
                onClick: () => {
                  router.navigate(
                    customerId
                      ? `/customers/${customerId}/settings`
                      : "/settings"
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </Sider>
  );
};

export default CMSidebar;
