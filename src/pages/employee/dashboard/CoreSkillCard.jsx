import { Row, Col, Typography, Progress, Card, Space } from "antd";

const { Title, Text, Link } = Typography;

const cardStyle = {
  borderRadius: "12px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
  padding: "24px",
  backgroundColor: "#FFFFFF",
  marginBottom: "24px",
  border: "none",
};
const CoreSkillsCard = () => {
  const skills = [
    {
      name: "Technical Skills",
      value: 95,
      color: "#12B76A", // Dark Green
      statusText: "Excellent",
    },
    { name: "Soft Skills", value: 55, color: "#50C878", statusText: "Good" }, // Lighter distinct Green
    {
      name: "Analytical Skills",
      value: 55,
      color: "#F79009",
      statusText: "Average",
    }, // Orange
    { name: "Leadership", value: 27, color: "#F66D62", statusText: "Poor" }, // Pinkish Red
    { name: "AI Skills", value: 7, color: "#D92D20", statusText: "Very Poor" }, // Strong Red
  ];

  const legendItems = [
    { text: "Excellent", color: "#12B76A" },
    { text: "Good", color: "#50C878" },
    { text: "Average", color: "#F79009" },
    { text: "Poor", color: "#F66D62" },
    { text: "Very Poor", color: "#D92D20" },
  ];

  return (
    <Card style={cardStyle} className="nz-no-shadow">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Title
          level={5}
          style={{ margin: 0, color: "#101828", fontWeight: 600 }}
        >
          Core Skills
        </Title>
        <Link
          href="#"
          style={{ color: "#7F56D9", fontWeight: 600, fontSize: "14px" }}
        >
          View Report
        </Link>
      </div>
      <Row
        gutter={[16, 24]} // Adjusted gutter for more compact layout
        justify="center"
        align="top" // Align items to the top to accommodate text above progress
        style={{ marginBottom: "24px" }}
      >
        {skills.map((skill) => (
          <Col key={skill.name} style={{ textAlign: "center" }}>
            <Text
              style={{
                display: "block",
                marginBottom: "8px", // Space between name and progress
                color: "#475467",
                fontSize: "12px", // Smaller font size for skill name
                fontWeight: 400, // Normal font weight
              }}
            >
              {skill.name}
            </Text>
            <Progress
              type="circle"
              percent={skill.value}
              strokeColor={skill.color}
              trailColor="#F3F4F6"
              width={70} // Smaller progress circle
              format={(percent) => (
                <Text
                  style={{
                    fontSize: "16px", // Smaller font size for percentage
                    fontWeight: "600",
                    color: "#1D2939",
                  }}
                >
                  {percent}%
                </Text>
              )}
            />
          </Col>
        ))}
      </Row>
      <Row justify="center">
        <Space size="medium">
          {" "}
          {/* Adjusted space size for legend */}
          {legendItems.map((item) => (
            <Space key={item.text} align="center">
              <div
                style={{
                  width: "8px", // Smaller legend dot
                  height: "8px", // Smaller legend dot
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              />
              <Text style={{ fontSize: "11px", color: "#475467" }}>
                {" "}
                {/* Slightly smaller legend text */}
                {item.text}
              </Text>
            </Space>
          ))}
        </Space>
      </Row>
    </Card>
  );
};

export default CoreSkillsCard;
