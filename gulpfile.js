const { join } = require('path');
const pathToPackage  = join(process.env.INIT_CWD, 'package.json');
const settings = require(pathToPackage).gulpSettings;

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins({
	DEBUG: false,
	scope: ['dependencies'],
});

const copyVendorScripts = require('./gulp-tasks/copy-vendor-scripts');
const buildScripts = require('./gulp-tasks/build-scripts');


gulp.task('build:scripts', buildScripts(gulp, settings, plugins));

gulp.task('copy:vendor-scripts', copyVendorScripts(gulp, settings, plugins));

gulp.task('scripts', gulp.parallel('copy:vendor-scripts', 'build:scripts'));

gulp.task('default', gulp.series('scripts'));