require("./Slogan.css"); //require your css、png

import React, {Component} from "react";

class Slogan extends Component {
  render() {
    return(
      <div className="Slogan">
        <h3 className="Slogan-title">{this.props.title}</h3>
        <p className="Slogan-content">{this.props.content}</p>
      </div>
    )
  }
}

export default Slogan;
