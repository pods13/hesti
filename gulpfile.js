const { join } = require('path');
const { gulpSettings } = require(join(process.cwd(), 'package.json'));

const _ = require('lodash');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins({
	DEBUG: false,
	scope: ['dependencies'],
});
const ghpages = require('gh-pages');

const copyVendorScripts = require('./gulp-tasks/copy-vendor-scripts');
const buildScripts = require('./gulp-tasks/build-scripts');
const buildStyles = require('./gulp-tasks/build-styles');
const replaceAssetsAbsoluteUrl = require('./gulp-tasks/replace-assets-absolute-url');
const minifyStyles = require('./gulp-tasks/minify-styles');
const minifyHtml = require('./gulp-tasks/minify-html');

const defaultSettings = {
	jsAssets: "assets/js",
	cssAssets: "assets/css",
	distDir: "public",
	jsSourceDirPath: "src/js",
	stylesSourceDirPath: "src/styles",
	jsSources: {
		base: [],
		extended: []
	},
	styleSources: {
		base: [],
		extended: []
	},
	htmlFilesToParseStyles: [],
	selectorsToIgnore: []
}
const settings = _.merge({}, defaultSettings, gulpSettings);

gulp.task('build:scripts', buildScripts(gulp, settings, plugins));

gulp.task('copy:vendor-scripts', copyVendorScripts(gulp, settings, plugins));

gulp.task('scripts', gulp.parallel('copy:vendor-scripts', 'build:scripts'));

gulp.task('build:styles', buildStyles(gulp, settings, plugins));

gulp.task('minify:styles', minifyStyles(gulp, settings, plugins));

gulp.task('build:hugo', plugins.shell.task('hugo'));

gulp.task('replace:assets-absolute-url', replaceAssetsAbsoluteUrl(gulp, settings, plugins));

gulp.task('minify:html', minifyHtml(gulp, settings, plugins));

gulp.task('build:site', gulp.series(gulp.parallel('scripts', 'build:styles'), 
	'build:hugo', 
	'replace:assets-absolute-url',
	'minify:styles',
	'minify:html'
));

gulp.task('publish:site', (done) => {
	ghpages.publish(settings.distDir, { silent: true }, (err) => {
		if(err) {
			return done(`Cannot publish site: ${err}`);
		}
		return done();
	});
});

gulp.task('watch:scripts', () => {
	const jsGlob = '/**/*.js';
	return watchDirectory(settings.jsSourceDirPath, jsGlob, 'build:scripts');
});

gulp.task('watch:styles', () => {
	const scssGlob = '/**/*.scss';
	return watchDirectory(settings.stylesSourceDirPath, scssGlob, 'build:styles');
});

const watchDirectory = (pathToDir, glob, task) => {
	const dirs = [pathToDir, 'themes/hesti/' + pathToDir];
	return gulp.watch(dirs.map(dir => dir + glob), gulp.series(task));
}

gulp.task('watch', gulp.parallel('watch:styles', 'watch:scripts'));

gulp.task('default', gulp.series(gulp.parallel('scripts', 'build:styles'), 'watch'));