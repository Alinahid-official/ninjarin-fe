import React from "react";
import { Select, Button } from "antd";

const TableFooter = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: "8px 16px",
      }}
    >
      <div>
        Showing <span style={{ fontWeight: 500 }}>10</span> of{" "}
        <span style={{ fontWeight: 500 }}>240</span> Projects
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Select
          defaultValue="10"
          style={{ width: 70 }}
          options={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "50", label: "50" },
          ]}
        />
        <div style={{ margin: "0 8px" }}>10 / 24</div>
        <Button
          type="primary"
          icon={<span>&#8249;</span>}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "32px",
            padding: "0 8px",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <Button
          type="primary"
          icon={<span>&#8250;</span>}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "32px",
            padding: "0 8px",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default TableFooter;
