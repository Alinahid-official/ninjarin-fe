import React from "react";
import { Card, Flex, Typography, Tooltip } from "antd";
import {
  InfoCircleOutlined,
  RightOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ProjectStatsCard = () => {
  // Base style for circle text
  const circleTextStyle = {
    fontSize: 14, // Adjusted for better fit
    fontWeight: 500,
    color: "#fff", // Ensure font color is white
  };

  // Base style for circle number
  const circleNumberStyle = {
    fontSize: 22, // Adjusted for better fit
    fontWeight: "bold",
    marginTop: 2,
    color: "#fff", // Ensure font color is white
  };

  return (
    <Card
      style={{
        width: "35%",
        borderRadius: 16,
        border: "1px solid #FEF0F2",
        // boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // Shadow removed
      }}
      bodyStyle={{ padding: 24 }}
    >
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Flex gap={8} align="center">
          <AppstoreOutlined style={{ fontSize: 20, color: "#4B5563" }} />
          <Text style={{ fontSize: 16, fontWeight: 600, color: "#1F2937" }}>
            Total Projects
          </Text>
          <Tooltip title="Total number of projects">
            <InfoCircleOutlined
              style={{ color: "#8C5BF2", cursor: "pointer" }}
            />
          </Tooltip>
        </Flex>
        <RightOutlined
          style={{ fontSize: 18, color: "#6B7280", cursor: "pointer" }}
        />
      </Flex>

      <Title
        level={2}
        style={{
          margin: "0 0 24px 0",
          fontSize: 36,
          fontWeight: "bold",
          color: "#111827",
        }}
      >
        20
      </Title>

      <div
        style={{
          position: "relative",
          width: "270px", // Approx width of the circle cluster
          height: "230px", // Approx height of the circle cluster
          margin: "0 auto", // Center the cluster
        }}
      >
        {/* Development Circle (Purple) */}
        <div
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "#8C5BF2",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: 10,
            left: 10,
            zIndex: 2,
            textAlign: "center",
            padding: 5,
          }}
        >
          <Text style={circleTextStyle}>Development</Text>
          <Text style={circleNumberStyle}>5</Text>
        </div>

        {/* Consulting Circle (Yellow) */}
        <div
          style={{
            position: "absolute",
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "#F59E0B", // Adjusted yellow to be more like image
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: 130,
            left: 25, // Adjusted for better overlap with Development
            zIndex: 1,
            textAlign: "center",
            padding: 5,
          }}
        >
          <Text style={circleTextStyle}>Consulting</Text>
          <Text style={circleNumberStyle}>10</Text>
        </div>

        {/* Design Circle (Pink) */}
        <div
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#EC4899", // Adjusted pink
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: 20,
            left: 135, // Adjusted for overlap
            zIndex: 3,
            textAlign: "center",
            padding: 5,
          }}
        >
          <Text style={circleTextStyle}>Design</Text>
          <Text style={circleNumberStyle}>2</Text>
        </div>

        {/* Delivered Circle (Green) */}
        <div
          style={{
            position: "absolute",
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "#10B981", // Adjusted green
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: 90,
            left: 95, // Adjusted for central overlap
            zIndex: 4,
            textAlign: "center",
            padding: 5,
          }}
        >
          <Text style={circleTextStyle}>Delivered</Text>
          <Text style={circleNumberStyle}>5</Text>
        </div>
      </div>
    </Card>
  );
};

export default ProjectStatsCard;
