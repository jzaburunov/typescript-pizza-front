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
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-virtualized/styles.css";
import "./index.css";

const store = createStore(reducers, applyMiddleware(thunk, createLogger));

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
