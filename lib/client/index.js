import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from '../app/store/configure';
import getRoutes from '../app/routes';

import './assets/styles/app.scss';

const initialState = window.__INITIAL_STATE__;
const appRootElm = document.getElementById('app-root');

const appStore = configureStore(browserHistory, initialState);

const component = (
  <Router history={browserHistory}>
    {getRoutes(appStore)}
  </Router>
);

ReactDOM.render(
	<Provider store={appStore} key="provider">
		{component}
	</Provider>,
	appRootElm
);
