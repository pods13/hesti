const { join } = require('path');
const pathToPackage  = join(process.env.INIT_CWD, 'package.json');
const { gulpConfig } = require(pathToPackage);

const loadPlugins = require('gulp-load-plugins');
const $ = loadPlugins({
	pattern: ['*'],
	scope: ['dependencies']
});

const gulp = $.gulp;

const jsAssets = join(process.env.INIT_CWD, 'static/assets/js');

gulp.task('vendor:scripts', () => {
	return gulp.src(['node_modules/jquery/dist/jquery.slim.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
		.pipe(gulp.dest(jsAssets));
});

gulp.task('default', gulp.series('vendor:scripts'));