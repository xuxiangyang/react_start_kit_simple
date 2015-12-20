require("./Footer.css");

import React, {Component} from "react";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        {this.props.content}
      </div>
    )
  }
}

export default Footer;
