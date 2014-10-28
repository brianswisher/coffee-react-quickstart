gulp = require 'gulp'
gutil = require 'gulp-util'
webpack = require("webpack")
webpackConfig = require("./webpack.config.js")
map = require 'map-stream'
touch = require 'touch'
_ = require 'underscore'
env = process.env.NODE_ENV || 'development'

# Load plugins
$ = require('gulp-load-plugins')()

gulp.task('copy-assets', ->
    gulp.src('app/assets/**')
      .pipe(gulp.dest('build/'+env))
      .pipe($.size())
)

gulp.task "webpack:build", (callback) ->
  # Run webpack.
  webpack webpackConfig, (err, stats) ->
    throw new gutil.PluginError("webpack:build", err)  if err
    gutil.log "[webpack:build]", stats.toString(colors: true)
    callback()
    return

gulp.task '_watch', ->
  gulp.watch(['app/assets/**'], ['copy-assets'])

gulp.task 'default', ->
  gulp.start 'build'

gulp.task 'build', [
  'webpack:build'
  'copy-assets'
]

gulp.task 'watch', [
  'copy-assets'
], ->
  require './webpack_dev_server'
  gulp.start '_watch'
