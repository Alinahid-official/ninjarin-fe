import { Button, Typography, Space, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ninjarinIcon from "@/assets/images/logo/ninjarin-icon.png";

const { Title, Text } = Typography;

const BlankList = ({
  isLoading = false,
  title = "Ready to build your project list?",
  description = "You haven't added any projects yet.\nStart by adding one now!",
  buttonText = "Add Project",
  onClick = () => {},
  icon = ninjarinIcon,
}) => {
  return (
    <Space
      className="nz-border"
      direction="vertical"
      align="center"
      style={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        borderRadius: "8px",
        backgroundColor: "#F8FAFC",
      }}
    >
      <img
        src={icon}
        alt="Empty state icon"
        style={{
          width: "120px",
          height: "120px",
          marginBottom: "24px",
        }}
      />

      {isLoading ? (
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      ) : (
        <>
          <Title level={4} style={{ margin: 0, color: "#595959" }}>
            {title}
          </Title>

          <Text
            style={{
              color: "#8C8C8C",
              textAlign: "center",
              marginBottom: "24px",
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </Text>

          <Button type="primary" icon={<PlusOutlined />} onClick={onClick}>
            {buttonText}
          </Button>
        </>
      )}
    </Space>
  );
};

export default BlankList;
