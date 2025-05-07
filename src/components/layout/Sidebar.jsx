import { Button, Layout, Menu, Typography } from "antd";
import Logo from "../../assets/images/logo/Logo.png";
import "./layout.css";
import {
  AppstoreOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { TbUserHexagon } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";
import { PiBookOpenTextBold } from "react-icons/pi";
import { LuCrown } from "react-icons/lu";
import { router } from "@/utilities/routes";
import { useLocation } from "react-router-dom";

const { Sider } = Layout;
const { Title, Text, Link } = Typography;
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Get the selected key based on current path
  const getSelectedKey = (path) => {
    switch (path) {
      case "/":
        return "dashboard";
      case "/customers":
        return "customers";
      case "/projects":
        return "projects";
      case "/reports":
        return "reports";
      case "/manage-access":
        return "manage-access";
      case "/settings":
        return "settings";
      default:
        return "dashboard";
    }
  };

  return (
    <Sider
      width={240}
      style={{
        background: "#fff",
        minHeight: "100vh",
        borderRight: "1px solid #FEF0F2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // padding: "0 15px",
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
            }}
          >
            <img src={Logo} alt="Ninzarin Logo" />
          </div>
          <Menu
            mode="inline"
            className="nz-menu-item"
            selectedKeys={[getSelectedKey(currentPath)]}
            style={{ borderRight: 0, marginTop: 32, flex: 1 }}
            items={[
              {
                key: "dashboard",
                icon: <AppstoreOutlined />,
                label: <span style={{ fontWeight: 600 }}>Dashboard</span>,
                onClick: () => {
                  router.navigate("/");
                },
              },
              {
                key: "customers",
                icon: <TbUserHexagon />,
                label: "Customers",
                onClick: () => {
                  router.navigate("/customers");
                },
              },
              {
                key: "projects",
                icon: <GoProjectSymlink />,
                label: "Projects",
                onClick: () => {
                  router.navigate("/projects");
                },
              },
              {
                key: "reports",
                icon: <PiBookOpenTextBold />,
                label: "Reports",
                onClick: () => {
                  router.navigate("/reports");
                },
              },
              {
                key: "manage-access",
                icon: <LuCrown />,
                label: "Mange Access",
                onClick: () => {
                  router.navigate("/manage-access");
                },
              },
              {
                key: "settings",
                icon: <SettingOutlined />,
                label: "Settings",
                onClick: () => {
                  router.navigate("/settings");
                },
              },
            ]}
          />
        </div>
        <div>
          <div style={{ padding: 12 }}>
            <div
              style={{
                width: "100%",
                background: "#f5f5f5",
                color: "#757575",
                fontWeight: 600,
                fontSize: 18,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px 12px",
                borderRadius: 8,
              }}
            >
              <QuestionCircleOutlined
                style={{ marginBottom: "20px", fontSize: "24px" }}
              />
              <Title
                level={4}
                style={{ color: "#757575", fontWeight: 600, marginBottom: 12 }}
              >
                Need Help
              </Title>

              <Text
                style={{
                  color: "#757575",
                  fontWeight: 400,
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                Our support team is ready to assist you.
              </Text>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#757575",
                  boxShadow: "none",
                }}
              >
                Go To Help Center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
