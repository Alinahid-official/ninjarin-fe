import React from "react";
import { Card, Flex, Typography, Tooltip, Progress } from "antd";
import {
  InfoCircleOutlined,
  RightOutlined,
  AppstoreOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ProjectStatsCard = () => {
  const categories = [
    { name: "Development", percentage: 25.8 },
    { name: "Consulting", percentage: 25.8 },
    { name: "Design", percentage: 25.8 },
    { name: "Delivered", percentage: 25.8 },
  ];

  return (
    <Card
      style={{
        width: "100%",
        height: "340px",
        borderRadius: 16,
        border: "1px solid #FEF0F2",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <Flex vertical style={{ height: "100%" }} justify="space-between">
        <div>
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: 12 }}
          >
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
              fontSize: 25,
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            20
          </Title>
        </div>

        <Flex vertical gap={12} style={{ flex: 1 }}>
          {categories.map((category) => (
            <div key={category.name}>
              <Flex justify="space-between" align="center">
                <Text style={{ fontSize: 15, color: "#4B5563" }}>
                  {category.name}
                </Text>
                <Flex align="center" gap={4}>
                  <ArrowUpOutlined style={{ color: "#22C55E", fontSize: 12 }} />
                  <Text style={{ color: "#22C55E", fontSize: 14 }}>
                    {category.percentage}%
                  </Text>
                </Flex>
              </Flex>
              <Progress
                percent={category.percentage}
                showInfo={false}
                strokeColor="#8C5BF2"
                trailColor="rgba(140, 91, 242, 0.2)"
                style={{ marginBottom: 2 }}
                size="small"
              />
            </div>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProjectStatsCard;
