/**
 * External dependencies
 */
import path from 'path';
import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import httpProxy from 'http-proxy';
import favicon from 'serve-favicon';
import chalk from 'chalk';
import PrettyError from 'pretty-error';
import { match } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';

/**
 * Internal dependencies
 */
import prjConfig from '../../config';
import getRoutes from '../app/routes';
import configureStore from '../app/store/configure';
import Html from './helpers/html';
import getConfig from '../app/api/config';
import packageJSON from '../../package.json';

const apiOrigin = `http://${prjConfig.apiHost}`;
const app = new Express();
const pretty = new PrettyError();

//  create api proxy server instance
const apiProxy = httpProxy.createProxyServer({
  changeOrigin: true
});

app.use('/build', Express.static(path.join(__dirname, '../..', 'build')));
app.use(favicon(path.join(__dirname, '../..', 'favicon.ico')));

// proxy requests to API proxy server
// Test API origin - http://api.open-notify.org/astros.json?
app.all('/api/*', (req, res) => {
  apiProxy.web(req, res, { target: apiOrigin });
});

//  handle proxy server error
apiProxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', pretty.render(error));
  }

  if (!res.headerSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  res.end(JSON.stringify(json));
});

//  handle rendering for every request
const renderShell = (req, res) => {
  if (__DEVELOPMENT__) {
    // clears require() cache if in development mode (makes asset hot reloading work)
    global.webpackIsomorphicTools.refresh();
  }

  const history = createHistory();

  getConfig(appConfig => {
    if (!appConfig) {
      return res.status(401).end('Not authorized to access the application!');
    }

    //  create a redux store instance (holds the application state tree)
    const appStore = configureStore(history, { version: packageJSON.version, config: appConfig });

    match({ history, routes: getRoutes(appStore), location: req.originalUrl },
      (err, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (err) {
          console.error('Router Error:', pretty.render(err));
          return res.status(500);
        }

        if (!renderProps) {
          return res.status(404).end('Not found!');
        }

        // grab the initial state from our Redux store
        const initialState = appStore.getState();

        res.status(200).end(`<!doctype html>\n
          ${ReactDOMServer.renderToString(
            <Html
              assets={global.webpackIsomorphicTools.assets()}
              appStore={appStore}
              renderProps={renderProps}
              initialState={initialState}
            />
          )}`
        );
      }
    );
  });
};


// This is fired every time the server receives a request
app.use(renderShell);

//	start server
app.listen(prjConfig.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(chalk.yellow('>>> 💻  Open http://%s:%s in a browser to view the app.'), prjConfig.host, prjConfig.port);
});
