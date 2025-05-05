import { Drawer as AntDrawer, Typography } from "antd";

const { Title, Text } = Typography;

const CommonDrawer = ({
  title = "",
  subTitle = "",
  open = false,
  onClose,
  width = 600,
  children,
}) => {
  return (
    <AntDrawer
      title={
        <div style={{ padding: "15px 10px " }}>
          <Title
            level={4}
            style={{ margin: 0, color: "#262626", fontSize: 24 }}
          >
            {title}
          </Title>
          {subTitle && (
            <Text
              style={{
                color: "#595959",
                marginTop: 8,
                // display: "block",
                fontWeight: 400,
                fontSize: 14,
              }}
            >
              {subTitle}
            </Text>
          )}
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={width}
      closable={true}
      closeIcon={
        <div style={{ position: "absolute", right: 24, top: 24 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#262626"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      }
      style={{
        backgroundColor: "#F7F7F7",
      }}
      styles={{
        header: {
          padding: 0,
          borderBottom: "1px solid #f0f0f0",
          marginBottom: 0,
        },
        body: {
          padding: "10px 48px",
        },
        mask: {
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        },
        wrapper: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      {children}
    </AntDrawer>
  );
};

export default CommonDrawer;
