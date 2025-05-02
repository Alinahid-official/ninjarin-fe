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
const { Sider } = Layout;
const { Title, Text, Link } = Typography;
const Sidebar = () => (
  <Sider
    width={240}
    style={{
      background: "#fff",
      minHeight: "100vh",
      borderRight: "1px solid #f0f0f0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "0 15px",
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
          defaultSelectedKeys={["dashboard"]}
          style={{ borderRight: 0, marginTop: 32, flex: 1 }}
          items={[
            {
              key: "dashboard",
              icon: <AppstoreOutlined />,
              label: <span style={{ fontWeight: 600 }}>Dashboard</span>,
            },
            {
              key: "customers",
              icon: <TbUserHexagon />,
              label: "Customers",
            },
            {
              key: "projects",
              icon: <GoProjectSymlink />,
              label: "Projects",
            },
            {
              key: "reports",
              icon: <PiBookOpenTextBold />,
              label: "Reports",
            },
            {
              key: "manage-access",
              icon: <LuCrown />,
              label: "Mange Access",
            },
            {
              key: "settings",
              icon: <SettingOutlined />,
              label: "Settings",
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

export default Sidebar;
