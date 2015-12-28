import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import count from "./count"

const App = combineReducers({
  count: count,
  router: routerStateReducer
});

export default App;
