const path = require("path");
module.exports = function(gulp, settings, plugins) {
	const cssAssets = path.join("static", settings.cssAssets);
	const pathToBaseStyleSources = settings.styleSources.base.map(file =>
		path.join("themes", "hesti", settings.stylesSourceDirPath, file)
	);
	const pathToExtendedStyleSources = settings.styleSources.extended.map(file =>
		path.join(settings.stylesSourceDirPath, file)
	);
	return function() {
		return gulp
			.src(pathToExtendedStyleSources.concat(pathToBaseStyleSources))
			.pipe(
				plugins
					.sass({
						includePaths: [
							"node_modules",
							path.resolve("themes", "hesti", settings.stylesSourceDirPath)
						]
					})
					.on("error", plugins.sass.logError)
			)
			.pipe(
				plugins.rename(function(file) {
					if (file.basename === "main") {
						file.basename = "hesti";
					}
				})
			)
			.pipe(plugins.rename({ dirname: "" }))
			.pipe(gulp.dest(cssAssets));
	};
};
