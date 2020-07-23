import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import { PizzaList } from "./components/PizzaList";
import { Layout } from "antd";
import { BasicProps } from "antd/lib/layout/layout";
import { reducers } from "./reducers";
import { SidebarMenu } from "./components/SidebarMenu";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import "./index.css";

const store = createStore(reducers, applyMiddleware(thunk));
const { Content, Sider } = Layout;

interface AppStateInterface {
  collapsed: boolean;
}

interface AppInterface extends BasicProps {
  pathname: string;
}

const App: React.FC<AppInterface> = (props) => {
    const [ collapsed, setCollapsed ] = useState(false);
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
          {/* <AppHeader
            collapsed={collapsed}
            onCollapse={(): void => this.setCollapsed(!collapsed)}
          /> */}
          <Content className="app__content">{children}</Content>
        </Layout>
      </Layout>
    );
  }

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App pathname="">
        <PizzaList />
      </App>
    </Router>
  </Provider>,
  document.querySelector("#root")
);
