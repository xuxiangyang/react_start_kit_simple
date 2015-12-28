require('babel-polyfill'); // ECMA6仿真
require("bootstrap-webpack"); //引入了bootstrap
require("index.css");
require("vendor/js/mtx.js"); //客户端api

import React from "react";
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { reduxReactRouter } from "redux-router";
import createBrowserHistory from "history/lib/createBrowserHistory";

import App from "reducers";
import Routes from "routes";

const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ createHistory: createBrowserHistory })
)(createStore)(App);


ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
