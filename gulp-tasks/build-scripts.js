const { join } = require('path');

const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const minify = require('rollup-plugin-babel-minify');

module.exports = function (gulp, settings, plugins) {
	const babelOpts = {
		externalHelpersWhitelist: [
			'defineProperties',
			'createClass',
			'inheritsLoose',
			'extends',
		],
	};
	const cjsOpts = {
		include: ['node_modules/bootstrap/**', 'node_modules/bootstrap-material-design/**', 
			'node_modules/lazysizes/**', 'node_modules/jquery/**'],
		namedExports: {
			'node_modules/jquery/dist/jquery.js': 'jquery',
		}
	};
	const jsAssets = join(process.env.INIT_CWD, 'static', settings.jsAssets);
	const extendedJsSources = settings.jsSources.extended || [];
	const pathToExtendedJsSources = extendedJsSources.map(path => join(process.env.INIT_CWD, path));
	const baseJsSources = settings.jsSources.base || [];
	return function() {
		return gulp.src(pathToExtendedJsSources.concat(baseJsSources))
			.pipe(plugins.betterRollup({  
				external: ['jquery', 'popper.js'],
				plugins: [babel(babelOpts), resolve(), cjs(cjsOpts), minify({comments: false})] 
			}, { format: 'umd', globals: { 'jquery': 'jQuery', 'popper.js' : 'Popper' }}))
			.pipe(gulp.dest(jsAssets));
	}
};