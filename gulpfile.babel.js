'use strict';

import gulp from 'gulp';
import fs from 'fs';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';
import gulprun from 'gulp-run';

var browser = browserSync.create();

//ESLint task
gulp.task('eslint', function () {
    return gulp.src('src/**').pipe(eslint({
            'rules': {
                'quotes': [1, 'single']
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});


//Browser Test
gulp.task('syncApp', function () {
    browser.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch("src/*.{html,/*.css}").on('change', browser.reload);
});

gulp.task('tests', function () {
    browser.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch('./jasmine/spec/inverted-index-test.js').on('change', browser.reload);
    gulp.watch('./src/scripts/inverted-index.js').on('change', browser.reload);
});


gulp.task('browserify', () =>
    browserify('./jasmine/spec/inverted-index-test.js')
    .bundle()
    .pipe(source('app-test.js'))
    .pipe(gulp.dest('./jasmine/spec'))
    .on('error', function (err) {
        this.emit('end');
    });
);

gulp.task('testApp', ['browserify'], () => {
    gulprun('karma start karma.conf.js --single-run').exec();
});