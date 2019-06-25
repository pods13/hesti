const path = require('path');
module.exports = function (gulp, settings, plugins) {
	const distFolder = path.join(process.env.INIT_CWD, settings.distFolder);
	const htmlGlob = '/**/*.html';
	const htmlFiles = distFolder + htmlGlob;
	return function() {
		return gulp.src(htmlFiles)
			.pipe(plugins.replace(/https?:\/\/.+?\/assets\//g, '/assets/'))
			.pipe(gulp.dest(distFolder));
	}
};