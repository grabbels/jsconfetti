import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import clean from 'gulp-clean';
import concatcss from 'gulp-concat-css';
import rename from 'gulp-rename';
import cssmin from 'gulp-cssmin';
import autoprefixer from 'gulp-autoprefixer';

process.chdir('../../')

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
        .pipe(rename({ suffix: '.min' }))
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('compiled/css/blocks/'))
});

gulp.task('compile', () => {
    return gulp.src('./source/scss/*.css')
        .pipe(concatcss("style.css").on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./compiled/css/'))
});

gulp.task('clean', function () {
    return gulp.src('./source/scss/*.css', { read: false })
        .pipe(clean());
});

gulp.task('watch', () => {
    gulp.watch(['source/scss/*.scss', 'template-parts/blocks/**/*.scss', '*.php'], (done) => {
        gulp.series(['styles', 'block-styles', 'compile', 'clean'])(done);
    });
});

gulp.task('default', gulp.series('styles', 'block-styles', 'compile', 'clean', 'watch'))
