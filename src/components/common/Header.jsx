import React, { useEffect } from "react";
import { Layout, Breadcrumb, Flex, Dropdown, Avatar } from "antd";
import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import SkillArchitectureSelectors from "@/redux/skillArchitecture/selectors";
import { useSelector } from "react-redux";
import SkillArchitectureActions from "@/redux/skillArchitecture/actions";
import CustomerSelectors from "@/redux/customer/selectors";
import { useDispatch } from "react-redux";
import CustomerActions from "@/redux/customer/actions";
import { useNavigate } from "react-router-dom";
import SessionActions from "@/redux/session/action";

const { Header: AntHeader } = Layout;

const Header = ({ breadcrumbPath }) => {
  const userDetails = localStorage.getItem("userDetails");
  const parsedUserDetails = userDetails ? JSON.parse(userDetails) : null;
  const navigate = useNavigate();
  const checkCustomerIdInUrl = () => {
    const pathSegments = window.location.pathname.split("/");
    const customerIdIndex = pathSegments.indexOf("customers");

    if (customerIdIndex !== -1 && pathSegments[customerIdIndex + 1]) {
      // Check if the segment after 'customers' matches MongoDB ObjectId pattern
      const customerId = pathSegments[customerIdIndex + 1];
      const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(customerId);
      return isValidObjectId ? customerId : null;
    }
    return null;
  };
  const customerId = checkCustomerIdInUrl();
  console.log("Customer ID from URL:", customerId);
  const pathSegments = breadcrumbPath.split("/").filter((segment) => segment);
  const labels = useSelector(SkillArchitectureSelectors.getLabels);
  const dispatch = useDispatch();
  const currentCustomer = useSelector(CustomerSelectors.getCurrentCustomer);
  const breadcrumbItems = pathSegments.map((segment) => {
    const formattedSegment = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title: formattedSegment,
    };
  });

  useEffect(() => {
    if (!labels && currentCustomer) {
      dispatch(SkillArchitectureActions.getLabels(currentCustomer?._id));
    }
    if (!currentCustomer) {
      dispatch(SessionActions.setCurrentCustomer());
    }
  }, [currentCustomer]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const userMenuItems = {
    items: [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        onClick: handleLogout,
      },
    ],
  };

  return (
    <>
      <AntHeader
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px 0 32px",
          background: "#fff",
          height: "auto",
        }}
      >
        <Flex vertical gap="small">
          <Breadcrumb
            items={breadcrumbItems}
            style={{
              fontSize: 22,
              color: "#757575",
              fontWeight: 500,
            }}
          />
        </Flex>

        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
            }}
          >
            <BellOutlined style={{ fontSize: 22, color: "#757575" }} />
          </div>
          <Dropdown menu={userMenuItems} placement="bottomRight">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Avatar
                icon={
                  parsedUserDetails?.role === "hr" ? null : <UserOutlined />
                }
                src={
                  parsedUserDetails?.role === "hr"
                    ? "/src/assets/images/Profil.png"
                    : null
                }
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
          </Dropdown>
        </div>
      </AntHeader>
    </>
  );
};

Header.propTypes = {
  breadcrumbPath: PropTypes.string.isRequired,
};

export default Header;
