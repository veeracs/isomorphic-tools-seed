import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import counter from './counter';
import version from './version';
import config from './config';
import posts from './posts';

const appReducer = combineReducers({
  config,
  routing: routeReducer,
  version,
  counter,
  posts
});

export default appReducer;
