var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var hologram = require('gulp-hologram');
var notify = require('gulp-notify');

// Dev task: build, serve and watch
gulp.task('default', function() {
  gulp.start('hologram');
});

// Compile sass files
gulp.task('sass', function() {
  return gulp.src('src/mnd-bootstrap*.scss')
    .pipe(sass({ style: 'expanded', loadPath: ['./bower_components/'] }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('dist/'))
    .pipe(notify({message: 'Sass task complete'}));
});

// Compile style-guide
gulp.task('hologram', ['sass'], function() {
  return gulp.src('hologram_config.yml')
    .pipe(hologram())
    .pipe(notify({message: 'Hologram task complete'}));
});
