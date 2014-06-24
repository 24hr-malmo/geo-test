var gulp = require('gulp');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var prefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('html', function() {

    gulp.src(['*.html'])
        .pipe(watch())
        .pipe(livereload());

});

gulp.task('scripts', function() {

    gulp.src(['scripts/**/*.js'])
        .pipe(watch())
        .pipe(livereload());

});


// this task makes sure all css files are pre and postprosseced
gulp.task('css', function() {

    gulp.src('css/*.styl')
        .pipe(stylus())
        .pipe(prefixer())
        .pipe(gulp.dest('./css'))
        .pipe(livereload());

});

gulp.task('connect', function() {
    connect.server({
      port: 9090/*,
      livereload: true */
    });
});

gulp.task('default', function() {

    gulp.start('html');
    gulp.start('scripts');
    gulp.start('connect');
    gulp.watch('css/**/*.styl', ['css']);

});


