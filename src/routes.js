import React, { Component } from 'react';
import { ReduxRouter } from 'redux-router';
import { Route, IndexRoute } from 'react-router';


import PageTransition from "layouts/PageTransition/PageTransition"
import HelloWorldPage from "pages/HelloWorldPage/HelloWorldPage";

class Routes extends Component {
  render() {
    return(
      <ReduxRouter>
        <Route key="base" component={PageTransition} >
          <Route key="hello" path="/" component={HelloWorldPage}/>
          <Route key="hi" path="hi" component={HelloWorldPage} />
        </Route>
      </ReduxRouter>
    )
  }
}

export default Routes;
