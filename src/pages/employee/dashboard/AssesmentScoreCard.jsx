import { Card, Typography } from "antd";

const cardStyle = {
  borderRadius: "12px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
  padding: "24px",
  backgroundColor: "#FFFFFF",
  marginBottom: "24px",
  border: "none",
};
const { Title, Text } = Typography;
const AssessmentScoreCard = () => {
  const barData = [30, 40, 50, 60, 70, 80, 98]; // Percentages for height
  const maxBarHeight = 160; // Max height of a bar in pixels

  return (
    <Card style={cardStyle} className="nz-no-shadow">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
        }}
      >
        <div>
          <Title
            level={5}
            style={{ margin: 0, color: "#101828", fontWeight: 600 }}
          >
            Assessment Score
          </Title>
          <Text style={{ fontSize: "12px", color: "#E5355A" }}>
            Accumulative score for all skills.
          </Text>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          height: `${maxBarHeight + 20}px`,
          marginTop: "20px",
        }}
      >
        {barData.map((heightPercent, index) => (
          <div
            key={index}
            style={{
              width: "18px",
              height: `${(heightPercent / 100) * maxBarHeight}px`,
              backgroundColor:
                index === barData.length - 1 ? "#8A3FFC" : "#E0E0E0",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            {index === barData.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#fff",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#8A3FFC",
                  whiteSpace: "nowrap",
                }}
              >
                {heightPercent}%
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AssessmentScoreCard;
