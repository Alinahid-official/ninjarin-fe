import React from "react";
import { Flex, Select } from "antd";
import PropTypes from "prop-types";

const OverviewHeader = ({ title, onChange }) => {
  return (
    <Flex justify="space-between" align="center" style={{ marginBottom: 24 }}>
      <span
        style={{
          fontSize: 16,
          color: "#1F2937",
          fontWeight: 500,
        }}
      >
        {title}
      </span>
      <Select
        defaultValue="last7"
        style={{
          width: 120,
        }}
        onChange={onChange}
        options={[
          {
            value: "last7",
            label: "Last 7 Days",
          },
          {
            value: "last30",
            label: "Last 30 Days",
          },
          {
            value: "thisMonth",
            label: "This Month",
          },
        ]}
      />
    </Flex>
  );
};

OverviewHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OverviewHeader;
