var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
  contentBase: './build/',
  hot: true,
  watchDelay: 100,
  noInfo: true,
})

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended: true}));

server.listen(8080, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:8080');
});

var express = require('express');
var app = express();
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/build/index.html');
});
app.listen(8081);
