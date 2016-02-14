import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { Home } from './pages';

export default () => (
  <Route path="/">
    <IndexRoute component={Home}/>
  </Route>
);
