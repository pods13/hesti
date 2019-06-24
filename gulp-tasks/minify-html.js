const path = require('path');

module.exports = function (gulp, settings, plugins) {
	const distFolder = path.join(process.env.INIT_CWD, settings.distFolder);
	const htmlPattern = '/**/*.html';
	const htmlFiles = distFolder + htmlPattern;
	return function () {
		return gulp.src(htmlFiles)
			.pipe(plugins.htmlmin({ collapseWhitespace: true, removeComments: true }))
			.pipe(gulp.dest(distFolder));
	};
};