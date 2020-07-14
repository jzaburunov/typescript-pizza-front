import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { PizzaList } from "./components/PizzaList";
import { reducers } from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  render() {
    return <PizzaList />;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
