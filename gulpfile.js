var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
// var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
 
gulp.task('sass', function () {
  gulp.src('assets/scss/main.scss')
    .pipe(sass({
      errLogToConsole: true,
      style: 'compress',
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('assets/css'));
});


// gulp.task('templates', function(){
//   gulp.src('assets/templates/*.hbs')
//     .pipe(handlebars())
//     .pipe(wrap('Handlebars.template(<%= contents %>)'))
//     .pipe(declare({
//       namespace: 'UGS.templates',
//       noRedeclare: true, // Avoid duplicate declarations 
//     }))
//     .pipe(concat('templates.js'))
//     .pipe(gulp.dest('assets/js/src'));
// });

gulp.task('compress', function() {
  gulp.src('assets/js/src/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/dist'))
});

gulp.task('lint', function() {
  return gulp.src('assets/js/src/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {


	gulp.watch('assets/scss/*.scss', function() {
		gulp.start('sass');
	});


  // gulp.watch('assets/templates/*.hbs', function() {
  //   gulp.start('templates');
  // });

  // gulp.watch('assets/js/src/app.js', function() {
  //   // gulp.start('lint');
  //   gulp.start('compress');
  // });
});


gulp.task('default', ['sass', 'watch']);