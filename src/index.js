require('babel-polyfill'); // ECMA6仿真
require("bootstrap-webpack"); //引入了bootstrap
require("index.css")

import React from "react"
import ReactDOM from 'react-dom';

import HelloWorldPage from "pages/HelloWorldPage/HelloWorldPage"

ReactDOM.render(
  <HelloWorldPage/>,
  document.getElementById("root")
);
