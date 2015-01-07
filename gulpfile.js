var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var bump = require('gulp-bump');
var git = require('gulp-git');
var hologram = require('gulp-hologram');
var webserver = require('gulp-webserver');
var notify = require('gulp-notify');

var argv = require('yargs')
  .default('level', 'minor')
  .argv;

// Dev task: build, serve and watch
gulp.task('default', function() {
  gulp.start('hologram', 'webserver', 'watch');
});

// Recompile the styleguide on scss file change
gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', ['hologram']);
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

// Serve the style-guide
gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true
    }));
});

// Increment version number
gulp.task('bump', function() {
  var importance = argv.level || 'minor';
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bump version number'));
});
