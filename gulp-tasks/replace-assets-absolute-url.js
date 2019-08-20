module.exports = function (gulp, settings, plugins) {
	const distDir = settings.distDir;
	const htmlGlob = '/**/*.html';
	const htmlFiles = distDir + htmlGlob;
	return function() {
		return gulp.src(htmlFiles)
			.pipe(plugins.replace(/https?:\/\/\S+?\/assets\//g, '/assets/'))
			.pipe(gulp.dest(distDir));
	}
};