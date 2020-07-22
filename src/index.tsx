import React, { Component } from "react";
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
import 'antd/dist/antd.css';

const store = createStore(reducers, applyMiddleware(thunk));
const { Content, Sider } = Layout;

interface AppStateInterface {
  collapsed: boolean;
}

interface AppInterface extends BasicProps {
  pathname: string;
}

class App extends Component<AppInterface, AppStateInterface> {
  constructor(props: AppInterface) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  render() {
    // Add sidebar
    const { collapsed } = this.state;
    const { children, pathname } = this.props;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider className="app__sider" theme="dark" collapsed={collapsed}>
          <div
            className={
              collapsed
                ? `Navigation__header Navigation__header--collapsed`
                : `Navigation__header`
            }
          >
            {/* TODO */}
            {/* <img
              height={collapsed ? 32 : 84}
              src={collapsed ? logoSmall : logoBig}
              alt=""
            /> */}
          </div>
          <SidebarMenu pathname={pathname} />
        </Sider>
        <Layout>
          {/* <AppHeader
            collapsed={collapsed}
            onCollapse={(): void => setCollapsed(!collapsed)}
          /> */}
          <Content className="app__content">{children}</Content>
        </Layout>
      </Layout>
    );
  }
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
