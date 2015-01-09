/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
sass = require('gulp-ruby-sass'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
del = require('del');

// Styles
gulp.task('styles', function() {
  return gulp.src('app/css/main.sass')
  .pipe(sass({ style: 'expanded', }))
  .pipe(gulp.dest('dist/css'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css'))
  .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
  .pipe(jshint.reporter('default'))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
  .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean and rebuild dist folders
gulp.task('clean', function(cb) {
  del(['dist/css', 'dist/js'], cb)
})

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/css/**/*.sass', ['styles']);

  // Watch .js files
  gulp.watch('app/js/**/*.js', ['scripts']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});