const { join } = require('path');
const pathToPackage  = join(process.env.INIT_CWD, 'package.json');
const settings = require(pathToPackage).gulpSettings;

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins({
	DEBUG: true,
	scope: ['dependencies'],
});

const copyVendorScripts = require('./gulp-tasks/copy-vendor-scripts');
const buildScripts = require('./gulp-tasks/build-scripts');
const buildStyles = require('./gulp-tasks/build-styles');
const replaceAssetsAbsoluteUrl = require('./gulp-tasks/replace-assets-absolute-url');
const minifyStyles = require('./gulp-tasks/minify-styles');
const minifyHtml = require('./gulp-tasks/minify-html');

gulp.task('build:scripts', buildScripts(gulp, settings, plugins));

gulp.task('copy:vendor-scripts', copyVendorScripts(gulp, settings, plugins));

gulp.task('scripts', gulp.parallel('copy:vendor-scripts', 'build:scripts'));

gulp.task('build:styles', buildStyles(gulp, settings, plugins));

gulp.task('minify:styles', minifyStyles(gulp, settings, plugins));

gulp.task('build:hugo', () => {
	process.chdir(process.env.INIT_CWD);
	return plugins.shell.task('hugo')();
});

gulp.task('replace:assets-absolute-url', replaceAssetsAbsoluteUrl(gulp, settings, plugins));

gulp.task('minify:html', minifyHtml(gulp, settings, plugins));

gulp.task('build:site', gulp.series(gulp.parallel('scripts', 'build:styles'), 
	'build:hugo', 
	'replace:assets-absolute-url',
	'minify:styles',
	'minify:html'
));

gulp.task('default', gulp.parallel('scripts', 'build:styles'));