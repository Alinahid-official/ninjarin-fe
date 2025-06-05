import { ConfigProvider, Spin } from "antd";
import { themeConfig } from "./components/layout/ThemeConfig";
import AppRoutes from "./utilities/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  Spin.setDefaultIndicator(antIcon);

  return (
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <AppRoutes />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
