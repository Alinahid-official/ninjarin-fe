import React from "react";
import { InfoCircleOutlined, RightOutlined } from "@ant-design/icons";
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
        border: "1px solid #FEF0F2",
        borderRadius: 24,
        padding: "16px 24px",
        background: "#fff",
        width: "100%",
        boxSizing: "border-box",
        boxShadow: "0 0 0 0 transparent",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <GoProject style={{ fontSize: 24 }} />
            <span style={{ fontWeight: 600, fontSize: 16 }}>
              Total Projects
            </span>
            <InfoCircleOutlined style={{ color: "#961FFF", marginLeft: 4 }} />
          </div>
        </div>
        <div style={{ marginTop: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#444" }}>
            420
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {projectStages.map((stage) => (
          <div
            key={stage.label}
            style={{
              border: "1px solid #FEF0F2",
              padding: "10px",
              borderRadius: 8,
              width: "100px",
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 400,
              }}
            >
              {stage.count}
            </div>
            <div className="nz-text-p" style={{ marginTop: 4 }}>
              {stage.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStatsCard;
