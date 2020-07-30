import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BasicProps } from "antd/lib/layout/layout";
import { Layout, Popover } from "antd";
import { logout as logoutAction } from "../actions/login";
import { StoreState } from "../reducers";

const { Content, Sider } = Layout;

interface AppInterface extends RouteComponentProps, BasicProps {
  pathname: string;
  sidebar: React.ReactType;
  logout(push: Function): Function;
  authorized: boolean;
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
  const {
    children,
    pathname,
    sidebar: SidebarMenu,
    logout,
    authorized,
    history: { push },
  } = props;

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
              content={<MenuPopover logOut={() => logout(push)} />}
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

function mapStateToProps(state: StoreState) {
  const { session } = state;
  return {
    authorized: session,
  };
}

export const App = connect(mapStateToProps, {
  logout: logoutAction,
})(withRouter(_App));
