/**
 * External dependencies
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';

/**
 * Internal dependencies
 */
import appReducer from '../reducers';
import promiseMiddleware from '../middleware/promise';

/*
 * Redux thunk middleware allows use of Action Creators (to return a function
 * instead of an action object) together with network requests.
 * applyMiddleware - allows store creation that is redux-thunk middleware enabled,
 * letting you dispatch async actions in addition to normal actions.
 */
export default function configureStore(history, initialState) {
    // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(history);

  const universalMiddleware = [thunk, promiseMiddleware, reduxRouterMiddleware];

  const middleware = applyMiddleware(...universalMiddleware);

  const finalCreateStore = compose(middleware)(createStore);

  const store = finalCreateStore(appReducer, initialState);

  return store;
}
