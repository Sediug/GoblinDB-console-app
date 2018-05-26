'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const debug = require('gulp-debug');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const jsdoc = require('gulp-jsdoc3');
const injectPartials = require('gulp-inject-partials');


gulp.task('test', cb => {
	gulp.src(['./src/*.js'])
		.pipe(istanbul())
		.pipe(istanbul.hookRequire()) 
		.on('finish', () => gulp.src(['./test/*.js'])
			.pipe(mocha())
			.pipe(istanbul.writeReports())
			.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
			.on('end', cb)
		);
});

gulp.task('lint', () => {
	const filesToLint = [
		'**/*.{html,js}',
		'!tests/protractor.conf.js',
		'!dist/**/*',
		'!docs/**/*',
		'!node_modules/**/*',
		'!tmp/**/*',
		'!coverage/**/*',
		'!src/public/*'
	];

	return gulp.src(filesToLint)
		.pipe(debug({title: 'eslint (Scope):'}))
		.pipe(eslint())
		.pipe(eslint({fix:true}))
		.pipe(eslint.format())
		.pipe(gulp.dest('.'));
});