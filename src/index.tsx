import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import createLogger from "redux-logger";
import { BasicProps } from "antd/lib/layout/layout";
import { reducers } from "./reducers";
import { PizzaList } from "./components/PizzaList";
import { SidebarMenu } from "./components/SidebarMenu";
import { Cart } from "./components/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-virtualized/styles.css";
import "./index.css";

const store = createStore(reducers, applyMiddleware(thunk, createLogger));
const { Content, Sider } = Layout;

interface AppInterface extends BasicProps {
  pathname: string;
}

const App: React.FC<AppInterface> = (props) => {
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
        {/* <AppHeader
            collapsed={collapsed}
            onCollapse={(): void => this.setCollapsed(!collapsed)}
          /> */}
        <Content className="app__content">{children}</Content>
      </Layout>
    </Layout>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App pathname="">
        <Switch>
          <Route path="/menu" component={PizzaList} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.querySelector("#root")
);
