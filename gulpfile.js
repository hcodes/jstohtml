'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const src = './src/jstohtml.js';
const dest = './dist/';

gulp.task('js', () => gulp.src(src).pipe(gulp.dest(dest)));

gulp.task('minjs', gulp.series('js'), () => {
    return gulp.src(src)
        .pipe(rename('jstohtml.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
});

gulp.task('default', gulp.series('js', 'minjs'));
