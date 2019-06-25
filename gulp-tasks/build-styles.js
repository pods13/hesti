const path = require('path');
module.exports = function (gulp, settings, plugins) {
	const cssAssets = path.join(process.env.INIT_CWD, 'static', settings.cssAssets);
	const pathToBaseStyleSources = settings.styleSources.base.map(file => path.join(settings.stylesSourceDirPath, file));
	return function() {
		return gulp.src(pathToBaseStyleSources)
			.pipe(plugins.sass({
				includePaths: ['node_modules', path.resolve('src', 'styles')]
			}).on('error', plugins.sass.logError))
			.pipe(plugins.rename(function(file) {
				if (file.basename === 'main') {
					file.basename = 'hesti';
				}
			}))
			.pipe(plugins.rename({dirname: ''}))
			.pipe(gulp.dest(cssAssets));
	}
};