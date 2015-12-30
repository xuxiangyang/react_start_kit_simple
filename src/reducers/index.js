import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import count from "./count"
import post from "./post.js"

const App = combineReducers({
  count: count,
  post: post,
  router: routerStateReducer
});

export default App;
