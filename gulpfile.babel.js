'use strict'; 

//include gulp 
//var gulp = require('gulp'); 
import gulp from 'gulp';
import browserSync from 'browser-sync'

var browser = browserSync.create(); 

//Loads gulp plug-ins into the plugins object. 
import gulpLoadPlugins from 'gulp-load-plugins'; 
const $ = gulpLoadPlugins(); 

const src ={
    html: './src/*.html', 
    scripts: '/src/scripts/*.js'
}

const build = {
    
}

// JS hint task
gulp.task('jshint', function() {
  gulp.src(src.scripts)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

//Build Homepage
gulp.task('html',function(){
    return gulp.src(src.html)
                .pipe(gulp.dest('build/'));
              //  .pipe($.connect.reload()); 
});

//Browser Test
gulp.task('browserTest',function(){
     browser.init(['src/styles/css.*.css',['src/scripts/js/*.js'],{
         server: {
             baseDir: './'
         }
     });
    //  gulp.watch("src/*.html").on("change", reload);              
});