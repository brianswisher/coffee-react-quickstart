var path = require('path');
var webpack = require('webpack');
var env = 'production'
var CommonsChunkPlugin = require("./node_modules/webpack/lib/optimize/CommonsChunkPlugin");

module.exports = require("./make-webpack-config")({
  entry: {
    app: [
      './src/scripts/router'
    ],
    landingPage: './src/scripts/LandingPageEntry'
  },
  debug: false,
  output: {
      path: path.join(__dirname, "build", env),
      filename: "[name].bundle.js",
      chunkFilename: "[id].chunk.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      // This has effect on the react lib size.
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.IgnorePlugin(/un~$/),
    new webpack.IgnorePlugin(/^\.\/lang$/, /moment$/),
    new CommonsChunkPlugin("commons.js"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]
});
