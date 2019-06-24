const path = require('path');

const uncss = require('postcss-uncss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');

module.exports = function (gulp, settings, plugins) {
	const distFolder = path.join(process.env.INIT_CWD, settings.distFolder);
	const cssAssets = path.join(distFolder, settings.cssAssets);
	const stylePattern = '/**/*.css';
	const styleFiles = cssAssets + stylePattern;
	const defaultHtmlFilesToParseStyles = ['/index.html', '/404.html'];
	const htmlFilesToParseStyles = settings.htmlFilesToParseStyles || [];
	const htmlFiles = defaultHtmlFilesToParseStyles.concat(htmlFilesToParseStyles).map(file => settings.distFolder + file);
	const defaultSelectorsToIgnore = [/.*\.ripple.*/, 
		/.*\.dropdown-menu.*/,
		/.*\.show/,
		/.*\.toggled/, /.*\.untoggled/,
		'#bodyClick',
		/.*\.nav-open.*/
	];


	const selectorsToIgnore = settings.selectorsToIgnore || [];
	const ignoredSelectors = defaultSelectorsToIgnore.concat(selectorsToIgnore);
	return function() {
		const uncssOptions = {htmlroot: distFolder, html: htmlFiles, ignore: ignoredSelectors };
		return gulp.src(styleFiles)
			.pipe(plugins.postcss([ uncss(uncssOptions) ]))
			.pipe(plugins.postcss([ autoprefixer(), csso({ comments: false }) ]))
			.pipe(gulp.dest(cssAssets));
	}
};