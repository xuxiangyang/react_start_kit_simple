require("./HelloWorldPage.css"); //require your css、png

import React, {Component} from "react";
import { connect } from 'react-redux';


import Slogan from "components/Slogan/Slogan"
import Footer from "components/Footer/Footer"
import { PROVIDER } from "config"
import { increase } from "action_creators/count"

//这个state是全局store中的state。用它转换为props。一层一层的传递下去
function mapStateToProps(state) {
  return {
    count: state.count
  };
}


class HelloWorldPage extends Component {
  render() {
    return (
      <div className="page HelloWorldPage" onClick={this.increaseCount.bind(this)}>
        <Slogan title="Hello World" content={`Welcome to React World ${this.props.count}`}/>
        <Footer content={`provide by ${PROVIDER}`}/>
      </div>
    )
  }

  increaseCount() {
    this.props.dispatch(increase())
  }
}

export default connect(mapStateToProps)(HelloWorldPage);
