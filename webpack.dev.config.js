var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV || 'development'

module.exports = require("./make-webpack-config")({
	entry: [
    "webpack-dev-server/client?http://0.0.0.0:8080",
    'webpack/hot/dev-server',
    './app/bundles/example/router'
  ],
  debug: true,
  output: {
    path: path.join(__dirname, 'build', env),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/vertx/) // https://github.com/webpack/webpack/issues/353
  ]
});
