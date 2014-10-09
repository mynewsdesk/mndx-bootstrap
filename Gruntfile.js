module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'dist/mnd-bootstrap-dev.css': 'src/mnd-bootstrap-dev.scss',
          'public/styleguide.css': 'doc_assets/styleguide.scss'
        },
        options: {
          loadPath: './bower_components'
        }
      }
    },
    watch: {
      css: {
        files: '{src,bower_components,doc_assets}/**/*.scss',
        tasks: ['sass', 'hologram']
      },
      doc: {
        files: 'doc_assets/**/*',
        tasks: ['hologram']
      }
    },
    hologram: {
      build: {
        options: {
          config: 'hologram_config.yml'
        }
      }
    },
    express: {
      options: {
        spawn: false
      },
      dev: {
        options: {
          script: 'dev_server.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.registerTask('default', ['sass', 'hologram', 'express', 'watch']);
};
