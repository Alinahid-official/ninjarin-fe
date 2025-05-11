import React from "react";
import { Layout, Breadcrumb, Flex } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Header: AntHeader } = Layout;

const Header = ({ breadcrumbPath }) => {
  const pathSegments = breadcrumbPath.split("/").filter((segment) => segment);

  const breadcrumbItems = pathSegments.map((segment) => {
    const formattedSegment = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title: formattedSegment,
    };
  });

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
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserOutlined style={{ fontSize: 22, color: "#fff" }} />
          </div>
        </div>
      </AntHeader>
    </>
  );
};

Header.propTypes = {
  breadcrumbPath: PropTypes.string.isRequired,
};

export default Header;
