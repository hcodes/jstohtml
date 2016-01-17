var gulp = require('gulp'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    destDir = './dist/',
    src = './src/jstohtml.js';

gulp.task('js', function() {
    gulp.src(src)
        .pipe(gulp.dest(destDir));
});

gulp.task('minjs', ['js'], function() {
    gulp.src(src)
        .pipe(rename('jstohtml.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));
});

gulp.task('default', ['js', 'minjs']);
