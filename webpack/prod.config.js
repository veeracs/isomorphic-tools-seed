/***** IMPORTANT: ONLY ES5 CODE ALLOWED BELOW! *****/

var path = require('path');
var webpack = require('webpack');
var bourbon = require('node-bourbon');

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
    filename: 'app.js'
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
      loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false  //  <<<--- DISABLE redux-devtools HERE...
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('../css/app.css')
  ]
};
