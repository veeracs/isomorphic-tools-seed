/***** IMPORTANT: ONLY ES5 CODE ALLOWED BELOW! *****/

var path = require('path');
var webpack = require('webpack');
var bourbon = require('node-bourbon');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic.config'))
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassLoaders = [
    'css-loader?sourceMap',
    'sass-loader?includePaths[]=' + bourbon.includePaths
];

module.exports = {
  devtool: 'cheap-source-map',
  context: __dirname,
  entry: '../lib/client/index.js',
  output: {
    path: path.resolve(__dirname, '../build/js'),
    filename: 'app.js',
    publicPath: '/build/'
  },
  sasslint: {
    configFile: '../.sass-lint.yml'
  },
  module: {
    preLoaders: [{
        test: /\.scss$/,
        loader: 'sasslint',
        exclude: /node_modules/
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      },
      exclude: /node_modules/
    }, {
      test: /\.(sass|scss)$/,
      loader: sassLoaders.join('!'),
      exclude: /node_modules/
    },
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  //  <<<--- DISABLE redux-devtools HERE...
    }),
    webpackIsomorphicToolsPlugin
    //  webpackIsomorphicToolsPlugin.development()
    // also enter development mode since it's a development webpack configuration 
    // when in development mode, it disables asset caching (and enables asset hot reload).
    // Just call it if you're developing your project with webpack-dev-server using this config
    // don't call it for your production webpack build
    // .development();
  ]
};

