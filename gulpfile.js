var spawn = require('child_process').spawn;
var gulp = require('gulp');
var browserSync = require('browser-sync');
var bump = require('gulp-bump');
var deploy = require('gulp-gh-pages');
var git = require('gulp-git');
var hologram = require('gulp-hologram');
var notify = require('gulp-notify');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var clean = require('gulp-rimraf');

var argv = require('yargs')
  .default('level', 'minor')
  .argv;

var reload = browserSync.reload;

var config = {
    nodeModulesDir: './node_modules',
    publicDir: './public'
};

// Just do the CSS stuff, build bootstrap, browserSync
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: config.publicDir
    }
  });
  gulp.start('watch-bootstrap');
});

gulp.task('publish', function (done) {
  spawn('npm', ['publish'], { stdio: 'inherit' }).on('close', done);
});

// Dev task: build, serve and watch
gulp.task('default',['styleguide'], function() {
  gulp.start('serve', 'watch-styleguide', 'watch-bootstrap');
});

// Release a new version and update the doc (style-guide)
gulp.task('release', function(done) {
  runSequence('tag', 'publish', 'gh-pages', done);
});

gulp.task('clean', function() {
  return gulp.src('public/dist/').pipe(clean());
});

gulp.task('watch-bootstrap', function (){
  gulp.watch(['src/**/*.scss'], ['mnd-bootstrap-sass']);
});

// Recompile the styleguide on scss file change
gulp.task('watch-styleguide', function() {
  gulp.watch([
    'src/**/*.scss',
    'doc_assets/**/*.scss',
    'doc_assets/**/*.html'
  ],[
    'styleguide-sass',
    'styleguide'
  ]);
  gulp.watch(['src/**/*.js'], ['styleguide']);
});

gulp.task('mnd-bootstrap-sass', function() {
  return gulp.src('src/mnd-bootstrap.scss')
    .pipe(sass({
      outputStyle: 'compact',
      includePaths: [config.nodeModulesDir]
    }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('public/dist'))
    .pipe(notify({message: 'mnd-bootstrap-sass task complete'}))
    .pipe(reload({ stream:true }));
});

gulp.task('styleguide-sass', function() {
  return gulp.src('doc_assets/styleguide.scss')
    .pipe(sass({
      outputStyle: 'compact',
      includePaths: [config.nodeModulesDir]
    }))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('public/'))
    .pipe(notify({message: 'Styleguide-sass task complete'}));
});

gulp.task('styleguide-assets', function() {
  var files = {
    './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js': 'public/javascripts',
    './node_modules/jquery/dist/jquery.min.js': 'public/javascripts'
  };
  for (var file in files) {
    gulp.src(file)
      .pipe(gulp.dest(files[file]));
  }
});

// Compile style-guide
gulp.task('styleguide', [
    'clean',
    'mnd-bootstrap-sass',
    'styleguide-sass',
    'styleguide-assets'
  ], function() {
  return gulp.src('hologram_config.yml')
    .pipe(hologram())
    .pipe(notify({message: 'Hologram task complete'}))
    .pipe(reload({ stream:true }));
});

// Increment version number
gulp.task('bump', function() {
  var importance = argv.level || 'minor';
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type: importance}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit('bump version number'));
});

// Tag and git push
gulp.task('tag', ['bump'], function(cb) {
  var packageJson = require('./package.json');
  var v = packageJson.version;
  var message = 'release v'+v;

  git.tag(v, message, function(e) {
    if (e) throw e;
    git.push('origin', 'master', {args: '--tags'}, function(e) {
      if (e) throw e;

      cb();
    });
  });
});

// Push ./public to gh-pages after hologram build
gulp.task('gh-pages', ['styleguide'], function() {
  return gulp.src('./public/**/*')
    .pipe(deploy());
});
