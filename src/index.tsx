import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import 'bootstrap/dist/css/bootstrap.min.css'
import { PizzaList } from "./components/PizzaList";
import { reducers } from "./reducers";

const store = createStore(reducers, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <div className="container">
        <PizzaList />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
