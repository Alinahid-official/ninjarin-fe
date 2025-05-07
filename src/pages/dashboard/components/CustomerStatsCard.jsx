import React from "react";
import {
  UserOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ReactApexChart from "react-apexcharts";
import { TbUserHexagon } from "react-icons/tb";

const CustomerStatsCard = () => {
  const chartOptions = {
    chart: {
      type: "area",
      height: 60,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#2979ff"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#2979ff",
            opacity: 0.2,
          },
          {
            offset: 100,
            color: "#2979ff",
            opacity: 0,
          },
        ],
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Customers",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  return (
    <div
      style={{
        border: "1px solid #FEF0F2",
        borderRadius: 24,
        padding: "16px 0px",
        background: "#fff",
        width: 500,
        boxSizing: "border-box",
        boxShadow: "0 0 0 0 transparent",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          padding: "0px 24px",
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
            <TbUserHexagon style={{ fontSize: 24 }} />
            <span style={{ fontWeight: 600, fontSize: 16 }}>
              Total Customers
            </span>
            <InfoCircleOutlined style={{ color: "#961FFF", marginLeft: 4 }} />
          </div>
          <RightOutlined style={{ color: "#961FFF", fontSize: 16 }} />
        </div>
        <div style={{ marginTop: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#444" }}>
            53
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span
            style={{
              fontWeight: 500,
              fontSize: 18,
              marginRight: 4,
            }}
          >
            <span style={{ fontSize: 18, verticalAlign: "middle" }}>↑</span> 12%
          </span>
          <span style={{ color: "#596780", fontWeight: 500, marginLeft: 8 }}>
            vs last 7 days
          </span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="area"
          height={60}
        />
      </div>
    </div>
  );
};

export default CustomerStatsCard;
