import React, { Component, ReactElement } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import { PizzaList } from "./components/PizzaList";
import { Layout } from "antd";
import { reducers } from "./reducers";
import { BasicProps } from "antd/lib/layout/layout";

const store = createStore(reducers, applyMiddleware(thunk));
const { Content, Sider } = Layout;

interface AppStateInterface {
  collapsed: boolean;
}

class App extends Component<BasicProps, AppStateInterface> {
  constructor(props: BasicProps) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  render() {
    // Add sidebar
    const { collapsed } = this.state;
    const { children } = this.props;

    return (
      // <div className="container">
      //   <PizzaList />
      // </div>
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
          {/* <SidebarMenu pathname={pathname} /> */}
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
    <App>
      <PizzaList />
    </App>
  </Provider>,
  document.querySelector("#root")
);
