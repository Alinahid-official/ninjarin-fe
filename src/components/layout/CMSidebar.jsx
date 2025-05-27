// Add Avatar to imports
import { Button, Layout, Menu, Typography, Avatar } from "antd";
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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomerSelectors from "@/redux/customer/selectors";
import CustomerActions from "@/redux/customer/actions";
import { useDispatch } from "react-redux";

const { Sider } = Layout;
const { Title, Text, Link } = Typography;

const CMSidebar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const customers = useSelector(CustomerSelectors.getCustomers);
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
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
    // Extract the path segments
    const pathSegments = path.split("/");

    // Check if the path contains cx-skills-architecture or assign
    if (
      pathSegments.includes("cx-skills-architecture") ||
      (pathSegments.includes("assign") &&
        pathSegments.includes("cx-skills-architecture"))
    ) {
      return "skill-architecture";
    }

    // Map other path segments to menu keys
    const lastSegment = pathSegments[pathSegments.length - 1];
    switch (lastSegment) {
      case "home":
        return "home";
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

  useEffect(() => {
    if (!customers) {
      dispatch(CustomerActions.getCustomers());
    }
  }, [customerId]);
  useEffect(() => {
    if (customers && !currentCustomer) {
      const customer = customers.find(
        (customer) => customer._id === customerId
      );
      console.log("customer", customers, customer);
      dispatch(CustomerActions.setCurrentCustomer(customer));
    }
  }, [customers]);
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
              padding: "24px 0 0 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Avatar
                size={collapsed ? 30 : 40}
                style={{
                  backgroundColor: "#8C5BF2",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {currentCustomer?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  textAlign: "left",
                  marginLeft: 12,
                }}
              >
                {collapsed ? "" : currentCustomer?.name}
              </span>
            </div>

            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                paddingRight: "12px",
                // width: 64,
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
                    customerId ? `/customers/${customerId}/home` : "/home"
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
                      : "/cx-skills-architecture"
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
              // {
              //   key: "reports",
              //   icon: <PiBookOpenTextBold />,
              //   label: "Reports",
              //   onClick: () => {
              //     router.navigate(
              //       customerId ? `/customers/${customerId}/reports` : "/reports"
              //     );
              //   },
              // },
              // {
              //   key: "manage-access",
              //   icon: <LuCrown />,
              //   label: "Mange Access",
              //   onClick: () => {
              //     router.navigate(
              //       customerId
              //         ? `/customers/${customerId}/manage-access`
              //         : "/manage-access"
              //     );
              //   },
              // },
              // {
              //   key: "settings",
              //   icon: <SettingOutlined />,
              //   label: "Settings",
              //   onClick: () => {
              //     router.navigate(
              //       customerId
              //         ? `/customers/${customerId}/settings`
              //         : "/settings"
              //     );
              //   },
              // },
            ]}
          />
        </div>
      </div>
    </Sider>
  );
};

export default CMSidebar;
