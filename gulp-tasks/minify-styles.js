const path = require('path');

const uncss = require('postcss-uncss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');

module.exports = function (gulp, settings, plugins) {
	const distDir = path.join(process.env.INIT_CWD, settings.distDir);
	const cssAssets = path.join(distDir, settings.cssAssets);
	const styleGlob = '/**/*.css';
	const styleFiles = cssAssets + styleGlob;
	const defaultHtmlFilesToParseStyles = ['/index.html', '/404.html'];
	const htmlFilesToParseStyles = settings.htmlFilesToParseStyles || [];
	const htmlFiles = defaultHtmlFilesToParseStyles.concat(htmlFilesToParseStyles).map(file => settings.distDir + file);
	const defaultSelectorsToIgnore = [/.*\.ripple.*/, 
		/.*\.dropdown-menu.*/,
		/.*\.show/,
		/.*\.toggled/, /.*\.untoggled/,
		'#bodyClick',
		/.*\.nav-open.*/
	];


	const ignoredSelectors = defaultSelectorsToIgnore.concat(settings.selectorsToIgnore);
	return function() {
		const uncssOptions = {htmlroot: distDir, html: htmlFiles, ignore: ignoredSelectors };
		return gulp.src(styleFiles)
			.pipe(plugins.postcss([ uncss(uncssOptions) ]))
			.pipe(plugins.postcss([ autoprefixer(), csso({ comments: false }) ]))
			.pipe(gulp.dest(cssAssets));
	}
};