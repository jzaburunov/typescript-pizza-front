// TODO:
// v Menu
// v sidebar
// v Cart
// v Login
//    logout
//    register
// *   protect routes
//  Additionally:
//   Pagination
//   Description page
//   orders and Check out

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import createLogger from "redux-logger";
import { reducers } from "./reducers";
import { PizzaList } from "./components/PizzaList";
import { Cart } from "./components/Cart";
import { App } from "./components/App";
import { Login } from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-virtualized/styles.css";
import "./index.css";
import { SidebarMenu } from "./components/SidebarMenu";
import { PrivateRoute } from "./components/PrivateRoute";

const store = createStore(reducers, applyMiddleware(thunk, createLogger));

// TODO Add login page
// Protect other pages if user is not authenticated
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App pathname="" sidebar={SidebarMenu}>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/menu" component={PizzaList} />
          <PrivateRoute path="/cart" component={Cart} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.querySelector("#root")
);
