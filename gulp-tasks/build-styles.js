const path = require('path');
module.exports = function (gulp, settings, plugins) {
	const cssAssets = path.join(process.env.INIT_CWD, settings.cssAssets);
	return function() {
		return gulp.src(settings.styleSources.base)
			.pipe(plugins.sass({
				includePaths: ['node_modules', path.resolve('src', 'styles')]
			}).on('error', plugins.sass.logError))
			.pipe(plugins.rename(function(file) {
				if (file.basename === 'main') {
					file.basename = 'hesti';
				}
			}))
			.pipe(gulp.dest(cssAssets));
	}
};