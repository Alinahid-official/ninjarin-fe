import React from "react";
import { Card, Flex, Typography, Tooltip, Progress, Divider } from "antd";
import {
  UserOutlined,
  InfoCircleOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";

const { Title, Text } = Typography;

// ApexCharts Mini Line Chart Component
const MiniLineChart = () => {
  const series = [
    {
      name: "Users",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 40,
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#8C5BF2"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.0,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#8C5BF2",
            opacity: 0.2,
          },
          {
            offset: 100,
            color: "#8C5BF2",
            opacity: 0.0,
          },
        ],
      },
    },
    tooltip: {
      enabled: false,
    },
    grid: {
      show: false,
    },
  };

  return (
    <div style={{ width: 200, height: 100 }}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={100}
      />
    </div>
  );
};

const CustomerStatsCard = () => {
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 16,
        border: "1px solid #FEF0F2",
        height: "340px",
      }}
      styles={{
        body: {
          height: "100%",
        },
      }}
    >
      <Flex vertical justify="space-between" style={{ height: "100%" }}>
        <Flex justify="space-between" align="top">
          <Flex vertical>
            <Flex align="center" gap={8} style={{ marginBottom: 8 }}>
              <UserOutlined style={{ fontSize: 20, color: "#4B5563" }} />
              <Text style={{ fontSize: 16, fontWeight: 600, color: "#1F2937" }}>
                Total Users
              </Text>
              <Tooltip title="Total number of active users">
                <InfoCircleOutlined
                  style={{ color: "#8C5BF2", cursor: "pointer" }}
                />
              </Tooltip>
            </Flex>
            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: 25,
                fontWeight: "bold",
                color: "#111827",
              }}
            >
              50,000
            </Title>
            <Flex align="center" gap={4} style={{ marginTop: 4 }}>
              <ArrowUpOutlined style={{ color: "#10B981", fontSize: 14 }} />
              <Text style={{ color: "#8C5BF2", fontWeight: 500, fontSize: 14 }}>
                12%
              </Text>
              <Text style={{ color: "#6B7280", fontSize: 14 }}>
                vs last 7 days
              </Text>
            </Flex>
          </Flex>
          <div style={{ marginTop: 8 }}>
            <MiniLineChart />
          </div>
        </Flex>

        <Flex
          justify="space-between"
          gap={24}
          style={{
            paddingTop: 16,
            borderTop: "1px solid #FEF0F2",
          }}
        >
          <Flex vertical>
            <Flex justify="space-between" align="center">
              <Text style={{ color: "#4B5563", fontSize: 16 }}>Onboarded</Text>
              <Flex align="center" gap={4}>
                <ArrowUpOutlined style={{ color: "#10B981", fontSize: 14 }} />
                <Text style={{ color: "#10B981", fontSize: 14 }}>25.8%</Text>
              </Flex>
            </Flex>
            <Progress
              percent={60}
              strokeColor="#8C5BF2"
              trailColor="#E5E7EB"
              showInfo={false}
              style={{ margin: "8px 0" }}
              size="small"
            />
          </Flex>

          <Flex vertical>
            <Flex justify="space-between" align="center">
              <Text style={{ color: "#4B5563", fontSize: 16 }}>
                Skills Mapped
              </Text>
              <Flex align="center" gap={4}>
                <ArrowUpOutlined style={{ color: "#10B981", fontSize: 14 }} />
                <Text style={{ color: "#10B981", fontSize: 14 }}>25.8%</Text>
              </Flex>
            </Flex>
            <Progress
              percent={40}
              strokeColor="#8C5BF2"
              trailColor="#E5E7EB"
              showInfo={false}
              style={{ margin: "8px 0" }}
              size="small"
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CustomerStatsCard;
