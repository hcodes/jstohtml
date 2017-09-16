'use strict';

const fs = require('fs');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const destDir = './dist/';
const src = './src/jstohtml.js';

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
