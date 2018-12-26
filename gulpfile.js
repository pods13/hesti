const gulp = require('gulp');
const sass = require('gulp-sass');
const rimraf = require('rimraf');
const autoprefixer = require('gulp-autoprefixer');
const nodeSassMagicImporter = require('node-sass-magic-importer');

const stylesSource = 'src/css/**/*.scss';
const stylesDestDirectory = 'static/assets/css';

gulp.task('clean:styles', function (done) {
	rimraf.sync(`${stylesDestDirectory}/*`);
	done();
});

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

gulp.task('build', gulp.series('styles'));

gulp.task('watch', () => {
	return gulp.watch(stylesSource, gulp.series('styles'));
});

gulp.task('default', gulp.parallel('watch', 'styles'));