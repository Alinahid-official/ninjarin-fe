import { ConfigProvider } from "antd";
import { themeConfig } from "./components/layout/ThemeConfig";
import AppRoutes from "./utilities/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <AppRoutes />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
