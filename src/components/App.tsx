import React, { useState } from "react";
import { connect } from "react-redux";
import { BasicProps } from "antd/lib/layout/layout";
import { Layout, Popover } from "antd";
import { logout as logoutAction } from "../actions/login";

const { Content, Sider } = Layout;

interface AppInterface extends BasicProps {
  pathname: string;
  sidebar: React.ReactType;
  logout(): Function;
}

const MenuPopover = (props: { logOut?: () => void }) => {
  const { logOut } = props;
  return (
    <>
      <div className="ant-pro-global-header-right-item" onClick={logOut}>
        Logout
      </div>
    </>
  );
};

const _App: React.FC<AppInterface> = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const { children, pathname, sidebar: SidebarMenu, logout } = props;

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
        <Layout.Header className="app__header">
          <span
            className="ant-pro-global-header-trigger"
            onClick={(): void => setCollapsed(!collapsed)}
            style={{ color: "white" }}
          >
            collapse
          </span>
          <div className="app__header__right">
            <Popover
              content={<MenuPopover logOut={logout} />}
              placement="rightBottom"
              trigger="click"
              visible={visible}
              onVisibleChange={(visible: boolean): void => setVisible(visible)}
            >
              <div
                className="ant-pro-global-header-right-item"
                onClick={(): void => setVisible(true)}
              >
                User Icon
              </div>
            </Popover>
          </div>
        </Layout.Header>
        <Content className="app__content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export const App = connect(null, {
  logout: logoutAction,
})(_App);
