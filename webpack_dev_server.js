var bodyParser = require('body-parser');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var port = process.env.PORT || 8080

var server = new WebpackDevServer(webpack(config), {
  contentBase: config.output.path,
  hot: true,
  watchDelay: 100,
  noInfo: true,
})

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended: true}));

server.listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Webpack dev server listening at localhost:' + port);
});
