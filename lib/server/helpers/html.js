/**
 * External dependencies
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

/*
 * Type: Presentational Component
 *
 * @prop {Object} assets
 * @prop {Object} appStore
 * @prop {Object} component
 * @prop {Object} initialState
 * @prop {Object} renderProps
 *
 * @returns html shell/document for server side rendering
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    appStore: PropTypes.object,
    component: PropTypes.node,
    initialState: PropTypes.object,
    renderProps: PropTypes.object
  };

  render() {
    const { assets, appStore, renderProps, initialState } = this.props;

    const component = (
        <Provider store={appStore} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );
    const content = component ? ReactDOM.renderToString(component) : '';

    const head = Helmet.rewind();

    const favicon = require('../../../favicon.ico');

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {head.title.toComponent()}
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
          {Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]}
              key={key}
              media="screen, projection"
              rel="stylesheet"
              charSet="UTF-8"
            />
          )}
        </head>
        <body>
          <div id="app-root" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML=
            {{ __html: `window.__INITIALSTATE__ = ${serialize(initialState)};` }}
            charSet="UTF-8"
          />
          <script src="/build/js/app.js" charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
