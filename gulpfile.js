var gulp = require('gulp');
var hologram = require('gulp-hologram');
var notify = require('gulp-notify');


// Dev task: build, serve and watch
gulp.task('default', function() {
  gulp.start('hologram');
});

// Compile style-guide
gulp.task('hologram', ['sass'], function() {
  return gulp.src('hologram_config.yml')
    .pipe(hologram())
    .pipe(notify({message: 'Hologram task complete'}));
});
