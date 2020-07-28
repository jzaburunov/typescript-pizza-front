import React, { useState } from "react";
import { BasicProps } from "antd/lib/layout/layout";
import { SidebarMenu } from "./SidebarMenu";
import { Layout } from "antd";
const { Content, Sider } = Layout;

interface AppInterface extends BasicProps {
  pathname: string;
}

export const App: React.FC<AppInterface> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { children, pathname } = props;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="app__sider" theme="dark" collapsed={collapsed}>
        <div
          className={
            collapsed
              ? `Navigation__header Navigation__header--collapsed`
              : `Navigation__header`
          }
          onClick={(): void => setCollapsed(!collapsed)}
        >
          <img
            height={collapsed ? 32 : 84}
            src="https://vignette.wikia.nocookie.net/oddsquad/images/f/f4/Pizza.png/revision/latest?cb=20170203223737"
            alt=""
          />
        </div>
        <SidebarMenu pathname={pathname} />
      </Sider>
      <Layout>
        <Content className="app__content">{children}</Content>
      </Layout>
    </Layout>
  );
};
