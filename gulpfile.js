var SRC_CODE = ['./src/**/*.js'];

var gulp = require('gulp'),
	del = require('del'),
	jshint = require('gulp-jshint'),
	jslint = require('gulp-jslint'),
	mocha = require('gulp-mocha'),
	istanbul = require('gulp-istanbul');

// CLEANING UP OLD FILES
gulp.task('clean', function(cb) {
	del(['build', 'dist'], cb);
});


// JSHINT BEST PRACTICES VERIFICATION
gulp.task('hint', function() {
	return gulp.src(SRC_CODE)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});


// JSLINT PATTERN VERIFICATION
gulp.task('lint', function() {
	return gulp.src(SRC_CODE)
	.pipe(jslint({
		// these directives can
		// be found in the official
		// JSLint documentation.
		node: false,
		evil: true,
		nomen: true,
		// you can also set global
		// declarations for all source
		// files like so:
		global: [],
		predef: [],
		// both ways will achieve the
		// same result; predef will be
		// given priority because it is
		// promoted by JSLint
		// pass in your prefered
		// reporter like so:
		reporter: 'default',
		// ^ there's no need to tell gulp-jslint
		// to use the default reporter. If there is
		// no reporter specified, gulp-jslint will use
		// its own.
		// specify whether or not
		// to show 'PASS' messages
		// for built-in reporter
		errorsOnly: false
		}))
		// error handling:
		// to handle on error, simply
		// bind yourself to the error event
		// of the stream, and use the only
		// argument as the error object
		// (error instanceof Error)
		.on('error', function(error) {
			console.error(String(error));
			});
		});

		gulp.task('test', [ 'test:unit', 'hint', 'lint' ]);

		gulp.task('test:unit', function(cb) {

			// instrumenting with istanbul
			return gulp.src(SRC_CODE)

			.pipe(istanbul({
				includeUntested: true
			}))

			.pipe(istanbul.hookRequire())

			.on('finish', function () {

				// covering with mocha
				gulp.src(['tests/unit/**/*.test.js'])
				.pipe(mocha({
					reporter: 'spec',
					timeout: 200
				}))

				// writing reports - https://github.com/SBoudrias/gulp-istanbul
				.pipe(istanbul.writeReports({
					dir: './build/coverage',
					reporters: [ 'text', 'text-summary', 'html','lcov', 'json' ],
					reportOpts: { dir: './build/coverage' }
				}));
			});
		});

		// task chain definidtions
		gulp.task('all', ['clean', 'test']);
		gulp.task('default', ['all']);


/**
 * Define os nome dos arquivos e quais arquivos CSS serão minificados pelo gulp.
 *
 * @namespace patchCSS
 *
 */
pathsCSS = {
	main: {
		name: 'main.css',
		nameMin: 'main.min.css',
		src: [
			'wp-content/themes/grupoapi/assets/build/css/main.less',
			'wp-content/themes/grupoapi/editor-style.css',
		]
	},
	vendors: {
		name: 'vendors.css',
		nameMin: 'vendors.min.css',
		src: [
			'wp-content/themes/grupoapi/assets/build/css/bootstrap.css',
			'wp-content/themes/grupoapi/assets/build/css/flaticon.css',
			'wp-content/themes/grupoapi/assets/build/css/odometer-theme-minimal.css',
			'wp-content/themes/grupoapi/assets/build/css/jquery.bxslider.css',
			'wp-content/themes/grupoapi/assets/build/css/jquery-ui.css',
		]
	}
}