const gulp = require('gulp');
const gutil = require('gutil');
const sass = require('gulp-dart-sass');
const del = require('del');
const concat = require('gulp-concat');
const concatcss = require('gulp-concat-css');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const util = require("gulp-util");
const autoprefixer = require("gulp-autoprefixer");

process.chdir('../../')

var localFiles = [
        '*.php',
        'compiled/css/**/*.css',
        'template-parts/**/*.php',
        'source/js/*.js',
        'source/fonts/**',
        'img/**'
    ];

gulp.task('styles', () => {
    return gulp.src('./source/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./source/scss/'))
});

gulp.task('block-styles', () => {
    return gulp.src('./template-parts/blocks/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('compiled/css/blocks/'))
});

gulp.task('compile', () => {
  return gulp.src('./source/scss/*.css')
  .pipe(concatcss("style.css").on('error', sass.logError))
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./compiled/css/'))
});

gulp.task('clean', function(done) {
    del.sync('./source/scss/*.css', {force: true})
    done();
});

gulp.task('watch', () => {
    gulp.watch(['source/scss/*.scss', 'template-parts/blocks/**/*.scss', '*.php'], (done) => {
        gulp.series(['styles', 'block-styles', 'compile', 'clean' ])(done);
    });
});

gulp.task('default', gulp.series('styles', 'block-styles', 'compile', 'clean', 'watch'))
