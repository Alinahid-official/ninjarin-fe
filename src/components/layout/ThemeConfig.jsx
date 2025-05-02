import { theme } from "antd";

export const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "rgba(0, 0, 0, 0.6)",
    borderRadius: 6,
    colorLink: "rgba(0, 0, 0, 0.6)",
    colorText: "rgba(0, 0, 0, 0.6)", // Primary text color
    colorTextSecondary: "rgba(0, 0, 0, 0.6)", // Secondary text color
    colorTextTertiary: "rgba(0, 0, 0, 0.6)", // Tertiary text color
    colorTextHeading: "rgba(0, 0, 0, 0.6)", // Heading text color
    colorTextLabel: "rgba(0, 0, 0, 0.6)",
    // You can customize other token values here
  },
  components: {
    // Component-level customization
    Button: {
      borderRadius: 4,
      primaryShadow: "none",
    },
    Card: {
      borderRadius: 8,
    },
    Menu: {
      itemSelectedBg: "rgba(0, 0, 0, 0.05)",
      itemSelectedColor: "rgba(0, 0, 0, 1)",
      iconSize: 20,
    },
  },
};
