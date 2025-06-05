import { theme } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#240246",
    borderRadius: 6,
    colorLink: "#961FFF",
    colorText: "#240246", // Primary text color
    colorTextSecondary: "#596780", // Secondary text color
    colorTextTertiary: "#240246", // Tertiary text color
    colorTextHeading: "#240246", // Heading text color
    colorTextLabel: "#240246",
    colorBorder: "#EEE6FF", // Default border color
    colorPrimaryHover: "#961FFF", // Hover state color
    colorPrimaryBorder: "#961FFF", // Focus state border color
    controlOutline: "rgba(150, 31, 255, 0.1)", // Focus outline color
  },
  components: {
    // Component-level customization
    Button: {
      borderRadius: 4,
      primaryShadow: "none",
      colorPrimary: "#961FFF",
    },
    Card: {
      borderRadius: 8,
    },
    Menu: {
      itemSelectedBg: "#EFE6FF",
      itemSelectedColor: "#9D45FF",
      iconSize: 20,
    },
    Input: {
      activeBorderColor: "#961FFF",
      hoverBorderColor: "#961FFF",
      colorBorder: "#FD9AB0",
    },
    Select: {
      colorBorder: "#FD9AB0",
      colorPrimary: "#961FFF",
      colorPrimaryHover: "#961FFF",
      controlOutline: "rgba(150, 31, 255, 0.1)",
    },
    Table: {
      rowSelectedBg: "transparent",
      rowSelectedHoverBg: "transparent",
      rowHoverBg: "rgba(150, 31, 255, 0.05)",
    },
  },
};
