import { theme } from 'antd';

export const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
    // You can customize other token values here
  },
  components: {
    // Component-level customization
    Button: {
      borderRadius: 4,
    },
    Card: {
      borderRadius: 8,
    },
  },
};