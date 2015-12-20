require("./HelloWorldPage.css"); //require your css、png

import React, {Component} from "react";

import Slogan from "components/Slogan/Slogan"
import Footer from "components/Footer/Footer"

import {PROVIDER} from "config"

class HelloWorldPage extends Component {
  render() {
    return (
      <div className="page HelloWorldPage">
        <Slogan title="Hello World" content="Welcome to React World"/>
        <Footer content={`provide by ${PROVIDER}`}/>
      </div>
    )
  }
}

export default HelloWorldPage;
