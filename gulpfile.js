const gulp = require('gulp');
const sass = require('gulp-sass');
const rimraf = require('rimraf');
const autoprefixer = require('gulp-autoprefixer');
const nodeSassMagicImporter = require('node-sass-magic-importer');

const stylesSource = 'src/css/**/*.scss';
const stylesDestDirectory = 'static/assets/css';
const jsSource = 'src/js/**/*.js';
const jsDestDirectory = 'static/assets/js';

function removeFilesFromDirectory(dir) {
	console.log('invoked')
	return function(cb) {
		rimraf.sync(`${dir}/*`);
		cb();
	}
}

gulp.task('clean:styles', removeFilesFromDirectory(stylesDestDirectory));

gulp.task('styles', gulp.series('clean:styles', () => {
	return gulp.src(stylesSource)
		.pipe(sass({
			includePaths: ['node_modules'],
			importer: nodeSassMagicImporter(),
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest(stylesDestDirectory));	
}));

gulp.task('watch:styles', () => {
	return gulp.watch(stylesSource, gulp.series('styles'));
});

gulp.task('clean:js', removeFilesFromDirectory(jsDestDirectory));

gulp.task('js', gulp.series('clean:js', () => {
	return gulp.src(jsSource)
		.pipe(gulp.dest(jsDestDirectory));	
}));

gulp.task('watch:js', () => {
	return gulp.watch(jsSource, gulp.series('js'));
});

gulp.task('watch', gulp.parallel('watch:styles', 'watch:js'));

gulp.task('build', gulp.parallel('styles', 'js'));

gulp.task('default', gulp.parallel('build', 'watch'));