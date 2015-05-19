module.exports = function(grunt) {

  require('grunt-task-loader')(grunt)

  grunt.initConfig({
    SRC: 'src',
    PUBLIC: '.public',
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
    webpack: {
      dist: {
        entry: './hologram/mnd.js',
        output: {
          path: '<%= PUBLIC %>',
          filename: 'mnd.js'
        },
        module: {
          loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
          ]
        },
        resolve: {
          alias: {
            components: __dirname + '/<%= SRC %>/react-components',
            utils: '/src/js/utils'
          }
        },
      }
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
        files: ['<%= SRC %>/**/*.js'],
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
        }
      },
      config: {
        files: ['Gruntfile.js']
      }
    },
    connect: {
      base: '<%= PUBLIC %>'
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
        npm: false
      }
    }
  });

  grunt.registerTask('build', ['sass', 'webpack', 'hologram'])
  grunt.registerTask('default', ['build', 'connect', 'watch'])
  grunt.registerTask('release', [])

}
