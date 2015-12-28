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

var backStack = [() => { MTX.doClose(); }];
window.backStack = backStack;

MTX.goBackAction = function() {
  backStack.push(() => { store.history.goBack() })
}

MTX.doCloseAction = function() {
  backStack.push(() => { MTX.doClose() })
}

MTX.doConfig({
  navBar: {
    left: { func: "funcBack" }
  }
});

MTX.navbarLeftButtonEvent = function() {
  backStack.pop()();
}

window.onbeforeunload = function() {
  MTX.doConfig({
    navBar: {
      left: { func: "funcClose" }
    }
  });
}



ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
