import React from "react";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Row,
  Col,
  Progress,
  Space,
} from "antd";
import { UserOutlined } from "@ant-design/icons"; // Placeholder for avatar
import AssessmentScoreCard from "./AssesmentScoreCard"; // Corrected path assuming it's in the same directory
import "./UserProfileCard.css"; // We will create this CSS file

const { Title, Text } = Typography;

const skillData = [
  {
    title: "Technical Skills",
    percentage: 95,
    status: "Excellent",
    color: "#17B26A",
    dotColor: "#17B26A",
  },
  {
    title: "Soft Skills",
    percentage: 55,
    status: "Good",
    color: "#6CE9A6",
    dotColor: "#6CE9A6",
  }, // Adjusted color, check image
  {
    title: "Analytical Skills",
    percentage: 55,
    status: "Average",
    color: "#F79009",
    dotColor: "#F79009",
  },
  {
    title: "Leadership",
    percentage: 27,
    status: "Poor",
    color: "#F04438",
    dotColor: "#F04438",
  },
  {
    title: "AI Skills",
    percentage: 7,
    status: "Very Poor",
    color: "#D92D20",
    dotColor: "#D92D20",
  },
];

const UserProfileCard = () => {
  return (
    <Card className="nz-no-shadow">
      <Row
        justify="space-between"
        align="middle"
        className="user-profile-header"
      >
        <Col>
          <Space size="middle" align="center">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src="URL_TO_AVATAR_IMAGE"
            />{" "}
            {/* Replace with actual image URL */}
            <div>
              <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
                Jane Smith
              </Title>
              <Text style={{ color: "#475467" }}>
                My Role: Software Engineer
              </Text>
            </div>
          </Space>
        </Col>
        <Col>
          <Button type="primary" className="recommended-assignments-button">
            Recommended Assignments
          </Button>
        </Col>
      </Row>

      <Row
        gutter={[16, 24]}
        className="skill-progress-row"
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        {skillData.map((skill) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={4}
            xl={4}
            key={skill.title}
            className="skill-progress-col"
          >
            <div className="skill-item">
              <Text className="skill-title">{skill.title}</Text>
              <Progress
                type="dashboard"
                percent={skill.percentage}
                width={80} // Adjust size as needed
                format={(percent) => `${percent}%`}
                strokeColor={skill.color}
                className="skill-progress-circle"
              />
              <Space size={4} className="skill-status">
                <span
                  className="status-dot"
                  style={{ backgroundColor: skill.dotColor }}
                />
                <Text style={{ color: "#475467" }}>{skill.status}</Text>
              </Space>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default UserProfileCard;
