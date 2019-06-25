const path = require('path');

module.exports = function (gulp, settings, plugins) {
	const distDir = path.join(process.env.INIT_CWD, settings.distDir);
	const htmlGlob = '/**/*.html';
	const htmlFiles = distDir + htmlGlob;
	return function () {
		return gulp.src(htmlFiles)
			.pipe(plugins.htmlmin({ collapseWhitespace: true, removeComments: true }))
			.pipe(gulp.dest(distDir));
	};
};