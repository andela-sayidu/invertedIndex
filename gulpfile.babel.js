'use strict';

import gulp from 'gulp';
import fs from 'fs';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';
import gulprun from 'gulp-run';

const browser = browserSync.create();

//Browser Test
gulp.task('syncApp', () =>  {
    browser.init({
        open: false,
        server: {
            baseDir: './src'
        },
        port: process.env.PORT
    });
    gulp.watch("src/*.{html,/*.css}").on('change', browser.reload);
    gulp.watch('../../src/scripts/inverted-index.js').on('change', browser.reload);
});


gulp.task('browserify', () =>
    browserify('./jasmine/spec/inverted-index-test.js')
    .bundle()
    .pipe(source('app-test.js'))
    .pipe(gulp.dest('./jasmine/spec'))
);

gulp.task('testWatch', () => {
    gulp.watch('jasmine/spec/*').on('change', browser.reload);
    gulp.watch('jasmine/spec/inverted-index-test.js', ['browserify']);
});

gulp.task('loadApp', ['syncApp', 'testWatch']);