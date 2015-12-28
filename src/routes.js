import React, { Component } from 'react';
import { ReduxRouter } from 'redux-router';
import { Route, IndexRoute } from 'react-router';

import HelloWorldPage from "pages/HelloWorldPage/HelloWorldPage";

class Routes extends Component {
  render() {
    return(
      <ReduxRouter>
        <Route key="hello" path="/" component={HelloWorldPage}/>
      </ReduxRouter>
    )
  }
}

export default Routes;
