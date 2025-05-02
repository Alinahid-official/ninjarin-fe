import React from "react";
import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import { GoProject } from "react-icons/go";

const ProjectStatsCard = () => {
  const projectStages = [
    { label: "Consulting", count: 60 },
    { label: "Design", count: 30 },
    { label: "Development", count: 34 },
    { label: "Delivered", count: 100 },
    { label: "Service", count: 40 },
    { label: "Maintenance", count: 32 },
  ];

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: 24,
        padding: "16px 24px",
        background: "#fff",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0 0 0 0 transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GoProject style={{ fontSize: 24, color: "#bdbdbd" }} />
          <span style={{ fontWeight: 600, color: "#9e9e9e", fontSize: 16 }}>
            Total Projects
          </span>
          <InfoCircleOutlined style={{ color: "#bdbdbd", marginLeft: 4 }} />
        </div>
        <RightOutlined style={{ color: "#000000", fontSize: 16 }} />
      </div>
      <div style={{ marginTop: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: "#444" }}>
          420
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <span
          style={{
            color: "#2979ff",
            fontWeight: 600,
            fontSize: 18,
            marginRight: 4,
          }}
        >
          <span style={{ fontSize: 18, verticalAlign: "middle" }}>↑</span> 12%
        </span>
        <span style={{ color: "#9e9e9e", fontWeight: 500, marginLeft: 8 }}>
          vs last 7 days
        </span>
      </div>
      <Divider style={{ margin: "24px 0" }} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {projectStages.map((stage) => (
          <div key={stage.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >
              {stage.count}
            </div>
            <div style={{ color: "#9e9e9e", marginTop: 4 }}>{stage.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatsCard;
