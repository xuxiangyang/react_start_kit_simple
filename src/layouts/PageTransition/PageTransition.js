require("./PageTransition.css");
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import StaticContainer from 'react-static-container';
import React from 'react';

class PageTransition extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      previousPathname: null,
      history: [],
      back: false
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let previousPathname = this.state.previousPathname;
    let history = this.state.history;
    let back = this.state.back;
    if (nextContext.location.pathname !== this.context.location.pathname) {
      previousPathname = this.context.location.pathname;

      if (history.length >  0 && nextContext.location.pathname === history[history.length - 1]) {
        back = true;
        history.pop();
      } else {
        back = false
        history.push(this.context.location.pathname);
      }
    }
    this.setState({previousPathname: previousPathname, history: history, back: back})
  }

  componentDidUpdate() {
    if (this.state.previousPathname) {
      this.setState({ previousPathname: null })
    }
  }

  render() {
    let transitionName = this.state.back ? "page-back" : "page-transition";
    return(
      <ReactCSSTransitionGroup component="div" transitionName={transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        <StaticContainer key={this.state.previousPathname || this.context.location.pathname} shouldUpdate={!this.state.previousPathname}>
          {this.props.children}
        </StaticContainer>
      </ReactCSSTransitionGroup>
    )
   }
}

PageTransition.contextTypes = {
  location: React.PropTypes.object
}

export default PageTransition;
