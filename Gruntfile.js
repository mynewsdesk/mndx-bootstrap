module.exports = function(grunt) {

  require('grunt-task-loader')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    SRC: 'src',
    PUBLIC: '.public',
    DIST: 'dist',
    sass: {
      dist: {
        options: {
          style: 'expanded',
          update: true,
          trace: true,
          loadPath: ['bower_components']
        },
        files: {
          '<%= PUBLIC %>/mnd-bootstrap-dev.css': '<%= SRC %>/mnd-bootstrap-dev.scss',
          '<%= PUBLIC %>/styleguide.css': 'hologram/doc_assets/styleguide.scss'
        }
      }
    },
    copy: {
      jquery: {
        expand: true,
        cwd: 'bower_components/jquery/dist/',
        src: 'jquery.min.js',
        dest: 'hologram/doc_assets/'
      },
      bootstrap: {
        expand: true,
        cwd: 'bower_components/bootstrap-sass-twbs/assets/javascripts/',
        src: 'bootstrap.js',
        dest: 'hologram/doc_assets/'
      }
    },
    webpack: {
      dist: require('./grunt/webpack.config.js')
    },
    hologram: {
      dist: {
        options: {
          config: 'hologram/hologram_config.yml'
        }
      }
    },
    watch: {
      js: {
        files: [
          '<%= SRC %>/**/*.js',
          '<%= SRC %>/**/*.coffee',
          'hologram/mnd.js'
        ],
        tasks: ['webpack', 'hologram']
      },
      scss: {
        files: ['<%= SRC %>/**/*.scss', 'hologram/doc_assets/**/*.scss'],
        tasks: ['sass', 'hologram']
      },
      styleguide: {
        files: '<%= PUBLIC %>/**/*',
        options: {
          livereload: 35729
        },
        tasks: ['notify:hologram']
      },
      config: {
        files: ['Gruntfile.js'],
        tasks: ['build']
      }
    },
    connect: {
      options: {
        base: '<%= PUBLIC %>'
      },
      dist: {}
    },
    notify: {
      hologram: {
        options: {
          message: 'Hologram build completed'
        }
      }
    },
    release: {
      options: {
        additionalFiles: ['bower.json'],
        npm: false,
        beforeRelease: ['build', 'pack'],
        afterRelease: ['gh-pages']
      }
    },
    'gh-pages': {
      options: {
        base: '<%= PUBLIC %>'
      },
      dist: {
        src: ['**']
      }
    },
    pack: {
      npm: {
        src: '<%= SRC %>/react-components/**/*.{js,coffee}',
        dest: '<%= DIST %>/lib/',
        manifest: '<%= pkg.main %>'
      }
    }
  });

  grunt.registerTask('build', ['copy', 'sass', 'webpack', 'hologram']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);

  var pack = require('./grunt/pack.js')(grunt);
  grunt.registerMultiTask('pack', 'package file for npm', pack);
};
