import React from "react";
import { Row, Col, Typography, Progress, Card, Space } from "antd";
import AssessmentScoreCard from "./AssesmentScoreCard";
import CoreSkillsCard from "./CoreSkillCard";

const { Title, Text, Link } = Typography;

const WelcomeSection = () => (
  <div style={{ marginBottom: "32px" }}>
    <Title
      level={2}
      style={{ margin: "0 0 8px 0", fontWeight: 700, color: "#1D2939" }}
    >
      Welcome to Ninzarim, Prathik!
    </Title>
    <Text style={{ fontSize: "16px", color: "#667085" }}>
      We're here to help you get to the next level in your career.
    </Text>
  </div>
);

const DashboardCard = () => {
  return (
    <div style={{ width: "100%" }}>
      <WelcomeSection />
      <Row gutter={24}>
        <Col xs={24} lg={10}>
          <AssessmentScoreCard />
        </Col>
        <Col xs={24} lg={14}>
          <CoreSkillsCard />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCard;
