/***** IMPORTANT: ONLY ES5 CODE ALLOWED BELOW! *****/

//	enable runtime transpilation to use ES6/7 in node
var fs = require('fs');
var path = require('path');

var babelrc = fs.readFileSync(path.resolve(__dirname, '../.babelrc'));
var config;

try {
  config = JSON.parse(babelrc);
} catch(err) {
  console.log('Error parsing your .babelrc');
  console.error(err);
}

require('babel-core/register')(config);

require('../lib');