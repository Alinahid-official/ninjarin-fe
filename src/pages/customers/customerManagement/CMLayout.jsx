import { Layout } from "antd";
import Sidebar from "../../../components/layout/Sidebar";
import CMSidebar from "../../../components/layout/CMSidebar";
import { useState } from "react";

const { Content } = Layout;

const CMLayout = ({ children }) => {
  const [mainCollapsed, setMainCollapsed] = useState(false);
  const [cmCollapsed, setCmCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar isCollapsed={true} />
      <Layout>
        <CMSidebar />
        <Layout>
          <Content
            style={{
              background: "#fff",
              borderRadius: "8px",
              minHeight: 280,
              padding: "16px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CMLayout;
