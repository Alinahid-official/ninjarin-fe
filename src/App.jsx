import { ConfigProvider } from 'antd';
import { themeConfig } from './components/layout/ThemeConfig';
import AppRoutes from './utilities/routes';

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
     <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
