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

//Browser Test
gulp.task('syncApp', function () {
    browser.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch("src/*.{html,/*.css}").on('change', browser.reload);
    gulp.watch('../../src/scripts/inverted-index.js').on('change', browser.reload);
});


gulp.task('testWatch', () => {
    gulp.watch('jasmine/spec/*').on('change', browser.reload);
    gulp.watch('jasmine/spec/inverted-index-test.js', ['browserify']);
});

gulp.task('browserify', () =>
    browserify('./jasmine/spec/inverted-index-test.js')
    .bundle()
    .pipe(source('app-test.js'))
    .pipe(gulp.dest('./jasmine/spec'))
);


gulp.task('loadApp', ['syncApp', 'testWatch'])