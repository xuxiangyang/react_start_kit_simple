require("./HelloWorldPage.css"); //require your css、png

import React, {Component} from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router';


import Slogan from "components/Slogan/Slogan"
import Footer from "components/Footer/Footer"
import Posts from "components/Posts/Posts"
import { PROVIDER } from "config"
import { increase } from "action_creators/count"

//这个state是全局store中的state。用它转换为props。一层一层的传递下去
function mapStateToProps(state) {
  return {
    post: state.post,
    count: state.count
  };
}

class HelloWorldPage extends Component {
  componentDidMount() {
    MTX.goBackAction()
  }

  render() {
    return (
      <div className="page HelloWorldPage" >
        <Slogan title="Hello World" content={`Welcome to React World ${this.props.count}`}/>
        <Link to="/hi"><h2>Hi</h2></Link>
        <a onClick={this.increaseCount.bind(this)}><h3>Increase number</h3></a>
        <Posts dispatch={this.props.dispatch} post={this.props.post}/>
        <Footer content={`provide by ${PROVIDER}`}/>
      </div>
    )
  }

  increaseCount() {
    this.props.dispatch(increase())
  }
}

export default connect(mapStateToProps)(HelloWorldPage);
