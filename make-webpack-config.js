var bourbon = require('node-bourbon').includePaths;

module.exports = function(options) {
  return {
    entry: options.entry,
    debug: options.debug,
    output: options.output,
    plugins: options.plugins,

    devtool: "source-map",
    resolveLoader: {
      modulesDirectories: ['node_modules']
    },
    resolve: {
      extensions: ['', '.js', '.cjsx', '.coffee']
    },
    module: {
      loaders: [
        { test: /\.scss$/, loader: "style!css!sass?includePaths[]=" + bourbon},
        { test: /\.css$/, loaders: ['style', 'css']},
        { test: /\.cjsx$/, loaders: ['react-hot', 'coffee', 'cjsx']},
        { test: /\.coffee$/, loader: 'coffee' }
      ]
    }
  }
};
