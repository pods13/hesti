const path = require('path');

module.exports = function (gulp, settings, plugins) {
	const htmlGlob = '/**/*.html';
	const htmlFiles = settings.distDir + htmlGlob;
	return function () {
		return gulp.src(htmlFiles)
			.pipe(plugins.htmlmin({ collapseWhitespace: true, removeComments: true }))
			.pipe(gulp.dest(settings.distDir));
	};
};