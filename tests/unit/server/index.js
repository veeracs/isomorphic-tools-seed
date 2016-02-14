import React from 'react';
import tape from 'tape';
import ReactAddons from 'react/addons';
import createComponent from 'react-unit';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
import createHistory from 'react-router/lib/createMemoryHistory';
//  Component to test
import Html from '../../../lib/server/helpers/Html';
import configureStore from '../../../lib/app/store/configure';
import getRoutes from '../../../lib/app/routes';
import ApiClient from '../../../lib/app/api/client';
import packageJSON from '../../package.json';

const test = addAssertions(tape, {jsxEquals});

test('React Component: Html', (t) => {
  const history = createHistory();
  const apiClient = new ApiClient(req);

  getConfig(appConfig => {
    //  create a redux store instance (holds the application state tree)
    const appStore = configureStore(getRoutes, history, apiClient,
                      { version: packageJSON.version, config: appConfig });


    //	Shallow rendering: Render React element only one level deep
    const component = createComponent.shallow(<Html appStore={appStore} renderProps={renderProps} initialState={initialState} />);

    const title = component.findByQuery('title')[0];
    
    t.equal(title.text, 'Universal Redux for Fusion Internals', 'Document has a title');

    t.end();
  }
});
