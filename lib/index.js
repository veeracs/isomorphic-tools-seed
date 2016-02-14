/***** IMPORTANT: ONLY ES5 CODE ALLOWED BELOW! *****/

var path = require('path');
var rootDir = path.resolve(__dirname, '..');

/**
 *	Universal node constants
 */

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;		// for error debugging
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = 
	new WebpackIsomorphicTools(require('../webpack/isomorphic.config.js'))
		.development(__DEVELOPMENT__)
		.server(rootDir, function() {
			console.log('Webpack is all set now....');
			require('./server');
		});
