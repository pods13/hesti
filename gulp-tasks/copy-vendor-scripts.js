const { join } = require('path');

module.exports = function (gulp, settings, plugins) {
	const jsAssets = join(process.env.INIT_CWD, settings.jsAssets);
	return function () {
		return gulp.src(['node_modules/jquery/dist/jquery.slim.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
			.pipe(gulp.dest(jsAssets));
	};
};