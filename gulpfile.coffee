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

gulp.task('copy-index', ->
    gulp.src('app/index.html')
      .pipe(gulp.dest('build/'+env))
)

# Some quick notes on using fontcustom.
# First you need to install some additional software
# as detailed at https://github.com/FontCustom/fontcustom#installation
# On MacOSX, this comment was the only way I got things to work: https://github.com/FontCustom/fontcustom/issues/209#issuecomment-48014939
# Otherwise I got a Python import error.
#
# Then once things are working, things here are setup so that the generated font
# is base64 encoded and included in the css file. For this to work, you
# need to edit the generated scss file at modules/styles/_fontcustom.scss to remove
# its font-face imports.
# Font compilation
gulp.task('font', $.shell.task([
  'fontcustom compile'
]))

gulp.task('font-base-64', ->
  gulp.src('app/assets/fonts/*.ttf')
    .pipe($.rename('fontcustom.ttf'))
    .pipe($.cssfont64())
    .pipe($.rename('_fontcustom_embedded.scss'))
    .pipe(gulp.dest('modules/styles/'))
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
  'copy-index'
]

gulp.task 'watch', [
  'copy-assets'
  'copy-index'
], ->
  require './webpack_dev_server'
  gulp.start '_watch'
